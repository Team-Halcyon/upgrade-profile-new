"use client"

import Link from "next/link"
import {
  ArrowRight,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  Languages,
  User,
} from "lucide-react"
import styles from "./create-cv.module.css"

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Create Your CV</h1>
        <p className={styles.subtitle}>
          Let's build your professional CV step by step with our AI-powered assistant
        </p>
      </div>

      <div className={styles.stepsContainer}>
        <div className={styles.stepsProgress}>
          <div className={styles.progressLine}>
            <div className={styles.progressFilled} style={{ width: "16.6%" }}></div>
          </div>

          <div className={styles.stepsIndicators}>
            <div className={`${styles.stepIndicator} ${styles.activeStep}`}>
              <User size={20} />
              <span className={styles.stepName}>Personal</span>
            </div>
            <div className={styles.stepIndicator}>
              <FileText size={20} />
              <span className={styles.stepName}>Summary</span>
            </div>
            <div className={styles.stepIndicator}>
              <Briefcase size={20} />
              <span className={styles.stepName}>Experience</span>
            </div>
            <div className={styles.stepIndicator}>
              <GraduationCap size={20} />
              <span className={styles.stepName}>Education</span>
            </div>
            <div className={styles.stepIndicator}>
              <Award size={20} />
              <span className={styles.stepName}>Skills</span>
            </div>
            <div className={styles.stepIndicator}>
              <Languages size={20} />
              <span className={styles.stepName}>Additional</span>
            </div>
          </div>
        </div>

        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Personal Information</h2>
          <p className={styles.formDescription}>
            Let's start with your basic information that will appear at the top of your CV
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
            <div className={styles.aiSuggestion}>
              <p className={styles.aiMessage}>
                <strong>AI Assistant:</strong> Would you like me to suggest a professional summary based on your job
                title?
              </p>
              <button className={styles.aiButton}>Yes, help me</button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <Link href="/cv-generation" className={styles.backButton}>
          Back
        </Link>
        <Link href="/cv-generation/create?step=2" className={styles.continueButton}>
          Continue
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  )
}
