"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  Languages,
  ArrowRight,
  ArrowLeft,
  X,
  Plus,
  Sparkles,
} from "lucide-react"
import { saveSkills, getResumeData } from "@/app/actions/cv-actions"
import styles from "../create-cv.module.css"
import skillsStyles from "./skills.module.css"

export default function SkillsPage() {
  const router = useRouter()
  const [technicalSkills, setTechnicalSkills] = useState([])
  const [softSkills, setSoftSkills] = useState([])
  const [newTechnicalSkill, setNewTechnicalSkill] = useState("")
  const [newSoftSkill, setNewSoftSkill] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [isFromUpload, setIsFromUpload] = useState(false)

  const [aiSuggestions, setAiSuggestions] = useState([
    "Docker",
    "Kubernetes",
    "AWS",
    "CI/CD",
    "Agile Methodologies",
  ])

  useEffect(() => {
    async function loadResumeData() {
      try {
        const data = await getResumeData()
        if (data.skills && data.skills.length > 0) {
          const technical = []
          const soft = []

          data.skills.forEach((skill) => {
            if (typeof skill === "string") {
              if (skill.startsWith("soft:")) {
                soft.push(skill.substring(5))
              } else {
                technical.push(skill)
              }
            }
          })

          setTechnicalSkills(technical)
          setSoftSkills(soft)
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

  const handleAddTechnicalSkill = () => {
    if (newTechnicalSkill.trim() !== "") {
      setTechnicalSkills([...technicalSkills, newTechnicalSkill.trim()])
      setNewTechnicalSkill("")
    }
  }

  const handleAddSoftSkill = () => {
    if (newSoftSkill.trim() !== "") {
      setSoftSkills([...softSkills, newSoftSkill.trim()])
      setNewSoftSkill("")
    }
  }

  const handleRemoveTechnicalSkill = (index) => {
    setTechnicalSkills(technicalSkills.filter((_, i) => i !== index))
  }

  const handleRemoveSoftSkill = (index) => {
    setSoftSkills(softSkills.filter((_, i) => i !== index))
  }

  const handleAddSuggestion = (suggestion) => {
    if (!technicalSkills.includes(suggestion)) {
      setTechnicalSkills([...technicalSkills, suggestion])
      setAiSuggestions(aiSuggestions.filter((s) => s !== suggestion))
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError("")

    if (technicalSkills.length === 0 && softSkills.length === 0) {
      setError("Please add at least one skill")
      setIsLoading(false)
      return
    }

    try {
      const allSkills = [...technicalSkills, ...softSkills.map((skill) => `soft:${skill}`)]

      const result = await saveSkills(allSkills)

      if (result.success) {
        router.push("/cv-generation/create-cv/additional")
      } else {
        setError(result.error || "Failed to save skills")
      }
    } catch (error) {
      console.error("Error saving skills:", error)
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
          <div className={styles.progressFill} style={{ width: "83%" }}></div>
        </div>
        <div className={styles.progressSteps}>
          <div className={styles.progressStep}><div className={styles.stepIcon}><User size={18} /></div><span>Personal</span></div>
          <div className={styles.progressStep}><div className={styles.stepIcon}><FileText size={18} /></div><span>Summary</span></div>
          <div className={styles.progressStep}><div className={styles.stepIcon}><Briefcase size={18} /></div><span>Experience</span></div>
          <div className={styles.progressStep}><div className={styles.stepIcon}><GraduationCap size={18} /></div><span>Education</span></div>
          <div className={`${styles.progressStep} ${styles.activeStep}`}><div className={styles.stepIcon}><Award size={18} /></div><span>Skills</span></div>
          <div className={styles.progressStep}><div className={styles.stepIcon}><Languages size={18} /></div><span>Additional</span></div>
        </div>
      </div>

      <div className={styles.formSection}>
        <h2 className={styles.sectionTitle}>Skills</h2>
        <p className={styles.sectionDescription}>
          {isFromUpload 
            ? "We've extracted your skills from your uploaded CV. Feel free to add more skills or remove any as needed."
            : "Add your technical and professional skills with proficiency levels"
          }
        </p>

        {error && <div className={styles.errorMessage}>{error}</div>}
        
        {isFromUpload && (technicalSkills.length > 0 || softSkills.length > 0) && (
          <div className={styles.uploadNotice}>
            <FileText size={18} className={styles.uploadIcon} />
            <span>These skills were automatically extracted from your uploaded CV</span>
          </div>
        )}

        <div className={skillsStyles.skillsContainer}>
          <div className={skillsStyles.skillsSection}>
            <h3 className={skillsStyles.skillsSectionTitle}>Technical Skills</h3>
            <div className={skillsStyles.skillsInputContainer}>
              <input
                type="text"
                className={skillsStyles.skillsInput}
                placeholder="Add a skill (e.g., JavaScript, Python, React)"
                value={newTechnicalSkill}
                onChange={(e) => setNewTechnicalSkill(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddTechnicalSkill()
                  }
                }}
              />
              <button type="button" className={skillsStyles.addSkillButton} onClick={handleAddTechnicalSkill}>
                <Plus size={16} />
              </button>
            </div>

            <div className={skillsStyles.skillTags}>
              {technicalSkills.map((skill, index) => (
                <div key={index} className={skillsStyles.skillTag}>
                  {skill}
                  <button
                    type="button"
                    className={skillsStyles.removeSkillButton}
                    onClick={() => handleRemoveTechnicalSkill(index)}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className={skillsStyles.skillsSection}>
            <h3 className={skillsStyles.skillsSectionTitle}>Soft Skills</h3>
            <div className={skillsStyles.skillsInputContainer}>
              <input
                type="text"
                className={skillsStyles.skillsInput}
                placeholder="Add a skill (e.g., Leadership, Communication)"
                value={newSoftSkill}
                onChange={(e) => setNewSoftSkill(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddSoftSkill()
                  }
                }}
              />
              <button type="button" className={skillsStyles.addSkillButton} onClick={handleAddSoftSkill}>
                <Plus size={16} />
              </button>
            </div>

            <div className={skillsStyles.skillTags}>
              {softSkills.map((skill, index) => (
                <div key={index} className={skillsStyles.skillTag}>
                  {skill}
                  <button
                    type="button"
                    className={skillsStyles.removeSkillButton}
                    onClick={() => handleRemoveSoftSkill(index)}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className={skillsStyles.aiSuggestion}>
            <div className={skillsStyles.aiSuggestionHeader}>
              <h3 className={skillsStyles.aiSuggestionTitle}>
                <Sparkles size={18} className="mr-2" />
                AI Skill Suggestions
              </h3>
              <p className={skillsStyles.aiSuggestionSubtitle}>
                Based on your job title and experience, we recommend these skills:
              </p>
            </div>
            <div className={skillsStyles.aiSuggestionTags}>
              {aiSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  className={skillsStyles.aiSuggestionTag}
                  onClick={() => handleAddSuggestion(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.formActions}>
          <Link href="/cv-generation/create-cv/education" className={styles.backButton}>
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
