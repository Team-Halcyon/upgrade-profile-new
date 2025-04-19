"use client"

import React, { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import {
  ArrowRight,
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  Languages,
} from "lucide-react"
import { savePersonalInfo, getResumeData } from "@/app/actions/cv-actions"
import styles from "./create-cv.module.css"

// Client component that uses useSearchParams
function CreateCVContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isFromUpload = searchParams.get("source") === "upload"

  const [formData, setFormData] = useState({
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    website: "",
    github: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [isLoadingData, setIsLoadingData] = useState(true)

  useEffect(() => {
    async function loadResumeData() {
      try {
        const data = await getResumeData()
        if (data.personalInfo) {
          setFormData(data.personalInfo)
        }
        setIsLoadingData(false)
      } catch (error) {
        console.error("Error loading resume data:", error)
        setIsLoadingData(false)
      }
    }

    loadResumeData()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccessMessage("")

    try {
      const result = await savePersonalInfo(formData)

      if (result.success) {
        setSuccessMessage("Your information has been successfully saved.")
        router.push("/cv-generation/create-cv/summary")
      } else {
        setError(result.error || "An error occurred while saving your information")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingData) {
    return <div className={styles.loadingContainer}>Loading...</div>
  }

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

        {error && <div className={styles.errorMessage}>{error}</div>}
        {successMessage && <div className={styles.successMessage}>{successMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Full Name*</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="John Doe"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Job Title*</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="Senior Software Engineer"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Email*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="johndoe@example.com"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Phone*</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="New York, NY"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>LinkedIn</label>
              <input
                type="text"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="linkedin.com/in/johndoe"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Website/Portfolio</label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="johndoe.com"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>GitHub</label>
              <input
                type="text"
                name="github"
                value={formData.github}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="github.com/johndoe"
              />
            </div>
          </div>

          <div className={styles.formActions}>
            <Link href="/cv-generation" className={styles.backButton}>
              Back
            </Link>
            <button type="submit" className={styles.nextButton} disabled={isLoading}>
              {isLoading ? "Saving..." : "Continue"}
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Main component with Suspense boundary
export default function CreateCVPage() {
  return (
    <Suspense fallback={<div className={styles.loadingContainer}>Loading...</div>}>
      <CreateCVContent />
    </Suspense>
  )
}
