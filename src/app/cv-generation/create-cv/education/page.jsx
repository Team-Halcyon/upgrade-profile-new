"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
} from "lucide-react"
import { saveEducation, getResumeData } from "@/app/actions/cv-actions"
import styles from "../create-cv.module.css"
import educationStyles from "./education.module.css"

export default function EducationPage() {
  const router = useRouter()
  const [educations, setEducations] = useState([
    {
      id: uuidv4(),
      degree: "",
      institution: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [isFromUpload, setIsFromUpload] = useState(false)

  useEffect(() => {
    async function loadResumeData() {
      try {
        const data = await getResumeData()
        if (data.education && data.education.length > 0) {
          const educationsWithIds = data.education.map((edu) => ({
            ...edu,
            id: edu.id || uuidv4(),
          }))
          setEducations(educationsWithIds)
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
    setEducations((prev) =>
      prev.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    )
  }

  const handleAddEducation = () => {
    setEducations([
      ...educations,
      {
        id: uuidv4(),
        degree: "",
        institution: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
    ])
  }

  const handleRemoveEducation = (id) => {
    if (educations.length > 1) {
      setEducations(educations.filter((edu) => edu.id !== id))
    }
  }

  const handleCurrentStudyChange = (id, checked) => {
    setEducations((prev) =>
      prev.map((edu) =>
        edu.id === id
          ? { ...edu, current: checked, endDate: checked ? "" : edu.endDate }
          : edu
      )
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const isValid = educations.every(
      (edu) => edu.degree && edu.institution && edu.startDate && (edu.current || edu.endDate)
    )

    if (!isValid) {
      setError("Please fill in all required fields for each education")
      setIsLoading(false)
      return
    }

    try {
      const educationsToSave = educations.map(({ id, ...rest }) => rest)
      const result = await saveEducation(educationsToSave)

      if (result.success) {
        router.push("/cv-generation/create-cv/skills")
      } else {
        setError(result.error || "Failed to save education")
      }
    } catch (error) {
      console.error("Error saving education:", error)
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
          <div className={styles.progressFill} style={{ width: "66.4%" }}></div>
        </div>
        <div className={styles.progressSteps}>
          <div className={styles.progressStep}>
            <div className={styles.stepIcon}><User size={18} /></div><span>Personal</span>
          </div>
          <div className={styles.progressStep}>
            <div className={styles.stepIcon}><FileText size={18} /></div><span>Summary</span>
          </div>
          <div className={styles.progressStep}>
            <div className={styles.stepIcon}><Briefcase size={18} /></div><span>Experience</span>
          </div>
          <div className={`${styles.progressStep} ${styles.activeStep}`}>
            <div className={styles.stepIcon}><GraduationCap size={18} /></div><span>Education</span>
          </div>
          <div className={styles.progressStep}>
            <div className={styles.stepIcon}><Award size={18} /></div><span>Skills</span>
          </div>
          <div className={styles.progressStep}>
            <div className={styles.stepIcon}><Languages size={18} /></div><span>Additional</span>
          </div>
        </div>
      </div>

      <div className={styles.formSection}>
        <h2 className={styles.sectionTitle}>Education</h2>
        <p className={styles.sectionDescription}>
          {isFromUpload 
            ? "We've extracted your education details from your uploaded CV. Feel free to review and edit them as needed."
            : "Add your educational background, degrees, and certifications"
          }
        </p>

        {error && <div className={styles.errorMessage}>{error}</div>}
        
        {isFromUpload && educations.length > 0 && (
          <div className={styles.uploadNotice}>
            <FileText size={18} className={styles.uploadIcon} />
            <span>This information was automatically extracted from your uploaded CV</span>
          </div>
        )}

        {educations.map((education, index) => (
          <div key={education.id} className={educationStyles.educationEntry}>
            <div className={educationStyles.entryHeader}>
              <h3 className={educationStyles.entryTitle}>Education #{index + 1}</h3>
              <button
                type="button"
                className={educationStyles.removeButton}
                onClick={() => handleRemoveEducation(education.id)}
                disabled={educations.length === 1}
              >
                <Trash size={16} />
              </button>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Degree*</label>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder="Bachelor of Science in Computer Science"
                  value={education.degree}
                  onChange={(e) => handleChange(education.id, "degree", e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Institution*</label>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder="University of Technology"
                  value={education.institution}
                  onChange={(e) => handleChange(education.id, "institution", e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Location</label>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder="Boston, MA"
                  value={education.location}
                  onChange={(e) => handleChange(education.id, "location", e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Field of Study</label>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder="Computer Science"
                  value={education.fieldOfStudy || ""}
                  onChange={(e) => handleChange(education.id, "fieldOfStudy", e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Start Date*</label>
                <input
                  type="month"
                  className={styles.formInput}
                  value={education.startDate}
                  onChange={(e) => handleChange(education.id, "startDate", e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>End Date</label>
                <div className={educationStyles.endDateContainer}>
                  <input
                    type="month"
                    className={styles.formInput}
                    value={education.endDate}
                    onChange={(e) => handleChange(education.id, "endDate", e.target.value)}
                    disabled={education.current}
                    required={!education.current}
                  />
                  <label className={educationStyles.currentStudyLabel}>
                    <input
                      type="checkbox"
                      className={educationStyles.currentStudyCheckbox}
                      checked={education.current}
                      onChange={(e) => handleCurrentStudyChange(education.id, e.target.checked)}
                    />
                    <span>Currently studying</span>
                  </label>
                </div>
              </div>
            </div>

            <div className={styles.formGroup} style={{ marginBottom: "1.5rem" }}>
              <label className={styles.formLabel}>Description (Optional)</label>
              <textarea
                className={styles.formTextarea}
                rows={4}
                placeholder="• Graduated with honors (GPA: 3.8/4.0)
• Specialized in Artificial Intelligence and Machine Learning
• Relevant coursework: Data Structures, Algorithms, Database Systems
• Senior project: Developed a machine learning model for predictive analytics"
                value={education.description}
                onChange={(e) => handleChange(education.id, "description", e.target.value)}
              ></textarea>
            </div>
          </div>
        ))}

        <button type="button" className={educationStyles.addEducationButton} onClick={handleAddEducation}>
          <Plus size={16} /> Add Another Education
        </button>

        <div className={styles.formActions}>
          <Link href="/cv-generation/create-cv/experience" className={styles.backButton}>
            <ArrowLeft size={16} className={styles.backIcon} /> Previous
          </Link>
          <button type="button" onClick={handleSubmit} className={styles.nextButton} disabled={isLoading}>
            {isLoading ? "Saving..." : "Next"}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
