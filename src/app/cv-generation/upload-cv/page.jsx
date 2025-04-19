"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Upload, FileText, Linkedin, ArrowRight, Loader2 } from "lucide-react"
import { parseUploadedCV, optimizeResumeForJob } from "@/app/actions/cv-actions"
import { extractTextFromFileAction } from "@/app/actions/file-parser-action"
import styles from "./upload-cv.module.css"

export default function UploadPage() {
  const router = useRouter()
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState("")
  const [uploading, setUploading] = useState(false)
  const [jobDescription, setJobDescription] = useState("")
  const [error, setError] = useState("")
  const [parsingStage, setParsingStage] = useState(null)
  const [successMessage, setSuccessMessage] = useState("")

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setFileName(selectedFile.name)
      setError("")
    }
  }

  const handleUploadAreaClick = () => {
    document.getElementById("file-input")?.click()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile) {
      setFile(droppedFile)
      setFileName(droppedFile.name)
      setError("")
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!file) {
      setError("Please upload a CV file")
      return
    }

    try {
      setUploading(true)
      setParsingStage("extracting")

      // Convert file to ArrayBuffer for the server action
      const fileBuffer = await file.arrayBuffer()
      const fileType = file.type
      
      // Extract text from the uploaded file using the server action
      const extractedText = await extractTextFromFileAction(fileBuffer, fileType)
      
      setParsingStage("parsing")
      // Parse the CV using Gemini AI
      const result = await parseUploadedCV(extractedText)

      if (result.success) {
        setParsingStage("optimizing")
        // If job description is provided, optimize the CV for that job
        if (jobDescription.trim()) {
          await optimizeResumeForJob(jobDescription)
        }
        
        // Add success message and delay redirect for better UX
        setSuccessMessage(result.message || "Your CV has been successfully processed. All information has been extracted.")
        setTimeout(() => {
          router.push("/cv-generation/create-cv?source=upload")
        }, 2000)
      } else {
        setError(result.error || "Failed to process CV")
        setParsingStage(null)
      }
    } catch (err) {
      console.error("Error processing CV:", err)
      setError("Failed to process CV. Please try again.")
      setParsingStage(null)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Upload Your Existing CV</h1>
        <p className={styles.subtitle}>
          Upload your current resume and our AI will enhance it to make it more effective
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.uploadContainer}>
          <div
            className={styles.uploadArea}
            onClick={handleUploadAreaClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className={styles.uploadIcon}>
              <Upload size={48} color="#4F6AF6" />
            </div>
            {uploading ? (
              <div className={styles.uploadingContainer}>
                <Loader2 className="animate-spin" size={24} />
                <p className={styles.uploadingText}>
                  {parsingStage === "extracting" && "Extracting text from your CV..."}
                  {parsingStage === "parsing" && "Parsing your CV and extracting information..."}
                  {parsingStage === "optimizing" && "Optimizing your CV for the job description..."}
                </p>
                
                <div className={styles.processingSteps}>
                  <div className={styles.processingStep}>
                    <div className={`${styles.stepIcon} ${parsingStage === "extracting" ? styles.active : (parsingStage === "parsing" || parsingStage === "optimizing") ? styles.completed : ""}`}>
                      1
                    </div>
                    <span className={styles.stepText}>Extract</span>
                  </div>
                  <div className={styles.processingStep}>
                    <div className={`${styles.stepIcon} ${parsingStage === "parsing" ? styles.active : parsingStage === "optimizing" ? styles.completed : ""}`}>
                      2
                    </div>
                    <span className={styles.stepText}>Parse</span>
                  </div>
                  <div className={styles.processingStep}>
                    <div className={`${styles.stepIcon} ${parsingStage === "optimizing" ? styles.active : ""}`}>
                      3
                    </div>
                    <span className={styles.stepText}>Optimize</span>
                  </div>
                </div>
              </div>
            ) : fileName ? (
              <div className={styles.uploadedContainer}>
                <FileText size={24} />
                <p className={styles.uploadedText}>Uploaded: {fileName}</p>
              </div>
            ) : (
              <>
                <h3 className={styles.uploadTitle}>Drag & Drop your file here</h3>
                <p className={styles.uploadDescription}>
                  or <span className={styles.browseText}>browse files</span> on your computer
                </p>
                <p className={styles.fileFormats}>Supported formats: PDF, DOCX, TXT (Max 50MB)</p>
              </>
            )}
            {error && <p className={styles.errorText}>{error}</p>}
            {successMessage && <p className={styles.successText}>{successMessage}</p>}
          </div>

          <div className={styles.divider}>
            <span className={styles.dividerText}>OR</span>
          </div>

          <div className={styles.alternativeOptions}>
            <Link href="/cv-generation/linkedin-import" className={styles.linkedinButton}>
              <Linkedin size={20} />
              Import from LinkedIn
            </Link>

            <div className={styles.jobDescriptionArea}>
              <h3 className={styles.jobDescriptionTitle}>
                <FileText size={20} />
                Paste Job Description (Optional)
              </h3>
              <p className={styles.jobDescriptionText}>
                Paste the job description you're applying for and let our AI optimize your CV
              </p>
              <textarea
                className={styles.jobDescriptionInput}
                placeholder="Paste your job description here..."
                rows={5}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <Link href="/cv-generation" className={styles.backButton}>
            Back
          </Link>
          <button type="submit" className={styles.continueButton} disabled={uploading || !file}>
            {uploading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={16} />
                Processing
              </>
            ) : (
              <>
                Continue
                <ArrowRight size={18} className="ml-2" />
              </>
            )}
          </button>
        </div>
      </form>

      <input
        id="file-input"
        type="file"
        accept=".pdf,.docx,.txt"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  )
}
