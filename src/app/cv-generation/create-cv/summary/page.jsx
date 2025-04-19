"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  Languages,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Loader2,
} from "lucide-react"
import { saveSummary, getResumeData, enhanceSummaryWithAI } from "@/app/actions/cv-actions"
import styles from "../create-cv.module.css"
import summaryStyles from "./summary.module.css"

export default function SummaryPage() {
  const router = useRouter()
  const [summary, setSummary] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isEnhancing, setIsEnhancing] = useState(false)
  const [error, setError] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [isFromUpload, setIsFromUpload] = useState(false)

  useEffect(() => {
    async function loadResumeData() {
      try {
        const data = await getResumeData()
        
        // Handle data from uploaded CV
        if (data.summary) {
          setSummary(data.summary)
        }
        
        if (data.personalInfo?.jobTitle) {
          setJobTitle(data.personalInfo.jobTitle)
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await saveSummary(summary)

      if (result.success) {
        router.push("/cv-generation/create-cv/experience")
      } else {
        setError(result.error || "Failed to save summary")
      }
    } catch (error) {
      console.error("Error saving summary:", error)
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEnhanceWithAI = async () => {
    if (!jobTitle) {
      setError("Please provide a job title in the personal information section first")
      return
    }

    setIsEnhancing(true)
    setError("")

    try {
      const result = await enhanceSummaryWithAI(jobTitle, summary)

      if (result.success && result.summary) {
        setSummary(result.summary)
      } else {
        setError(result.error || "Failed to enhance summary")
      }
    } catch (error) {
      console.error("Error enhancing summary:", error)
      setError("Failed to enhance summary with AI")
    } finally {
      setIsEnhancing(false)
    }
  }

  if (isLoadingData) {
    return <div className={styles.loadingContainer}>Loading...</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: "33.2%" }}></div>
        </div>
        <div className={styles.progressSteps}>
          <div className={styles.progressStep}>
            <div className={styles.stepIcon}>
              <User size={18} />
            </div>
            <span>Personal</span>
          </div>
          <div className={`${styles.progressStep} ${styles.activeStep}`}>
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
        <h2 className={styles.sectionTitle}>Professional Summary</h2>
        <p className={styles.sectionDescription}>
          {isFromUpload 
            ? "We've extracted this summary from your uploaded CV. Feel free to review and edit it as needed."
            : "Add a compelling professional summary that highlights your expertise and career goals"
          }
        </p>

        {error && <div className={styles.errorMessage}>{error}</div>}
        
        {isFromUpload && (
          <div className={styles.uploadNotice}>
            <FileText size={18} className={styles.uploadIcon} />
            <span>This content was automatically extracted from your uploaded CV</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup} style={{ marginBottom: "2rem" }}>
            <label className={styles.formLabel}>Professional Summary*</label>
            <textarea
              className={styles.formTextarea}
              rows={6}
              placeholder="Experienced software engineer with 8+ years of expertise in developing scalable web applications using modern technologies. Proven track record of leading teams and delivering high-quality solutions that meet business objectives."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
            ></textarea>
          </div>

          <div className={styles.aiAssistant}>
            <div className={styles.aiMessage}>
              <strong>AI Assistant:</strong> I can generate a tailored professional summary based on your job title.
            </div>
            <button type="button" className={styles.aiButton} onClick={handleEnhanceWithAI} disabled={isEnhancing}>
              {isEnhancing ? (
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
          </div>

          <div className={summaryStyles.summaryTips}>
            <h3 className={summaryStyles.tipsTitle}>Tips for a Great Summary</h3>
            <ul className={summaryStyles.tipsList}>
              <li>Keep it concise (3-5 sentences)</li>
              <li>Highlight your most relevant skills and achievements</li>
              <li>Tailor it to the job you're applying for</li>
              <li>Include years of experience and key specializations</li>
              <li>Avoid generic statements and focus on what makes you unique</li>
            </ul>
          </div>

          <div className={styles.formActions}>
            <Link href="/cv-generation/create-cv" className={styles.backButton}>
              <ArrowLeft size={18} className={styles.backIcon} /> Previous
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
