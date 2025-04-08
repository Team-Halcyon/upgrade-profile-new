"use client"

import { useState } from "react"
import Link from "next/link"
import { Linkedin, ArrowRight, Lock, CheckCircle } from "lucide-react"
import styles from "./linkedin-import.module.css"
import axios from "axios"

export default function LinkedinImportPage() {
  const [linkedinUrl, setLinkedinUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [cvData, setCvData] = useState(null)

  const handleConnect = async () => {
    if (!linkedinUrl.trim()) {
      setError("Please enter a LinkedIn profile URL")
      return
    }

    try {
      setLoading(true)
      setError("")
      const res = await axios.post("http://localhost:5000/generate-cv", {
        linkedin_url: linkedinUrl
      })
      setCvData(res.data.cv_data)
      console.log("CV data:", res.data.cv_data)
    } catch (err) {
      console.error(err)
      setError("Failed to generate CV. Please try again.")
    } finally {
      setLoading(false)
    }
  }

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

          <label htmlFor="linkedinUrl" className={styles.urlLabel}>
            Enter your LinkedIn profile URL
          </label>
          <input
            type="text"
            id="linkedinUrl"
            placeholder="https://www.linkedin.com/in/your-profile"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            className={styles.linkedinInput}
          />

          {error && <p className={styles.error}>{error}</p>}

          <button
            className={styles.connectButton}
            onClick={handleConnect}
            disabled={loading}
          >
            <Linkedin size={20} />
            {loading ? "Generating..." : "Connect with LinkedIn"}
          </button>

          <div className={styles.privacyNote}>
            <Lock size={16} />
            <span>Your data is secure and we don't post anything to your profile</span>
          </div>
        </div>

        <div className={styles.benefitsSection}>
          <h3 className={styles.benefitsTitle}>Benefits of LinkedIn Import</h3>
          <ul className={styles.benefitsList}>
            {/* Benefit items */}
            {[
              ["Save Time", "Import your entire professional history in seconds"],
              ["Complete Information", "We'll import your work experience, education, skills, and more"],
              ["AI Enhancement", "Our AI will optimize your imported data for better results"],
              ["Fully Editable", "You can edit all imported information after import"]
            ].map(([title, desc], i) => (
              <li key={i} className={styles.benefitItem}>
                <CheckCircle size={20} className={styles.checkIcon} />
                <div>
                  <h4 className={styles.benefitName}>{title}</h4>
                  <p className={styles.benefitDescription}>{desc}</p>
                </div>
              </li>
            ))}
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
