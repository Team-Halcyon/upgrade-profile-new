"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { User, FileText, Briefcase, GraduationCap, Award, Languages, ArrowRight, ArrowLeft } from "lucide-react"
import styles from "./create-cv.module.css"

export default function CreateCVPage() {
  const searchParams = useSearchParams();
  const source = searchParams.get('source');
  const isFromUpload = source === 'upload';

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {isFromUpload ? "Review Your CV Information" : "Create Your CV"}
        </h1>
        <p className={styles.subtitle}>
          {isFromUpload 
            ? "We've extracted information from your uploaded CV. Please review and make any necessary changes."
            : "Let's build your professional CV step by step with our AI-powered assistant"}
        </p>
      </div>
      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: "16.6%" }}></div>
        </div>
        <div className={styles.progressSteps}>
          <div className={`${styles.progressStep} ${styles.activeStep}`}>
            <div className={styles.stepIcon}>
              <User size={18} />
            </div>
            <span>Personal</span>
          </div>
          <div className={styles.progressStep}>
            <div className={styles.stepIcon}>
              <FileText size={18} />
            </div>
            <span>Summary</span>
          </div>
          <div className={styles.progressStep}>
            <div className={styles.stepIcon}>
              <Briefcase size={18} />
            </div>
            <span>Experience</span>
          </div>
          <div className={styles.progressStep}>
            <div className={styles.stepIcon}>
              <GraduationCap size={18} />
            </div>
            <span>Education</span>
          </div>
          <div className={styles.progressStep}>
            <div className={styles.stepIcon}>
              <Award size={18} />
            </div>
            <span>Skills</span>
          </div>
          <div className={styles.progressStep}>
            <div className={styles.stepIcon}>
              <Languages size={18} />
            </div>
            <span>Additional</span>
          </div>
        </div>
      </div>

      <div className={styles.formSection}>
        <h2 className={styles.sectionTitle}>Personal Information</h2>
        <p className={styles.sectionDescription}>
          {isFromUpload 
            ? "Review the personal information extracted from your uploaded CV"
            : "Let's start with your basic information that will appear at the top of your CV"}
        </p>

        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Full Name*</label>
            <input type="text" className={styles.formInput} placeholder="John Doe" required />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Job Title*</label>
            <input type="text" className={styles.formInput} placeholder="Senior Software Engineer" required />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email*</label>
            <input type="email" className={styles.formInput} placeholder="johndoe@example.com" required />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Phone*</label>
            <input type="tel" className={styles.formInput} placeholder="+1 (555) 123-4567" required />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Location</label>
            <input type="text" className={styles.formInput} placeholder="New York, NY" />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>LinkedIn</label>
            <input type="text" className={styles.formInput} placeholder="linkedin.com/in/johndoe" />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Website/Portfolio</label>
            <input type="text" className={styles.formInput} placeholder="johndoe.com" />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>GitHub</label>
            <input type="text" className={styles.formInput} placeholder="github.com/johndoe" />
          </div>
        </div>

        <div className={styles.aiAssistant}>
          <div className={styles.aiMessage}>
            <strong>AI Assistant:</strong> Would you like me to suggest a professional summary based on your job title?
          </div>
          <button className={styles.aiButton}>Yes, help me</button>
        </div>

        <div className={styles.formActions}>
          <Link href={isFromUpload ? "/cv-generation/upload-cv" : "/cv-generation"} className={styles.backButton}>
            <ArrowLeft size={18} /> Back
          </Link>
          <Link href="/cv-generation/create-cv/summary" className={styles.nextButton}>
            Next <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  )
}

