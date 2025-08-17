"use client"
import { useState } from "react"
import JobList from "./JobList"
import styles from "./JobMatching.module.css"

export default function JobMatching() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchPhrases, setSearchPhrases] = useState([])

  const handleFileUpload = async (file) => {
    setLoading(true)
    setError(null)
    setJobs([])

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('http://upgrade-profile-new-production.up.railway.app/match-jobs', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setJobs(data.jobs || [])
        setSearchPhrases(data.search_phrases || [])
      } else {
        setError(data.message || 'Failed to process CV')
      }
    } catch (err) {
      setError('Network error: Please check if the backend server is running')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Job Matching</h1>
        <p className={styles.subtitle}>Upload your CV to find matching remote jobs</p>
      </div>

      <div className={styles.uploadSection}>
        <div className={styles.uploadArea}>
          <div className={styles.uploadIcon}>📄</div>
          <h3>Upload Your CV</h3>
          <p>Upload your CV in PDF format to get personalized job matches</p>

          <label className={styles.uploadButton}>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => {
                const file = e.target.files[0]
                if (file) {
                  handleFileUpload(file)
                }
              }}
              className={styles.fileInput}
            />
            Choose PDF File
          </label>
        </div>
      </div>

      {searchPhrases.length > 0 && (
        <div className={styles.searchPhrases}>
          <h3>Extracted Keywords from Your CV:</h3>
          <div className={styles.phrases}>
            {searchPhrases.map((phrase, index) => (
              <span key={index} className={styles.phrase}>
                {phrase}
              </span>
            ))}
          </div>
        </div>
      )}

      <JobList jobs={jobs} loading={loading} error={error} />
    </div>
  )
}