from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File,Form
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import datetime, timedelta
from passlib.context import CryptContext
from database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware  
from fastapi.responses import JSONResponse
import logging
import io
from schemas import UserCreate
from crud import get_user_by_username, create_user
from services.auth import authenticate_user, create_access_token,ACCESS_TOKEN_EXPIRE_MINUTES

# Import our custom modules
from services.job_matching.parse_cv import return_search_phrases,extract_text_from_pdf_pypdf2
from services.job_matching.job_fetcher import fetch_and_filter_jobs
import uuid
from services.vector_db_service.embeddings_service import EmbeddingsService
from database import supabase
from database import SUPABASE_PROJECT_URL

# Initialize embeddings service
embeddings_service = EmbeddingsService()
# Configure logger
logger = logging.getLogger("uvicorn.error")
logger.setLevel(logging.INFO)

app = FastAPI()
origins = [
    "http://localhost:3000",
    "https://upbyhalcyon.netlify.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)



def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        


@app.post("/register")
async def register_user(
    fullName: str = Form(...),
    username: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    interestedJobRoles: str = Form(...),
    profilePicture: UploadFile = File(None),
    cvFile: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    # ✅ Check if username exists
    db_user = get_user_by_username(db, username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    # ✅ Upload files to Supabase
    profile_pic_url = None
    cv_url = None

    try:
        if profilePicture:
            profile_bytes = await profilePicture.read()
            profile_name = f"profile_pics/{uuid.uuid4()}_{profilePicture.filename}"
            supabase.storage.from_("user-dps").upload(profile_name, profile_bytes)
            profile_pic_url = f"{SUPABASE_PROJECT_URL}/storage/v1/object/public/user-dps/{profile_name}"

        if cvFile:
            cv_bytes = await cvFile.read()
            cv_name = f"cv_files/{uuid.uuid4()}_{cvFile.filename}"
            supabase.storage.from_("user-cvs").upload(cv_name, cv_bytes)
            cv_url = f"{SUPABASE_PROJECT_URL}/storage/v1/object/public/user-cvs/{cv_name}"

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to upload files: {str(e)}")

    # ✅ Create user using modified UserCreate model
    user_data = UserCreate(
        fullName=fullName,
        username=username,
        email=email,
        password=password,
        interestedJobRoles=interestedJobRoles,
        profile_picture_url=profile_pic_url,
        cv_url=cv_url
    )

    return create_user(db=db, user=user_data)

@app.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    print(form_data.username, form_data.password)  # Debugging
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/match-jobs")
async def match_jobs_from_cv(file: UploadFile = File(...)) -> JSONResponse:
    """
    Upload CV, extract search phrases, and fetch matching jobs from RemoteOK
    
    Args:
        file: Uploaded PDF file (CV/Resume)
        
    Returns:
        JSON response with search phrases and matching jobs
    """
    
    # Validate file type
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    
    try:
        cv_id = str(uuid.uuid4())
        logger.info(f"📄 Processing uploaded CV: {file.filename}")
        
        file = await file.read()
        # Step 1: Parse CV and extract search phrases
        logger.info("🔍 Extracting search phrases from CV...")
        search_phrases = await return_search_phrases(file)
        
        if not search_phrases:
            logger.warning("⚠️ No search phrases extracted from CV")
            return JSONResponse(
                status_code=200,
                content={
                    "success": False,
                    "message": "Could not extract search phrases from CV",
                    "search_phrases": [],
                    "jobs": []
                }
            )
        
        logger.info(f"✅ Extracted {len(search_phrases)} search phrases: {search_phrases}")
        # Step 2: Create CV text for embedding (combine search phrases)
        #cv_text = " ".join(search_phrases)
        
        cv_text =  await extract_text_from_pdf_pypdf2(file)
        
        # Store CV embedding
        logger.info("💾 Storing CV embedding in vector database...")
        embeddings_service.store_cv_embedding(cv_text, cv_id)
        
        # Step 2: Fetch matching jobs from RemoteOK
        logger.info("🌐 Fetching matching jobs from RemoteOK...")
        matching_jobs = fetch_and_filter_jobs(search_phrases, store_in_vector_db=True)
        if not matching_jobs:
            logger.info("No jobs found from RemoteOK")
            return JSONResponse(
                status_code=200,
                content={
                    "success": True,
                    "message": "No matching jobs found",
                    "search_phrases": search_phrases,
                    "total_jobs": 0,
                    "jobs": []
                }
            )
        logger.info(f"✅ Found {len(matching_jobs)} matching jobs")
        import time
        time.sleep(1)  # Give time for embeddings to be stored
        
        # Step 4: Calculate similarity scores
        logger.info("🔢 Calculating similarity scores...")
        job_ids = [str(job.get('id', job.get('slug', ''))) for job in matching_jobs if job.get('id') or job.get('slug')]
        similarity_scores = embeddings_service.calculate_similarity_scores(cv_id, job_ids)
        logger.info(f"Similarity scores{similarity_scores}")
        # Step 5: Add similarity scores to jobs
        jobs_with_scores = []
        for job in matching_jobs:
            job_id = str(job.get('id', job.get('slug', '')))
            job_copy = job.copy()
            
            # Add similarity score
            match_score = similarity_scores.get(job_id, 0)
            job_copy['match_score'] = match_score
            
            jobs_with_scores.append(job_copy)
        
        # Sort by match score (highest first)
        jobs_with_scores.sort(key=lambda x: x.get('match_score', 0), reverse=True)
        
        logger.info(f"✅ Added similarity scores to {len(jobs_with_scores)} jobs")
        
        
        # Step 6: Return results
        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "message": f"Successfully found {len(jobs_with_scores)} matching jobs with similarity scores",
                "search_phrases": search_phrases,
                "total_jobs": len(jobs_with_scores),
                "jobs": jobs_with_scores[:20],  # Limit to first 20 jobs for performance
                "cv_id": cv_id,
                "embeddings_stats": embeddings_service.get_collection_stats()
            }
        )
        
    except Exception as e:
        logger.error(f"❌ Error processing CV: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail=f"Error processing CV: {str(e)}"
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)