import React from 'react';
import styles from './ResumeBuilder.module.css';
import Link from 'next/link';

const ResumeBuilder = () => {
  return (
      <div className={styles.mainContent}>
        <h1 className={styles.title}>Create Your Perfect Resume</h1>
        <p className={styles.subtitle}>
          Our AI-powered resume builder helps you create professional, ATS-optimized resumes in minutes
        </p>
        
        <div className={styles.builderCard}>
          <div className={styles.builderHeader}>
            <div className={styles.builderLogo}>
              <span className={styles.starIcon}>✦</span>
            </div>
            <div className={styles.builderInfo}>
              <h2 className={styles.builderTitle}>AI Resume Builder</h2>
              <p className={styles.builderSubtitle}>Optimized for ATS systems</p>
            </div>
          </div>
          
          <div className={styles.strengthSection}>
            <div className={styles.strengthLabel}>Resume Strength</div>
            <div className={styles.strengthValue}>92%</div>
          </div>
          
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: '92%' }}></div>
          </div>
          
          <div className={styles.featuresGrid}>
            <div className={styles.featureBox}>
              <div className={styles.featureIcon}>📄</div>
              <div className={styles.featureContent}>
                <div className={styles.featureLabel}>Resume</div>
                <div className={styles.featureValue}>50+ Templates</div>
              </div>
            </div>
            
            <div className={styles.featureBox}>
              <div className={styles.featureIcon}>🔍</div>
              <div className={styles.featureContent}>
                <div className={styles.featureLabel}>Job Match</div>
                <div className={styles.featureValue}>98% Accuracy</div>
              </div>
            </div>
            
            <div className={styles.featureBox}>
              <div className={styles.featureIcon}>🔄</div>
              <div className={styles.featureContent}>
                <div className={styles.featureLabel}>Applications</div>
                <div className={styles.featureValue}>Auto-Apply</div>
              </div>
            </div>
            
            <div className={styles.featureBox}>
              <div className={styles.featureIcon}>💬</div>
              <div className={styles.featureContent}>
                <div className={styles.featureLabel}>Interviews</div>
                <div className={styles.featureValue}>AI Preparation</div>
              </div>
            </div>
          </div>
          
          <Link href="/cv-generation">
            <button className={styles.generateButton}>
              Generate Your AI Resume
            </button>
          </Link>
        </div>
      </div>
   
  );
};

export default ResumeBuilder;