from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from typing import List, Dict, Any
import logging
from pathlib import Path

# Import our custom modules
from parse_cv import return_search_phrases
from job_fetcher import fetch_and_filter_jobs

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Job Matching Service", version="1.0.0")

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
        search_phrases = return_search_phrases(file)
        
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

@app.post("/test-job-search")
async def test_job_search(search_phrases: List[str]) -> JSONResponse:
    """
    Test endpoint to search jobs with custom phrases
    
    Args:
        search_phrases: List of search phrases
        
    Returns:
        JSON response with matching jobs
    """
    try:
        logger.info(f"🔍 Testing job search with phrases: {search_phrases}")
        
        matching_jobs = fetch_and_filter_jobs(search_phrases)
        
        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "search_phrases": search_phrases,
                "total_jobs": len(matching_jobs),
                "jobs": matching_jobs[:10]  # Limit to first 10 for testing
            }
        )
        
    except Exception as e:
        logger.error(f"❌ Error in job search: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "job-matching"}

# For local testing without FastAPI server
def main():
    """
    Local testing function - processes a CV file and fetches jobs
    """
    import os
    from pathlib import Path
    
    print("=== Job Matching Service Test ===")
    
    # Look for PDF files in current directory
    current_dir = Path(".")
    pdf_files = list(current_dir.glob("*.pdf"))
    
    if not pdf_files:
        print("❌ No PDF files found in current directory!")
        return
    
    print("📁 Found PDF files:")
    for i, pdf_file in enumerate(pdf_files, 1):
        print(f"   {i}. {pdf_file.name}")
    
    # Select file
    if len(pdf_files) == 1:
        selected_file = pdf_files[0]
        print(f"\n📄 Using: {selected_file.name}")
    else:
        try:
            choice = int(input(f"\nSelect file (1-{len(pdf_files)}): ")) - 1
            selected_file = pdf_files[choice]
        except (ValueError, IndexError):
            selected_file = pdf_files[0]
            print(f"📄 Using first file: {selected_file.name}")
    
    # Create mock uploaded file
    class MockUploadedFile:
        def __init__(self, file_path):
            self.file_path = file_path
            self.filename = file_path.name
        
        def read(self):
            with open(self.file_path, 'rb') as f:
                return f.read()
    
    try:
        mock_file = MockUploadedFile(selected_file)
        
        # Step 1: Extract search phrases
        print(f"\n🔍 Step 1: Extracting search phrases from {selected_file.name}...")
        search_phrases = return_search_phrases(mock_file)
        
        if not search_phrases:
            print("❌ No search phrases extracted!")
            return
        
        print(f"✅ Extracted {len(search_phrases)} search phrases:")
        for i, phrase in enumerate(search_phrases, 1):
            print(f"   {i:2d}. '{phrase}'")
        
        # Step 2: Fetch matching jobs
        print(f"\n🌐 Step 2: Fetching jobs from RemoteOK...")
        matching_jobs = fetch_and_filter_jobs(search_phrases)
        
        print(f"✅ Found {len(matching_jobs)} matching jobs!")
        
        # Step 3: Display results
        if matching_jobs:
            print(f"\n📋 Top {min(5, len(matching_jobs))} matching jobs:")
            print("=" * 80)
            
            for i, job in enumerate(matching_jobs[:5], 1):
                print(f"\n🔹 Job {i}:")
                print(f"   Position: {job.get('position', 'N/A')}")
                print(f"   Company:  {job.get('company', 'N/A')}")
                print(f"   Location: {job.get('location', 'Remote')}")
                print(f"   Tags:     {', '.join(job.get('tags', []))}")
                print(f"   URL:      https://remoteok.io/remote-jobs/{job.get('id', '')}")
                
            print("=" * 80)
            print(f"\n💡 Total jobs found: {len(matching_jobs)}")
            print(f"🔍 Search phrases used: {len(search_phrases)}")
        else:
            print("❌ No matching jobs found!")
            
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    # Run local test
    main()