"use client"

import Link from "next/link"
import Image from "next/image"
import {
  Download,
  Share2,
  Edit,
  ArrowLeft,
  CheckCircle,
  Mail,
  Linkedin,
  Twitter,
} from "lucide-react"
import styles from "./preview-cv.module.css"

export default function PreviewPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Your CV is Ready!</h1>
          <p className={styles.subtitle}>
            Your professional CV has been generated and optimized for your target role
          </p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.actionButton}>
            <Download size={18} />
            Download PDF
          </button>
          <button className={styles.actionButton}>
            <Share2 size={18} />
            Share
          </button>
          <Link href="/cv-generation/editor" className={styles.editButton}>
            <Edit size={18} />
            Edit
          </Link>
        </div>
      </div>

      <div className={styles.previewContainer}>
        <div className={styles.previewDocument}>
          <Image
            src="/placeholder.svg?height=1200&width=850"
            alt="CV Preview"
            width={850}
            height={1200}
            className={styles.previewImage}
          />
        </div>

        <div className={styles.previewSidebar}>
          <div className={styles.scoreCard}>
            <div className={styles.scoreHeader}>
              <h3 className={styles.scoreTitle}>CV Score</h3>
              <div className={styles.scoreValue}>
                92<span className={styles.scoreMax}>/100</span>
              </div>
            </div>
            <div className={styles.scoreProgress}>
              <div className={styles.progressBar} style={{ width: "92%" }}></div>
            </div>
            <p className={styles.scoreDescription}>
              Your CV is well-optimized for your target role!
            </p>
          </div>

          <div className={styles.optimizationCard}>
            <h3 className={styles.optimizationTitle}>Optimization Report</h3>

            <div className={styles.optimizationItem}>
              <CheckCircle size={18} className={styles.checkIcon} />
              <div>
                <h4 className={styles.itemTitle}>ATS Compatibility</h4>
                <p className={styles.itemDescription}>
                  Your CV is optimized for applicant tracking systems
                </p>
              </div>
            </div>

            <div className={styles.optimizationItem}>
              <CheckCircle size={18} className={styles.checkIcon} />
              <div>
                <h4 className={styles.itemTitle}>Keyword Optimization</h4>
                <p className={styles.itemDescription}>
                  Contains relevant keywords for your target role
                </p>
              </div>
            </div>

            <div className={styles.optimizationItem}>
              <CheckCircle size={18} className={styles.checkIcon} />
              <div>
                <h4 className={styles.itemTitle}>Professional Formatting</h4>
                <p className={styles.itemDescription}>
                  Clean, professional layout with proper spacing
                </p>
              </div>
            </div>

            <div className={styles.optimizationItem}>
              <CheckCircle size={18} className={styles.checkIcon} />
              <div>
                <h4 className={styles.itemTitle}>Quantifiable Achievements</h4>
                <p className={styles.itemDescription}>
                  Includes measurable results and achievements
                </p>
              </div>
            </div>
          </div>

          <div className={styles.nextStepsCard}>
            <h3 className={styles.nextStepsTitle}>Next Steps</h3>
            <ul className={styles.nextStepsList}>
              <li className={styles.nextStepItem}>
                <Link href="/job-matching" className={styles.nextStepLink}>
                  Find matching jobs
                </Link>
              </li>
              <li className={styles.nextStepItem}>
                <Link href="/cv-generation/cover-letter" className={styles.nextStepLink}>
                  Generate a matching cover letter
                </Link>
              </li>
              <li className={styles.nextStepItem}>
                <Link href="/skill-development" className={styles.nextStepLink}>
                  Identify skill gaps for your target role
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.shareSection}>
        <h3 className={styles.shareTitle}>Share Your CV</h3>
        <div className={styles.shareOptions}>
          <button className={`${styles.shareButton} ${styles.emailShare}`}>
            <Mail size={18} />
            Email
          </button>
          <button className={`${styles.shareButton} ${styles.linkedinShare}`}>
            <Linkedin size={18} />
            LinkedIn
          </button>
          <button className={`${styles.shareButton} ${styles.twitterShare}`}>
            <Twitter size={18} />
            Twitter
          </button>
        </div>
      </div>

      <div className={styles.actions}>
        <Link href="/cv-generation/editor" className={styles.backButton}>
          <ArrowLeft size={18} />
          Back to Editor
        </Link>
      </div>
    </div>
  )
}
