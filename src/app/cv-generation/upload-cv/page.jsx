"use client"

import Link from "next/link"
import { Upload, FileText, Linkedin, ArrowRight } from "lucide-react"
import styles from "./upload-cv.module.css"

export default function UploadPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Upload Your Existing CV</h1>
        <p className={styles.subtitle}>
          Upload your current resume and our AI will enhance it to make it more effective
        </p>
      </div>

      <div className={styles.uploadContainer}>
        <div className={styles.uploadArea}>
          <div className={styles.uploadIcon}>
            <Upload size={48} color="#4F6AF6" />
          </div>
          <h3 className={styles.uploadTitle}>Drag & Drop your file here</h3>
          <p className={styles.uploadDescription}>
            or <span className={styles.browseText}>browse files</span> on your computer
          </p>
          <p className={styles.fileFormats}>Supported formats: PDF, DOCX, TXT (Max 50MB)</p>
        </div>

        <div className={styles.divider}>
          <span className={styles.dividerText}>OR</span>
        </div>

        <div className={styles.alternativeOptions}>
          <Link href="/cv-generation/linkedin-import" className={styles.linkedinButton}>
            <Linkedin size={20} />
            Import from LinkedIn
          </Link>

          <div className={styles.jobDescriptionArea}>
            <h3 className={styles.jobDescriptionTitle}>
              <FileText size={20} />
              Paste Job Description
            </h3>
            <p className={styles.jobDescriptionText}>
              Paste the job description you're applying for and let our AI optimize your CV
            </p>
            <textarea
              className={styles.jobDescriptionInput}
              placeholder="Paste your job description here..."
              rows={5}
            />
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <Link href="/cv-generation" className={styles.backButton}>
          Back
        </Link>
        <Link href="/cv-generation/edit-cv" className={styles.continueButton}>
          Continue
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  )
}
