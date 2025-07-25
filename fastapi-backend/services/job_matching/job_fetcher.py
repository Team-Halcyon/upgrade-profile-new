import requests
import time

def fetch_and_filter_jobs(keywords):
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

    return filtered_jobs



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
