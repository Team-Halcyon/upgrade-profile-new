"use client"

import Image from "next/image"
import {
  Save,
  Download,
  Share2,
  ArrowLeft,
  ArrowRight,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  Languages,
  User,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"
import styles from "./edit-cv.module.css"

export default function EditorPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>CV Editor</h1>
          <p className={styles.subtitle}>Customize your professional resume</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.actionButton}>
            <Save size={18} />
            Save
          </button>
          <button className={styles.actionButton}>
            <Download size={18} />
            Download
          </button>
          <button className={styles.actionButton}>
            <Share2 size={18} />
            Share
          </button>
        </div>
      </div>

      <div className={styles.editorContainer}>
        <div className={styles.sidebar}>
          <div className={styles.sectionNav}>
            <button className={`${styles.sectionButton} ${styles.activeSection}`}>
              <User size={18} />
              Personal Info
            </button>
            <button className={styles.sectionButton}>
              <FileText size={18} />
              Professional Summary
            </button>
            <button className={styles.sectionButton}>
              <Briefcase size={18} />
              Work Experience
            </button>
            <button className={styles.sectionButton}>
              <GraduationCap size={18} />
              Education
            </button>
            <button className={styles.sectionButton}>
              <Award size={18} />
              Skills
            </button>
            <button className={styles.sectionButton}>
              <Languages size={18} />
              Languages
            </button>
          </div>

          <div className={styles.aiSuggestions}>
            <h3 className={styles.suggestionsTitle}>AI Suggestions</h3>
            <div className={styles.suggestionCard}>
              <p className={styles.suggestionText}>
                Add more quantifiable achievements to your work experience to stand out.
              </p>
              <button className={styles.applyButton}>Apply</button>
            </div>
            <div className={styles.suggestionCard}>
              <p className={styles.suggestionText}>
                Your skills section could be enhanced with more technical skills relevant to the job.
              </p>
              <button className={styles.applyButton}>Apply</button>
            </div>
          </div>
        </div>

        <div className={styles.formSection}>
          <h2 className={styles.formTitle}>Personal Information</h2>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Full Name</label>
              <input type="text" className={styles.formInput} placeholder="John Doe" />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Job Title</label>
              <input type="text" className={styles.formInput} placeholder="Senior Software Engineer" />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Email</label>
              <div className={styles.inputWithIcon}>
                <Mail size={18} className={styles.inputIcon} />
                <input type="email" className={styles.formInput} placeholder="johndoe@example.com" />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Phone</label>
              <div className={styles.inputWithIcon}>
                <Phone size={18} className={styles.inputIcon} />
                <input type="tel" className={styles.formInput} placeholder="+1 (555) 123-4567" />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Location</label>
              <div className={styles.inputWithIcon}>
                <MapPin size={18} className={styles.inputIcon} />
                <input type="text" className={styles.formInput} placeholder="New York, NY" />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>LinkedIn</label>
              <input type="text" className={styles.formInput} placeholder="linkedin.com/in/johndoe" />
            </div>
          </div>

          <div className={styles.formActions}>
            <button className={styles.formButton}>
              <ArrowLeft size={18} />
              Previous
            </button>
            <button className={`${styles.formButton} ${styles.primaryButton}`}>
              Next
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className={styles.previewSection}>
          <h3 className={styles.previewTitle}>Live Preview</h3>
          <div className={styles.previewContainer}>
            <div className={styles.resumePreview}>
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="Resume Preview"
                width={600}
                height={800}
                className={styles.previewImage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
