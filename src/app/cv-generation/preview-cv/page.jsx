"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Download,
  Share2,
  Edit,
  ArrowLeft,
  CheckCircle,
  Mail,
  Linkedin,
  Twitter,
  Loader2,
} from "lucide-react"
import { getResumeData, optimizeResumeForJob } from "@/app/actions/cv-actions"
import TemplateFactory from "@/components/resume-templates/template-factory"
import styles from "./preview-cv.module.css"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"

// Component that uses useSearchParams
function PreviewContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const template = searchParams.get("template") || "classic"
  const source = searchParams.get("source") || "create"

  const [resumeData, setResumeData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [error, setError] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizationMessage, setOptimizationMessage] = useState("")

  useEffect(() => {
    async function loadResumeData() {
      try {
        const data = await getResumeData()
        setResumeData(data)
        setIsLoading(false)
      } catch (error) {
        console.error("Error loading resume data:", error)
        setError("Failed to load resume data")
        setIsLoading(false)
      }
    }

    loadResumeData()
  }, [])

  const handleDownloadPDF = async () => {
    const resumeElement = document.getElementById("resume-preview")
    if (!resumeElement) return

    setIsGeneratingPDF(true)

    try {
      const canvas = await html2canvas(resumeElement, {
        scale: 2,
        useCORS: true,
        logging: false,
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const imgWidth = 210 // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
      pdf.save(`${resumeData?.personalInfo.fullName || "Resume"}.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
      setError("Failed to generate PDF")
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const handleOptimizeForJob = async () => {
    if (!jobDescription.trim()) return;
    
    setIsOptimizing(true);
    setOptimizationMessage("");
    setError("");

    try {
      // Call our server action to optimize the resume
      const result = await optimizeResumeForJob(jobDescription);
      
      if (result.success) {
        // Refresh the resume data after optimization
        const updatedData = await getResumeData();
        setResumeData(updatedData);
        setOptimizationMessage(result.message || "Your CV has been optimized for the job description provided.");
      } else {
        setError(result.error || "Failed to optimize CV for the job description.");
      }
    } catch (error) {
      console.error("Error optimizing CV:", error);
      setError("Failed to optimize CV for the job description.");
    } finally {
      setIsOptimizing(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader2 className="animate-spin" size={48} />
        <p>Loading your CV...</p>
      </div>
    )
  }

  if (!resumeData) {
    return (
      <div className={styles.errorContainer}>
        <p>Failed to load resume data. Please try again.</p>
        <Link href="/cv-generation" className={styles.backButton}>
          Back to CV Generation
        </Link>
      </div>
    )
  }

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
          <button className={styles.actionButton} onClick={handleDownloadPDF} disabled={isGeneratingPDF}>
            {isGeneratingPDF ? (
              <>
                <Loader2 className="animate-spin mr-2" size={16} />
                Generating...
              </>
            ) : (
              <>
                <Download size={18} />
                Download PDF
              </>
            )}
          </button>
          <button className={styles.actionButton}>
            <Share2 size={18} />
            Share
          </button>
          <Link href="/cv-generation/create-cv" className={styles.editButton}>
            <Edit size={18} />
            Edit
          </Link>
        </div>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <div className={styles.previewContainer}>
        <div className={styles.previewDocument}>
          <div id="resume-preview" className={styles.resumePreview}>
            <TemplateFactory templateId={template} data={resumeData} />
          </div>
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
                <p className={styles.itemDescription}>Your CV is optimized for applicant tracking systems</p>
              </div>
            </div>

            <div className={styles.optimizationItem}>
              <CheckCircle size={18} className={styles.checkIcon} />
              <div>
                <h4 className={styles.itemTitle}>Keyword Optimization</h4>
                <p className={styles.itemDescription}>Contains relevant keywords for your target role</p>
              </div>
            </div>

            <div className={styles.optimizationItem}>
              <CheckCircle size={18} className={styles.checkIcon} />
              <div>
                <h4 className={styles.itemTitle}>Professional Formatting</h4>
                <p className={styles.itemDescription}>Clean, professional layout with proper spacing</p>
              </div>
            </div>

            <div className={styles.optimizationItem}>
              <CheckCircle size={18} className={styles.checkIcon} />
              <div>
                <h4 className={styles.itemTitle}>Quantifiable Achievements</h4>
                <p className={styles.itemDescription}>Includes measurable results and achievements</p>
              </div>
            </div>
          </div>

          <div className={styles.optimizationCard}>
            <h3 className={styles.optimizationTitle}>Job Description Optimization</h3>
            <p className={styles.optimizationDescription}>
              Enter a job description to optimize your CV for a specific position:
            </p>
            
            <textarea
              className={styles.jobDescriptionInput}
              placeholder="Paste job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={5}
            ></textarea>
            
            <button 
              className={styles.optimizeButton}
              onClick={handleOptimizeForJob}
              disabled={isOptimizing || !jobDescription.trim()}
            >
              {isOptimizing ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={16} />
                  Optimizing...
                </>
              ) : (
                "Optimize for This Job"
              )}
            </button>
            
            {optimizationMessage && (
              <div className={styles.optimizationMessage}>
                {optimizationMessage}
              </div>
            )}
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
        <Link href={`/cv-generation/cv-templates?source=${source}`} className={styles.backButton}>
          <ArrowLeft size={18} />
          Back to Templates
        </Link>
      </div>
    </div>
  )
}

// Main component with Suspense boundary
export default function PreviewPage() {
  return (
    <Suspense fallback={<div className={styles.loadingContainer}><Loader2 className="animate-spin" size={48} /><p>Loading your CV...</p></div>}>
      <PreviewContent />
    </Suspense>
  )
}
