import chromadb
from sentence_transformers import SentenceTransformer
import numpy as np
from typing import List, Dict, Any
import logging
import hashlib
import re

logger = logging.getLogger(__name__)

class EmbeddingsService:
    def __init__(self):
        # Initialize ChromaDB client
        self.client = chromadb.PersistentClient(path="./vector_db")
        
        # Initialize embedding model
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
        
        # Get or create collections
        self.jobs_collection = self.client.get_or_create_collection(
            name="job_descriptions",
            metadata={"description": "Job descriptions embeddings"}
        )
        
        self.cv_collection = self.client.get_or_create_collection(
            name="cv_documents", 
            metadata={"description": "CV documents embeddings"}
        )
    
    def clean_text(self, text: str) -> str:
        """Clean and normalize text for embedding"""
        if not text:
            return ""
        
        # Remove HTML tags
        text = re.sub(r'<[^>]+>', ' ', text)
        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text)
        # Remove special characters but keep alphanumeric and basic punctuation
        text = re.sub(r'[^\w\s\.\,\!\?\-]', ' ', text)
        
        return text.strip()
    
    def generate_embedding(self, text: str) -> List[float]:
        """Generate embedding for given text"""
        try:
            cleaned_text = self.clean_text(text)
            if not cleaned_text:
                logger.warning("Empty text provided for embedding")
                return [0.0] * 384  # Return zero vector for empty text
            
            embedding = self.model.encode(cleaned_text)
            return embedding.tolist()
        except Exception as e:
            logger.error(f"Error generating embedding: {e}")
            return [0.0] * 384
    
    def store_cv_embedding(self, cv_text: str, cv_id: str) -> bool:
        """Store CV embedding in vector database"""
        try:
            embedding = self.generate_embedding(cv_text)
            
            # Create a hash of the CV text for deduplication
            text_hash = hashlib.md5(cv_text.encode()).hexdigest()
            
            self.cv_collection.upsert(
                embeddings=[embedding],
                documents=[cv_text[:1000]],  # Store first 1000 chars as document
                metadatas=[{
                    "cv_id": cv_id,
                    "text_hash": text_hash,
                    "created_at": str(np.datetime64('now'))
                }],
                ids=[cv_id]
            )
            
            logger.info(f"CV embedding stored with ID: {cv_id}")
            return True
            
        except Exception as e:
            logger.error(f"Error storing CV embedding: {e}")
            return False
    
    def store_job_embeddings(self, jobs: List[Dict[str, Any]]) -> bool:
        """Store job descriptions embeddings in vector database"""
        try:
            embeddings = []
            documents = []
            metadatas = []
            ids = []
            
            for job in jobs:
                job_id = job.get('id', job.get('slug', ''))
                if not job_id:
                    continue
                
                # Combine relevant job text for embedding
                job_text = self._combine_job_text(job)
                
                if job_text:
                    embedding = self.generate_embedding(job_text)
                    
                    embeddings.append(embedding)
                    documents.append(job_text[:1000])  # Store first 1000 chars
                    metadatas.append({
                        "job_id": job_id,
                        "company": job.get('company', ''),
                        "position": job.get('position', ''),
                        "location": job.get('location', ''),
                        "salary_min": job.get('salary_min', 0),
                        "salary_max": job.get('salary_max', 0),
                        "created_at": str(np.datetime64('now'))
                    })
                    ids.append(str(job_id))
            
            if embeddings:
                self.jobs_collection.upsert(
                    embeddings=embeddings,
                    documents=documents,
                    metadatas=metadatas,
                    ids=ids
                )
                
                logger.info(f"Stored {len(embeddings)} job embeddings")
                return True
            
            return False
            
        except Exception as e:
            logger.error(f"Error storing job embeddings: {e}")
            return False
    
    def _combine_job_text(self, job: Dict[str, Any]) -> str:
        """Combine relevant job fields into single text for embedding"""
        text_parts = []
        
        # Add job title/position
        if job.get('position'):
            text_parts.append(f"Position: {job['position']}")
        
        # Add company
        if job.get('company'):
            text_parts.append(f"Company: {job['company']}")
        
        # Add description
        if job.get('description'):
            text_parts.append(f"Description: {job['description']}")
        
        # Add tags/skills
        if job.get('tags'):
            tags_text = ', '.join(job['tags'])
            text_parts.append(f"Skills: {tags_text}")
        
        # Add location
        if job.get('location'):
            text_parts.append(f"Location: {job['location']}")
        
        return ' '.join(text_parts)
    
    def calculate_similarity_scores(self, cv_id: str, job_ids: List[str]) -> Dict[str, float]:
        """Calculate similarity scores between CV and jobs"""
        try:
            # Get CV embedding
            cv_results = self.cv_collection.get(
                ids=[cv_id],
                include=['embeddings']
            )
            
            if not cv_results['embeddings']:
                logger.warning(f"CV embedding not found for ID: {cv_id}")
                return {}
            
            cv_embedding = np.array(cv_results['embeddings'][0])
            
            # Get job embeddings
            job_results = self.jobs_collection.get(
                ids=job_ids,
                include=['embeddings']
            )
            
            similarity_scores = {}
            
            for i, job_id in enumerate(job_results['ids']):
                if i < len(job_results['embeddings']):
                    job_embedding = np.array(job_results['embeddings'][i])
                    
                    # Calculate cosine similarity
                    similarity = self._cosine_similarity(cv_embedding, job_embedding)
                    
                    # Convert to percentage (0-100)
                    similarity_percentage = max(0, min(100, int(similarity * 100)))
                    
                    similarity_scores[job_id] = similarity_percentage
            
            return similarity_scores
            
        except Exception as e:
            logger.error(f"Error calculating similarity scores: {e}")
            return {}
    
    def _cosine_similarity(self, vec1: np.ndarray, vec2: np.ndarray) -> float:
        """Calculate cosine similarity between two vectors"""
        try:
            # Handle zero vectors
            norm1 = np.linalg.norm(vec1)
            norm2 = np.linalg.norm(vec2)
            
            if norm1 == 0 or norm2 == 0:
                return 0.0
            
            # Calculate cosine similarity
            similarity = np.dot(vec1, vec2) / (norm1 * norm2)
            
            # Ensure result is between 0 and 1
            return max(0.0, min(1.0, similarity))
            
        except Exception as e:
            logger.error(f"Error calculating cosine similarity: {e}")
            return 0.0
    
    def get_collection_stats(self) -> Dict[str, int]:
        """Get statistics about stored embeddings"""
        try:
            cv_count = self.cv_collection.count()
            jobs_count = self.jobs_collection.count()
            
            return {
                "cv_embeddings": cv_count,
                "job_embeddings": jobs_count
            }
        except Exception as e:
            logger.error(f"Error getting collection stats: {e}")
            return {"cv_embeddings": 0, "job_embeddings": 0}