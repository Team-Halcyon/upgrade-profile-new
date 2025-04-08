"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getCvTemplates, generateCV } from '@/lib/userAPIs';
import styles from './cv-templates.module.css';

export default function CVTemplatesPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  
  // For demo purposes, hardcoded email - in a real app this would come from authentication
  const userEmail = 'user@example.com';

  useEffect(() => {
    // Fetch available templates when component mounts
    const fetchTemplates = async () => {
      try {
        const response = await getCvTemplates();
        if (response.success && response.templates) {
          setTemplates(response.templates);
          // Auto-select the first template
          if (response.templates.length > 0) {
            setSelectedTemplate(response.templates[0].id);
          }
        } else {
          setError('Failed to load CV templates');
        }
      } catch (err) {
        setError('Error loading CV templates: ' + (err.message || 'Unknown error'));
      } finally {
        setLoading(false);
      }
    };
    
    fetchTemplates();
  }, []);

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const handleGenerateCV = async () => {
    if (!selectedTemplate) {
      setError('Please select a template');
      return;
    }
    
    // Get CV data from session storage
    const cvDataString = sessionStorage.getItem('parsedCVData');
    if (!cvDataString) {
      setError('No CV data found. Please go back and complete the previous steps.');
      return;
    }
    
    const cvData = JSON.parse(cvDataString);
    setGenerating(true);
    setError('');
    
    try {
      const response = await generateCV(userEmail, selectedTemplate, cvData);
      
      if (response.success) {
        // Store the generated CV HTML and ID for the preview page
        sessionStorage.setItem('generatedCVHtml', response.cvHtml);
        sessionStorage.setItem('generatedCVId', response.cvId);
        
        // Navigate to the preview page
        router.push('/cv-generation/preview-cv');
      } else {
        setError(response.message || 'Failed to generate CV');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while generating your CV');
    } finally {
      setGenerating(false);
    }
  };

  // Placeholder template images until real ones are available
  const getTemplatePlaceholderUrl = (templateName) => {
    return `/templates/${templateName.toLowerCase()}.png`;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Choose a Template</h1>
      <p className={styles.pageDescription}>
        Select a template for your CV. Each template has a unique design to help you stand out.
      </p>
      
      {error && <div className={styles.errorMessage}>{error}</div>}
      
      {loading ? (
        <div className={styles.loading}>Loading templates...</div>
      ) : (
        <>
          <div className={styles.templatesGrid}>
            {templates.map((template) => (
              <div 
                key={template.id}
                className={`${styles.templateCard} ${selectedTemplate === template.id ? styles.selected : ''}`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <div className={styles.templateImageContainer}>
                  {/* Using a placeholder image - in production, use template.template_image */}
                  <img 
                    src={getTemplatePlaceholderUrl(template.template_name)}
                    alt={template.template_name}
                    className={styles.templateImage}
                  />
                  {template.is_premium && (
                    <div className={styles.premiumBadge}>Premium</div>
                  )}
                </div>
                <div className={styles.templateName}>{template.template_name}</div>
                
                {selectedTemplate === template.id && (
                  <div className={styles.selectedIndicator}>✓ Selected</div>
                )}
              </div>
            ))}
          </div>
          
          <div className={styles.actionButtons}>
            <button 
              onClick={() => router.back()} 
              className={styles.secondaryButton}
              disabled={generating}
            >
              Back
            </button>
            <button 
              onClick={handleGenerateCV} 
              className={styles.primaryButton}
              disabled={!selectedTemplate || generating}
            >
              {generating ? 'Generating...' : 'Select Template'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
