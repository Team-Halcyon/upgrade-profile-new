"use client"

import Link from "next/link"
import { Linkedin, ArrowRight, Lock, CheckCircle } from "lucide-react"
import styles from "./linkedin-import.module.css"

export default function LinkedinImportPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Import from LinkedIn</h1>
        <p className={styles.subtitle}>
          Quickly create your professional CV by importing your LinkedIn profile
        </p>
      </div>

      <div className={styles.importContainer}>
        <div className={styles.linkedinSection}>
          <div className={styles.linkedinLogo}>
            <Linkedin size={48} color="#0077b5" />
          </div>
          <h2 className={styles.linkedinTitle}>Connect with LinkedIn</h2>
          <p className={styles.linkedinDescription}>
            We'll use your LinkedIn profile data to create a professional CV instantly
          </p>

          <button className={styles.connectButton}>
            <Linkedin size={20} />
            Connect with LinkedIn
          </button>

          <div className={styles.privacyNote}>
            <Lock size={16} />
            <span>Your data is secure and we don't post anything to your profile</span>
          </div>
        </div>

        <div className={styles.benefitsSection}>
          <h3 className={styles.benefitsTitle}>Benefits of LinkedIn Import</h3>
          <ul className={styles.benefitsList}>
            <li className={styles.benefitItem}>
              <CheckCircle size={20} className={styles.checkIcon} />
              <div>
                <h4 className={styles.benefitName}>Save Time</h4>
                <p className={styles.benefitDescription}>
                  Import your entire professional history in seconds
                </p>
              </div>
            </li>
            <li className={styles.benefitItem}>
              <CheckCircle size={20} className={styles.checkIcon} />
              <div>
                <h4 className={styles.benefitName}>Complete Information</h4>
                <p className={styles.benefitDescription}>
                  We'll import your work experience, education, skills, and more
                </p>
              </div>
            </li>
            <li className={styles.benefitItem}>
              <CheckCircle size={20} className={styles.checkIcon} />
              <div>
                <h4 className={styles.benefitName}>AI Enhancement</h4>
                <p className={styles.benefitDescription}>
                  Our AI will optimize your imported data for better results
                </p>
              </div>
            </li>
            <li className={styles.benefitItem}>
              <CheckCircle size={20} className={styles.checkIcon} />
              <div>
                <h4 className={styles.benefitName}>Fully Editable</h4>
                <p className={styles.benefitDescription}>
                  You can edit all imported information after import
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.alternativeSection}>
        <p className={styles.alternativeText}>
          Don't have a LinkedIn profile or prefer to start from scratch?
        </p>
        <div className={styles.alternativeActions}>
          <Link href="/cv-generation/create-cv" className={styles.alternativeButton}>
            Create New CV
          </Link>
          <Link href="/cv-generation/upload-cv" className={styles.alternativeButton}>
            Upload Existing CV
          </Link>
        </div>
      </div>

      <div className={styles.actions}>
        <Link href="/cv-generation" className={styles.backButton}>
          Back
        </Link>
        <Link href="/cv-generation/editor" className={styles.continueButton}>
          Continue
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  )
}
