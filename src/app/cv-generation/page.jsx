"use client"

import Link from "next/link"
import {
  Upload as FileUpload,
  FileText,
  Linkedin,
  CheckCircle,
} from "lucide-react"
import styles from "./cv-generation.module.css"

export default function CVGenerationPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>AI-Powered CV Generation</h1>
        <p className={styles.subtitle}>
          Create professional, ATS-optimized resumes tailored to your target roles with our AI-powered platform.
        </p>
      </div>

      <div className={styles.optionsContainer}>
        <div className={styles.optionCard}>
          <div className={styles.iconContainer}>
            <FileUpload className={styles.icon} size={48} color="#4F6AF6" />
          </div>
          <h2 className={styles.optionTitle}>Upload Existing Resume</h2>
          <p className={styles.optionDescription}>
            Upload your existing resume and our AI will enhance it
          </p>
          <Link href="/cv-generation/upload-cv" className={styles.actionButton}>
            Upload Resume
          </Link>
        </div>

        <div className={styles.optionCard}>
          <div className={styles.iconContainer}>
            <FileText className={styles.icon} size={48} color="#4F6AF6" />
          </div>
          <h2 className={styles.optionTitle}>Create New Resume</h2>
          <p className={styles.optionDescription}>
            Start from scratch and let our AI guide you through the process
          </p>
          <Link href="/cv-generation/create-cv" className={styles.actionButton}>
            Create New
          </Link>
        </div>
      </div>


      <div className={styles.linkedinSection}>
        <div className={styles.linkedinContent}>
          <Linkedin size={32} className={styles.linkedinIcon} />
          <div>
            <h3 className={styles.linkedinTitle}>Import from LinkedIn</h3>
            <p className={styles.linkedinDescription}>
              Quickly create your resume by importing your LinkedIn profile
            </p>
          </div>
        </div>
        <Link
          href="/cv-generation/linkedin-import"
          className={styles.linkedinButton}
        >
          Import LinkedIn Profile
        </Link>
      </div>

      <div className={styles.benefitsSection}>
      <h3 className={styles.benefitsTitle}>Why use our AI Resume Builder?</h3>
      <ul className={styles.benefitsList}>
        <li className={styles.benefitItem}>
          <CheckCircle size={20} className={styles.checkIcon} />
          <span>ATS-optimized templates that pass applicant tracking systems</span>
        </li>
        <li className={styles.benefitItem}>
          <CheckCircle size={20} className={styles.checkIcon} />
          <span>AI-powered content suggestions tailored to your target role</span>
        </li>
        <li className={styles.benefitItem}>
          <CheckCircle size={20} className={styles.checkIcon} />
          <span>Keyword optimization to match job descriptions</span>
        </li>
        <li className={styles.benefitItem}>
          <CheckCircle size={20} className={styles.checkIcon} />
          <span>Easy-to-use interface with real-time previews</span>
        </li>
        <li className={styles.benefitItem}>
          <CheckCircle size={20} className={styles.checkIcon} />
          <span>Dynamic formatting that adapts to industry standards</span>
        </li>
        <li className={styles.benefitItem}>
          <CheckCircle size={20} className={styles.checkIcon} />
          <span>Role-based template personalization for maximum relevance</span>
        </li>
      </ul>
    </div>
    </div>
  )
}
