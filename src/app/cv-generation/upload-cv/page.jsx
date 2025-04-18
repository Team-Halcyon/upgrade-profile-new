"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { jwtDecode } from "jwt-decode"
import { Upload, FileText, Linkedin, ArrowRight } from "lucide-react"
import axios from "axios"  // Axios for making HTTP requests
import styles from "./upload-cv.module.css"

export default function UploadPage() {
  const fileInputRef = useRef(null)  // Create a reference to the file input
  const [uploading, setUploading] = useState(false)  // To show loading state while uploading


  // Trigger the file input click when the user clicks on the upload area
  const handleUploadAreaClick = () => {
    fileInputRef.current.click()  // Trigger the click on the hidden file input
  }
  const getEmailFromToken = () => {
    const token = localStorage.getItem("token")
if (token) {
  const decoded = jwtDecode(token)
  const userEmail = decoded.email
  console.log(userEmail)
}

  }
  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      const userEmail = getEmailFromToken()
      if (!userEmail) {
        alert("User not authenticated. Please sign in again.")
        return
      }

      const formData = new FormData()
      formData.append("cv", file)
      formData.append("email", userEmail)

      setUploading(true)
      try {
        const response = await axios.post("http://localhost:4000/api/user/uploadCV", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        console.log("Upload success:", response.data)
        alert("File uploaded successfully")
      } catch (error) {
        console.error("Upload error:", error)
        alert("File upload failed, please try again")
      } finally {
        setUploading(false)
      }
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

      <div className={styles.uploadContainer}>
        <div
          className={styles.uploadArea}
          onClick={handleUploadAreaClick}  // Trigger the file input click on area click
        >
          <div className={styles.uploadIcon}>
            <Upload size={48} color="#4F6AF6" />
          </div>
          <h3 className={styles.uploadTitle}>Drag & Drop your file here</h3>
          <p className={styles.uploadDescription}>
            or <span className={styles.browseText}>browse files</span> on your computer
          </p>
          <p className={styles.fileFormats}>Supported formats: PDF, DOCX, TXT (Max 50MB)</p>
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
              Paste Job Description
            </h3>
            <p className={styles.jobDescriptionText}>
              Paste the job description you're applying for and let our AI optimize your CV
            </p>
            <textarea
              className={styles.jobDescriptionInput}
              placeholder="Paste your job description here..."
              rows={5}
            />
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <Link href="/cv-generation" className={styles.backButton}>
          Back
        </Link>
        <Link href="/cv-generation/create-cv?source=upload" className={styles.continueButton}>
          Continue
          <ArrowRight size={18} />
        </Link>
      </div>
      
      {/* Hidden file input for file selection */}
      <input
        type="file"
        ref={fileInputRef}  // Set the reference to the input
        style={{ display: "none" }}  // Hide the input
        accept=".pdf,.docx,.txt"  // Accept only PDF, DOCX, and TXT files
        onChange={handleFileChange}  // Handle file selection
      />
    </div>
  )
}
