from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import datetime, timedelta
from passlib.context import CryptContext
from database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware  
from fastapi.responses import JSONResponse
import logging

from schemas import UserCreate
from crud import get_user_by_username, create_user
from services.auth import authenticate_user, create_access_token,ACCESS_TOKEN_EXPIRE_MINUTES

# Import our custom modules
from services.job_matching.parse_cv import return_search_phrases
from services.job_matching.job_fetcher import fetch_and_filter_jobs

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
def register_user(user:UserCreate,db:Session = Depends(get_db)):
    db_user = get_user_by_username(db, user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    
    return create_user(db=db, user=user)

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
        logger.info(f"📄 Processing uploaded CV: {file.filename}")
        
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
        
        # Step 2: Fetch matching jobs from RemoteOK
        logger.info("🌐 Fetching matching jobs from RemoteOK...")
        matching_jobs = fetch_and_filter_jobs(search_phrases)
        
        logger.info(f"✅ Found {len(matching_jobs)} matching jobs")
        
        # Step 3: Return results
        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "message": f"Successfully found {len(matching_jobs)} matching jobs",
                "search_phrases": search_phrases,
                "total_jobs": len(matching_jobs),
                "jobs": matching_jobs[:20]  # Limit to first 20 jobs for performance
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