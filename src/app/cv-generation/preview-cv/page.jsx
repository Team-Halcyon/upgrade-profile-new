"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './preview-cv.module.css';

export default function PreviewCVPage() {
  const router = useRouter();
  const [cvHtml, setCvHtml] = useState('');
  const [loading, setLoading] = useState(true);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    // Get the generated CV HTML from session storage
    const storedHtml = sessionStorage.getItem('generatedCVHtml');
    
    if (!storedHtml) {
      setError('No CV found. Please go back and generate your CV first.');
      setLoading(false);
      return;
    }
    
    setCvHtml(storedHtml);
    setLoading(false);
  }, []);

  const downloadAsPdf = () => {
    setDownloadingPdf(true);
    
    try {
      // Use browser's print functionality to save as PDF
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>My CV</title>
          </head>
          <body>
            ${cvHtml}
          </body>
        </html>
      `);
      
      // Wait for content to load then print
      printWindow.document.addEventListener('DOMContentLoaded', () => {
        printWindow.print();
        printWindow.close();
        setDownloadingPdf(false);
      });
      
      printWindow.document.close();
    } catch (err) {
      setError('Error generating PDF: ' + (err.message || 'Unknown error'));
      setDownloadingPdf(false);
    }
  };

  // Function to extract name from CV HTML for filename
  const extractNameForFilename = (html) => {
    const nameMatch = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
    return nameMatch ? nameMatch[1].trim().replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'my_cv';
  };

  const downloadAsHtml = () => {
    try {
      // Create a Blob with the HTML content
      const blob = new Blob([`
        <!DOCTYPE html>
        <html>
          <head>
            <title>My CV</title>
          </head>
          <body>
            ${cvHtml}
          </body>
        </html>
      `], { type: 'text/html' });
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const filename = `${extractNameForFilename(cvHtml)}_cv.html`;
      
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError('Error downloading HTML: ' + (err.message || 'Unknown error'));
    }
  };

  const handleStartOver = () => {
    // Clear stored CV data
    sessionStorage.removeItem('parsedCVData');
    sessionStorage.removeItem('generatedCVHtml');
    sessionStorage.removeItem('generatedCVId');
    
    // Go back to the CV generation home page
    router.push('/cv-generation');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Preview Your CV</h1>
      
      {error && <div className={styles.errorMessage}>{error}</div>}
      
      {loading ? (
        <div className={styles.loading}>Loading your CV...</div>
      ) : (
        <>
          <div className={styles.previewToolbar}>
            <button 
              onClick={downloadAsPdf}
              className={styles.primaryButton}
              disabled={downloadingPdf}
            >
              {downloadingPdf ? 'Generating PDF...' : 'Download as PDF'}
            </button>
            <button 
              onClick={downloadAsHtml}
              className={styles.secondaryButton}
            >
              Download as HTML
            </button>
          </div>
          
          <div className={styles.previewContainer}>
            <iframe 
              srcDoc={cvHtml}
              title="CV Preview"
              className={styles.previewFrame}
            />
          </div>
          
          <div className={styles.actionButtons}>
            <button 
              onClick={() => router.back()} 
              className={styles.secondaryButton}
            >
              Back to Templates
            </button>
            <button 
              onClick={handleStartOver} 
              className={styles.primaryButton}
            >
              Create a New CV
            </button>
          </div>
        </>
      )}
    </div>
  );
}
