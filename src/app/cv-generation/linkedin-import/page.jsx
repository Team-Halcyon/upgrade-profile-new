"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { processLinkedInProfile } from '@/lib/userAPIs';
import styles from '../cv-generation.module.css';

export default function LinkedInImportPage() {
  const router = useRouter();
  const [profileHtml, setProfileHtml] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // For demo purposes, hardcoded email - in a real app this would come from authentication
  const userEmail = 'user@example.com';

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!profileHtml.trim()) {
      setError('Please paste your LinkedIn profile HTML');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await processLinkedInProfile(profileHtml, userEmail);
      
      if (response.success) {
        // Store the parsed data in sessionStorage to use in the create-cv pages
        sessionStorage.setItem('parsedCVData', JSON.stringify(response.parsedData));
        
        // Navigate to the first step of the create-cv flow to review extracted information
        router.push('/cv-generation/create-cv/personal-information');
      } else {
        setError(response.message || 'Failed to process LinkedIn profile');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while processing your LinkedIn profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Import from LinkedIn</h1>
      
      <div className={styles.importInstructions}>
        <h2>How to import your LinkedIn profile:</h2>
        <ol>
          <li>Log in to your LinkedIn account</li>
          <li>Go to your profile page</li>
          <li>Right-click on the page and select "View Page Source" or press Ctrl+U (Cmd+Option+U on Mac)</li>
          <li>Copy all the HTML code (Ctrl+A then Ctrl+C)</li>
          <li>Paste the HTML code in the text area below</li>
        </ol>
      </div>
      
      {error && <div className={styles.errorMessage}>{error}</div>}
      
      <form onSubmit={handleSubmit} className={styles.importForm}>
        <div className={styles.formGroup}>
          <label htmlFor="linkedin-html" className={styles.formLabel}>
            Paste LinkedIn Profile HTML:
          </label>
          <textarea
            id="linkedin-html"
            value={profileHtml}
            onChange={(e) => setProfileHtml(e.target.value)}
            placeholder="Paste your LinkedIn profile HTML here..."
            className={styles.textArea}
            rows={10}
            required
          />
        </div>
        
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
          <Link href="/cv-generation/upload-cv" className={styles.optionLink}>
            Upload your CV
          </Link>
          <Link href="/cv-generation/create-cv/personal-information" className={styles.optionLink}>
            Create from scratch
          </Link>
        </div>
      </div>
      
      <div className={styles.privacyNote}>
        <p>
          <strong>Privacy Note:</strong> We only use the HTML to extract your professional information. 
          We do not store the raw HTML or access your LinkedIn account.
        </p>
      </div>
    </div>
  );
}
