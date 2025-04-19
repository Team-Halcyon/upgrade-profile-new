"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { v4 as uuidv4 } from "uuid"
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  Languages,
  ArrowRight,
  ArrowLeft,
  Trash,
  Plus,
  Sparkles,
  Loader2,
} from "lucide-react"
import {
  saveExperience,
  getResumeData,
  enhanceExperienceWithAI,
} from "@/app/actions/cv-actions"
import styles from "../create-cv.module.css"
import experienceStyles from "./experience.module.css"

export default function ExperiencePage() {
  const router = useRouter()
  const [experiences, setExperiences] = useState([
    {
      id: uuidv4(),
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [enhancingId, setEnhancingId] = useState(null)
  const [error, setError] = useState("")
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [isFromUpload, setIsFromUpload] = useState(false)

  useEffect(() => {
    async function loadResumeData() {
      try {
        const data = await getResumeData()
        
        // Handle experience data from uploaded CV
        if (data.experience && data.experience.length > 0) {
          const experiencesWithIds = data.experience.map((exp) => ({
            ...exp,
            id: exp.id || uuidv4(),
          }))
          setExperiences(experiencesWithIds)
        }
        
        // Add source information to display appropriate messaging
        const urlParams = new URLSearchParams(window.location.search);
        const source = urlParams.get('source');
        setIsFromUpload(source === 'upload');
        
        setIsLoadingData(false)
      } catch (error) {
        console.error("Error loading resume data:", error)
        setIsLoadingData(false)
      }
    }

    loadResumeData()
  }, [])

  const handleChange = (id, field, value) => {
    setExperiences((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    )
  }

  const handleAddExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: uuidv4(),
        jobTitle: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
    ])
  }

  const handleRemoveExperience = (id) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter((exp) => exp.id !== id))
    }
  }

  const handleCurrentJobChange = (id, checked) => {
    setExperiences((prev) =>
      prev.map((exp) =>
        exp.id === id ? { ...exp, current: checked, endDate: checked ? "" : exp.endDate } : exp,
      ),
    )
  }

  const handleEnhanceWithAI = async (id) => {
    const experience = experiences.find((exp) => exp.id === id)
    if (!experience) return

    setEnhancingId(id)
    setError("")

    try {
      const result = await enhanceExperienceWithAI(
        experience.jobTitle,
        experience.company,
        experience.description,
      )

      if (result.success && result.description) {
        handleChange(id, "description", result.description)
      } else {
        setError(result.error || "Failed to enhance job description")
      }
    } catch (error) {
      console.error("Error enhancing job description:", error)
      setError("Failed to enhance job description with AI")
    } finally {
      setEnhancingId(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const isValid = experiences.every(
      (exp) => exp.jobTitle && exp.company && exp.startDate && (exp.current || exp.endDate),
    )

    if (!isValid) {
      setError("Please fill in all required fields for each experience")
      setIsLoading(false)
      return
    }

    try {
      const experiencesToSave = experiences.map(({ id, ...rest }) => rest)
      const result = await saveExperience(experiencesToSave)

      if (result.success) {
        router.push("/cv-generation/create-cv/education")
      } else {
        setError(result.error || "Failed to save experience")
      }
    } catch (error) {
      console.error("Error saving experience:", error)
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
      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: "49.8%" }}></div>
        </div>
        <div className={styles.progressSteps}>
          <div className={styles.progressStep}>
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
          <div className={`${styles.progressStep} ${styles.activeStep}`}>
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
        <h2 className={styles.sectionTitle}>Work Experience</h2>
        <p className={styles.sectionDescription}>
          {isFromUpload 
            ? "We've extracted your work experience from your uploaded CV. Feel free to review and edit it as needed."
            : "Add your work experience, starting with your most recent position"
          }
        </p>

        {error && <div className={styles.errorMessage}>{error}</div>}
        
        {isFromUpload && experiences.length > 0 && (
          <div className={styles.uploadNotice}>
            <FileText size={18} className={styles.uploadIcon} />
            <span>This information was automatically extracted from your uploaded CV</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {experiences.map((experience, index) => (
            <div key={experience.id} className={experienceStyles.experienceEntry}>
              <div className={experienceStyles.entryHeader}>
                <h3 className={experienceStyles.entryTitle}>Experience #{index + 1}</h3>
                <button
                  type="button"
                  className={experienceStyles.removeButton}
                  onClick={() => handleRemoveExperience(experience.id)}
                  disabled={experiences.length === 1}
                >
                  <Trash size={16} />
                </button>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Job Title*</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    placeholder="Senior Software Engineer"
                    value={experience.jobTitle}
                    onChange={(e) => handleChange(experience.id, "jobTitle", e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Company*</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    placeholder="Tech Solutions Inc."
                    value={experience.company}
                    onChange={(e) => handleChange(experience.id, "company", e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Location</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    placeholder="New York, NY"
                    value={experience.location}
                    onChange={(e) => handleChange(experience.id, "location", e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Employment Type</label>
                  <select
                    className={styles.formInput}
                    value={experience.employmentType || ""}
                    onChange={(e) => handleChange(experience.id, "employmentType", e.target.value)}
                  >
                    <option value="">Select Type</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="freelance">Freelance</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Start Date*</label>
                  <input
                    type="month"
                    className={styles.formInput}
                    value={experience.startDate}
                    onChange={(e) => handleChange(experience.id, "startDate", e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>End Date</label>
                  <div className={experienceStyles.endDateContainer}>
                    <input
                      type="month"
                      className={styles.formInput}
                      value={experience.endDate}
                      onChange={(e) => handleChange(experience.id, "endDate", e.target.value)}
                      disabled={experience.current}
                      required={!experience.current}
                    />
                    <label className={experienceStyles.currentJobLabel}>
                      <input
                        type="checkbox"
                        className={experienceStyles.currentJobCheckbox}
                        checked={experience.current}
                        onChange={(e) => handleCurrentJobChange(experience.id, e.target.checked)}
                      />
                      <span>Current job</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className={styles.formGroup} style={{ marginBottom: "1.5rem" }}>
                <label className={styles.formLabel}>Job Description*</label>
                <textarea
                  className={styles.formTextarea}
                  rows={5}
                  placeholder="• Led a team of 5 developers to build a scalable e-commerce platform..."
                  value={experience.description}
                  onChange={(e) => handleChange(experience.id, "description", e.target.value)}
                  required
                ></textarea>
              </div>

              <div className={experienceStyles.aiSuggestion}>
                <button
                  type="button"
                  className={experienceStyles.aiSuggestionButton}
                  onClick={() => handleEnhanceWithAI(experience.id)}
                  disabled={!experience.jobTitle || !experience.company || enhancingId === experience.id}
                >
                  {enhancingId === experience.id ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={16} />
                      Enhancing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2" size={16} />
                      Enhance with AI
                    </>
                  )}
                </button>
                <span className={experienceStyles.aiSuggestionText}>
                  Add quantifiable achievements and optimize wording
                </span>
              </div>
            </div>
          ))}

          <button type="button" className={experienceStyles.addExperienceButton} onClick={handleAddExperience}>
            <Plus size={16} /> Add Another Experience
          </button>

          <div className={styles.formActions}>
            <Link href="/cv-generation/create-cv/summary" className={styles.backButton}>
              <ArrowLeft size={16} className={styles.backIcon} /> Previous
            </Link>
            <button type="submit" className={styles.nextButton} disabled={isLoading}>
              {isLoading ? "Saving..." : "Next"}
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
