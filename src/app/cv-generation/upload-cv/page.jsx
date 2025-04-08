"use client"

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { uploadCV } from '@/lib/userAPIs';
import styles from '../cv-generation.module.css';

export default function UploadCVPage() {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // For demo purposes, hardcoded email - in a real app this would come from authentication
  const userEmail = 'user@example.com';

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      handleFileSelection(droppedFile);
    }
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleFileSelection = (selectedFile) => {
    // Validate file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!validTypes.includes(selectedFile.type)) {
      setError('Please upload a PDF, DOCX, or TXT file');
      setFile(null);
      return;
    }
    
    // Validate file size (max 50MB)
    if (selectedFile.size > 50 * 1024 * 1024) {
      setError('File size exceeds 50MB limit');
      setFile(null);
      return;
    }
    
    setFile(selectedFile);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file to upload');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await uploadCV(file, userEmail);
      
      if (response.success) {
        // Store the parsed data in sessionStorage to use in the create-cv pages
        sessionStorage.setItem('parsedCVData', JSON.stringify(response.parsedData));
        
        // Navigate to the first step of the create-cv flow to review extracted information
        router.push('/cv-generation/create-cv/personal-information');
      } else {
        setError(response.message || 'Failed to process CV');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while uploading your CV');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Upload your CV</h1>
      <p className={styles.pageDescription}>
        Upload your existing CV to get started. We&apos;ll extract the information and let you review it before generating your new CV.
      </p>
      
      {error && <div className={styles.errorMessage}>{error}</div>}
      
      <form onSubmit={handleSubmit} className={styles.uploadForm}>
        <div 
          className={`${styles.dropzone} ${dragging ? styles.dragging : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input 
            type="file" 
            id="cv-upload" 
            accept=".pdf,.doc,.docx,.txt" 
            onChange={handleFileChange}
            className={styles.fileInput}
          />
          
          <div className={styles.uploadContent}>
            <img src="/file.svg" alt="Upload" className={styles.uploadIcon} />
            <p className={styles.uploadText}>
              Drag & Drop your file here<br />
              or <span className={styles.browseText}>browse files</span> on your computer
            </p>
            <p className={styles.uploadNote}>
              Supported formats: PDF, DOCX, TXT (Max 50MB)
            </p>
          </div>
        </div>
        
        {file && (
          <div className={styles.selectedFile}>
            <p>Selected file: {file.name}</p>
          </div>
        )}
        
        <div className={styles.actionButtons}>
          <button 
            type="submit" 
            className={styles.primaryButton}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Continue'}
          </button>
        </div>
      </form>
      
      <div className={styles.alternativeOptions}>
        <p>Or choose another option:</p>
        <div className={styles.optionLinks}>
          <Link href="/cv-generation/linkedin-import" className={styles.optionLink}>
            Import from LinkedIn
          </Link>
          <Link href="/cv-generation/create-cv/personal-information" className={styles.optionLink}>
            Create from scratch
          </Link>
        </div>
      </div>
    </div>
  );
}
