"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
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
import { saveAdditionalInfo, getResumeData } from "@/app/actions/cv-actions"
import styles from "../create-cv.module.css"
import additionalStyles from "./additional.module.css"

// Component that safely uses useSearchParams
function AdditionalPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const source = searchParams.get("source") || ""

  const [languages, setLanguages] = useState([{ id: uuidv4(), language: "", proficiency: "intermediate" }])
  const [certifications, setCertifications] = useState([{ id: uuidv4(), name: "", issuer: "", date: "" }])
  const [projects, setProjects] = useState([{ id: uuidv4(), name: "", description: "", url: "" }])

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [isFromUpload, setIsFromUpload] = useState(false)

  useEffect(() => {
    async function loadResumeData() {
      try {
        const data = await getResumeData()

        if (data.languages && data.languages.length > 0) {
          const languagesWithIds = data.languages.map((lang) => ({
            ...lang,
            id: uuidv4(),
          }))
          setLanguages(languagesWithIds)
        }

        if (data.certifications && data.certifications.length > 0) {
          const certificationsWithIds = data.certifications.map((cert) => ({
            ...cert,
            id: uuidv4(),
          }))
          setCertifications(certificationsWithIds)
        }

        if (data.projects && data.projects.length > 0) {
          const projectsWithIds = data.projects.map((proj) => ({
            ...proj,
            id: uuidv4(),
          }))
          setProjects(projectsWithIds)
        }
        
        // Check if data is from uploaded CV
        setIsFromUpload(source === 'upload')

        setIsLoadingData(false)
      } catch (error) {
        console.error("Error loading resume data:", error)
        setIsLoadingData(false)
      }
    }

    loadResumeData()
  }, [source])

  const handleLanguageChange = (id, field, value) => {
    setLanguages((prev) => prev.map((lang) => (lang.id === id ? { ...lang, [field]: value } : lang)))
  }

  const handleAddLanguage = () => {
    setLanguages([...languages, { id: uuidv4(), language: "", proficiency: "intermediate" }])
  }

  const handleRemoveLanguage = (id) => {
    if (languages.length > 1) {
      setLanguages(languages.filter((lang) => lang.id !== id))
    }
  }

  const handleCertificationChange = (id, field, value) => {
    setCertifications((prev) => prev.map((cert) => (cert.id === id ? { ...cert, [field]: value } : cert)))
  }

  const handleAddCertification = () => {
    setCertifications([...certifications, { id: uuidv4(), name: "", issuer: "", date: "" }])
  }

  const handleRemoveCertification = (id) => {
    if (certifications.length > 1) {
      setCertifications(certifications.filter((cert) => cert.id !== id))
    }
  }

  const handleProjectChange = (id, field, value) => {
    setProjects((prev) => prev.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj)))
  }

  const handleAddProject = () => {
    setProjects([...projects, { id: uuidv4(), name: "", description: "", url: "" }])
  }

  const handleRemoveProject = (id) => {
    if (projects.length > 1) {
      setProjects(projects.filter((proj) => proj.id !== id))
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError("")

    try {
      const languagesToSave = languages.filter((l) => l.language.trim() !== "").map(({ id, ...rest }) => rest)
      const certificationsToSave = certifications
        .filter((c) => c.name.trim() !== "" && c.issuer.trim() !== "")
        .map(({ id, ...rest }) => rest)
      const projectsToSave = projects
        .filter((p) => p.name.trim() !== "" && p.description.trim() !== "")
        .map(({ id, ...rest }) => rest)

      const result = await saveAdditionalInfo({
        languages: languagesToSave,
        certifications: certificationsToSave,
        projects: projectsToSave,
      })

      if (result.success) {
        router.push(`/cv-generation/cv-templates?source=${source || "create"}`)
      } else {
        setError(result.error || "Failed to save additional information")
      }
    } catch (error) {
      console.error("Error saving additional information:", error)
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
          <div className={styles.progressFill} style={{ width: "100%" }}></div>
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
          <div className={styles.progressStep}>
            <div className={styles.stepIcon}><GraduationCap size={18} /></div><span>Education</span>
          </div>
          <div className={styles.progressStep}>
            <div className={styles.stepIcon}><Award size={18} /></div><span>Skills</span>
          </div>
          <div className={`${styles.progressStep} ${styles.activeStep}`}>
            <div className={styles.stepIcon}><Languages size={18} /></div><span>Additional</span>
          </div>
        </div>
      </div>

      <div className={styles.formSection}>
        <h2 className={styles.sectionTitle}>Additional Information</h2>
        <p className={styles.sectionDescription}>
          {isFromUpload 
            ? "We've extracted additional information from your uploaded CV. Feel free to review and edit as needed."
            : "Add languages, certifications, and projects to enhance your CV"
          }
        </p>

        {error && <div className={styles.errorMessage}>{error}</div>}
        
        {isFromUpload && (languages.some(l => l.language) || certifications.some(c => c.name) || projects.some(p => p.name)) && (
          <div className={styles.uploadNotice}>
            <FileText size={18} className={styles.uploadIcon} />
            <span>This information was automatically extracted from your uploaded CV</span>
          </div>
        )}

        <div className={additionalStyles.additionalSections}>
          {/* Languages Section */}
          <div className={additionalStyles.section}>
            <h3 className={additionalStyles.sectionTitle}>Languages</h3>
            {languages.map((lang, index) => (
              <div key={lang.id} className={additionalStyles.entryContainer}>
                <div className={additionalStyles.entryHeader}>
                  <h4 className={additionalStyles.entryTitle}>Language #{index + 1}</h4>
                  <button
                    type="button"
                    className={additionalStyles.removeButton}
                    onClick={() => handleRemoveLanguage(lang.id)}
                    disabled={languages.length === 1}
                  >
                    <Trash size={16} />
                  </button>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Language</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      placeholder="English"
                      value={lang.language}
                      onChange={(e) => handleLanguageChange(lang.id, "language", e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Proficiency</label>
                    <select
                      className={styles.formInput}
                      value={lang.proficiency}
                      onChange={(e) => handleLanguageChange(lang.id, "proficiency", e.target.value)}
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="fluent">Fluent</option>
                      <option value="native">Native</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}

            <button type="button" className={additionalStyles.addButton} onClick={handleAddLanguage}>
              <Plus size={16} /> Add Another Language
            </button>
          </div>

          {/* Certifications Section */}
          <div className={additionalStyles.section}>
            <h3 className={additionalStyles.sectionTitle}>Certifications</h3>
            {certifications.map((cert, index) => (
              <div key={cert.id} className={additionalStyles.entryContainer}>
                <div className={additionalStyles.entryHeader}>
                  <h4 className={additionalStyles.entryTitle}>Certification #{index + 1}</h4>
                  <button
                    type="button"
                    className={additionalStyles.removeButton}
                    onClick={() => handleRemoveCertification(cert.id)}
                    disabled={certifications.length === 1}
                  >
                    <Trash size={16} />
                  </button>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Certification Name</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      placeholder="AWS Certified Solutions Architect"
                      value={cert.name}
                      onChange={(e) => handleCertificationChange(cert.id, "name", e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Issuing Organization</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      placeholder="Amazon Web Services"
                      value={cert.issuer}
                      onChange={(e) => handleCertificationChange(cert.id, "issuer", e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Date</label>
                    <input
                      type="month"
                      className={styles.formInput}
                      value={cert.date}
                      onChange={(e) => handleCertificationChange(cert.id, "date", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}

            <button type="button" className={additionalStyles.addButton} onClick={handleAddCertification}>
              <Plus size={16} /> Add Another Certification
            </button>
          </div>

          {/* Projects Section */}
          <div className={additionalStyles.section}>
            <h3 className={additionalStyles.sectionTitle}>Projects</h3>
            {projects.map((project, index) => (
              <div key={project.id} className={additionalStyles.entryContainer}>
                <div className={additionalStyles.entryHeader}>
                  <h4 className={additionalStyles.entryTitle}>Project #{index + 1}</h4>
                  <button
                    type="button"
                    className={additionalStyles.removeButton}
                    onClick={() => handleRemoveProject(project.id)}
                    disabled={projects.length === 1}
                  >
                    <Trash size={16} />
                  </button>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Project Name</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      placeholder="E-commerce Website"
                      value={project.name}
                      onChange={(e) => handleProjectChange(project.id, "name", e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Project URL</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      placeholder="https://github.com/username/project"
                      value={project.url}
                      onChange={(e) => handleProjectChange(project.id, "url", e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Description</label>
                  <textarea
                    className={styles.formTextarea}
                    rows={3}
                    placeholder="Short description of the project, technologies used, and your role"
                    value={project.description}
                    onChange={(e) => handleProjectChange(project.id, "description", e.target.value)}
                  ></textarea>
                </div>
              </div>
            ))}

            <button type="button" className={additionalStyles.addButton} onClick={handleAddProject}>
              <Plus size={16} /> Add Another Project
            </button>
          </div>
        </div>

        <div className={styles.formActions}>
          <Link href="/cv-generation/create-cv/skills" className={styles.backButton}>
            <ArrowLeft size={16} /> Previous
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

// Loading fallback component
function AdditionalPageLoading() {
  return <div className={styles.loadingContainer}>Loading page...</div>;
}

// Main component with Suspense boundary
export default function AdditionalPage() {
  return (
    <Suspense fallback={<AdditionalPageLoading />}>
      <AdditionalPageContent />
    </Suspense>
  );
}
