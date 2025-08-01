import requests
import time
import logging
from typing import List, Dict, Any
import sys
import os

# Add the parent directory to the path to import embeddings service
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from vector_db.embeddings_service import EmbeddingsService

logger = logging.getLogger(__name__)

def fetch_and_filter_jobs(keywords, store_in_vector_db=True):
    """
    Fetch all job listings from RemoteOK and filter by a list of search phrases.

    Args:
        keywords (List[str]): Search phrases (e.g. ['data scientist', 'python']).

    Returns:
        List[dict]: Filtered job listings.
    """
    url = "https://remoteok.com/api"
    headers = {'User-Agent': 'Mozilla/5.0'}

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        jobs = response.json()
    except Exception as e:
        print(f"[!] Error fetching jobs: {e}")
        return []

    if not isinstance(jobs, list) or len(jobs) < 2:
        print("[!] No job listings found.")
        return []

    # Skip the first element (API metadata)
    jobs = jobs[1:]

    keywords = [k.lower() for k in keywords]
    filtered_jobs = []
    seen_ids = set()

    for job in jobs:
        job_id = str(job.get("id"))
        if job_id in seen_ids:
            continue

        # Check if any keyword is in the position, tags, or description
        position = job.get("position", "").lower()
        tags = " ".join(job.get("tags", [])).lower()
        description = job.get("description", "").lower()

        if any(k in position or k in tags or k in description for k in keywords):
            filtered_jobs.append(job)
            seen_ids.add(job_id)
        logger.info(f"Filtered {len(filtered_jobs)} jobs from {len(jobs)} total jobs")

    # Store in vector database if requested
    if store_in_vector_db and filtered_jobs:
        try:
            store_jobs_in_vector_db(filtered_jobs)
        except Exception as e:
            logger.error(f"Error storing jobs in vector database: {e}")
            # Continue without failing the entire operation


    return filtered_jobs


def store_jobs_in_vector_db(jobs: List[Dict[str, Any]]) -> bool:
    """
    Store filtered jobs in vector database as embeddings.
    
    Args:
        jobs (List[Dict[str, Any]]): List of job dictionaries to store
        
    Returns:
        bool: True if successful, False otherwise
    """
    try:
        # Initialize embeddings service
        embeddings_service = EmbeddingsService()
        
        logger.info(f"Storing {len(jobs)} jobs in vector database...")
        
        # Store job embeddings
        success = embeddings_service.store_job_embeddings(jobs)
        
        if success:
            logger.info(f"Successfully stored {len(jobs)} job embeddings")
        else:
            logger.warning("Failed to store some job embeddings")
            
        return success
        
    except Exception as e:
        logger.error(f"Error in store_jobs_in_vector_db: {e}")
        return False

def get_vector_db_stats() -> Dict[str, Any]:
    """
    Get statistics about the vector database.
    
    Returns:
        Dict[str, Any]: Statistics including job and CV counts
    """
    try:
        embeddings_service = EmbeddingsService()
        stats = embeddings_service.get_collection_stats()
        
        logger.info(f"Vector DB Stats: {stats}")
        return stats
        
    except Exception as e:
        logger.error(f"Error getting vector DB stats: {e}")
        return {"cv_embeddings": 0, "job_embeddings": 0, "error": str(e)}
# import requests
# import time

# def fetch_jobs_for_keywords(keywords):
#     """
#     Fetch relevant job listings from RemoteOK using a list of search phrases.
    
#     Args:
#         keywords (List[str]): List of job-related search phrases (e.g. ['data scientist', 'python']).
        
#     Returns:
#         List[dict]: List of unique job postings from RemoteOK.
#     """
#     base_url = "https://remoteok.com/api"
#     headers = {'User-Agent': 'Mozilla/5.0'}

#     all_jobs = []
#     seen_ids = set()

#     for keyword in keywords:
#         search_slug = keyword.lower().strip().replace(" ", "-")
#         url = base_url.format(search_slug)
        
#         try:
#             response = requests.get(url, headers=headers)
#             if response.status_code == 200:
#                 jobs = response.json()
#                 if isinstance(jobs, list) and len(jobs) > 1:
#                     for job in jobs[1:]:  # skip metadata
#                         if isinstance(job, dict):
#                             job_id = job.get("id")
#                             if job_id and str(job_id) not in seen_ids:
#                                 seen_ids.add(str(job_id))
#                                 all_jobs.append(job)
#                 else:
#                     print(f"[!] Unexpected response format for '{keyword}'")
#             else:
#                 print(f"[!] Failed to fetch jobs for '{keyword}': Status {response.status_code}")
#         except requests.RequestException as e:
#             print(f"[!] Network error fetching jobs for '{keyword}': {str(e)}")
#         except ValueError as e:
#             print(f"[!] JSON parsing error for '{keyword}': {str(e)}")

#         time.sleep(1)  # be polite and avoid rate limits

#     return all_jobs

# if __name__ == "__main__":
#     search_terms = ["data scientist", "machine learning", "python developer"]
#     jobs = fetch_jobs_for_keywords(search_terms)

#     print(f"Fetched {len(jobs)} unique jobs.")
#     for job in jobs[:5]:  # Preview top 5
#         print(job.get("position"), "-", job.get("company"))
