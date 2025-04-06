"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import styles from "../create-cv.module.css"
import experienceStyles from "./experience.module.css"
import { User, FileText, Briefcase, GraduationCap, Award, Languages, ArrowRight,ArrowLeft } from "lucide-react"

export default function ExperiencePage() {
  const searchParams = useSearchParams();
  const source = searchParams.get('source');
  const isFromUpload = source === 'upload';

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {isFromUpload ? "Review Your CV Information" : "Create Your CV"}
        </h1>
        <p className={styles.subtitle}>
          {isFromUpload 
            ? "We've extracted information from your uploaded CV. Please review and make any necessary changes."
            : "Let's build your professional CV step by step with our AI-powered assistant"}
        </p>
      </div>
      
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
        <p className={styles.sectionDescription}>Add your work experience, starting with your most recent position</p>

        <div className={experienceStyles.experienceEntry}>
          <div className={experienceStyles.entryHeader}>
            <h3 className={experienceStyles.entryTitle}>Experience #1</h3>
            <button className={experienceStyles.removeButton}>
              <i className="fas fa-trash"></i>
            </button>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Job Title*</label>
              <input type="text" className={styles.formInput} placeholder="Senior Software Engineer" required />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Company*</label>
              <input type="text" className={styles.formInput} placeholder="Tech Solutions Inc." required />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Location</label>
              <input type="text" className={styles.formInput} placeholder="New York, NY" />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Employment Type</label>
              <select className={styles.formInput}>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="freelance">Freelance</option>
                <option value="internship">Internship</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Start Date*</label>
              <input type="month" className={styles.formInput} required />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>End Date</label>
              <div className={experienceStyles.endDateContainer}>
                <input type="month" className={styles.formInput} />
                <label className={experienceStyles.currentJobLabel}>
                  <input type="checkbox" className={experienceStyles.currentJobCheckbox} />
                  <span>Current job</span>
                </label>
              </div>
            </div>
          </div>

          <div className={styles.formGroup} style={{ marginBottom: "1.5rem" }}>
            <label className={styles.formLabel}>Job Description*</label>
            <textarea
              className={styles.formTextarea}
              rows="5"
              placeholder="• Led a team of 5 developers to build a scalable e-commerce platform
• Reduced page load time by 40% through performance optimization
• Implemented CI/CD pipeline that reduced deployment time by 60%
• Collaborated with product and design teams to deliver features on time"
              required
            ></textarea>
          </div>

          <div className={experienceStyles.aiSuggestion}>
            <button className={experienceStyles.aiSuggestionButton}>
              <i className="fas fa-magic"></i> Enhance with AI
            </button>
            <span className={experienceStyles.aiSuggestionText}>
              Add quantifiable achievements and optimize wording
            </span>
          </div>
        </div>

        <button className={experienceStyles.addExperienceButton}>
          <i className="fas fa-plus"></i> Add Another Experience
        </button>

        <div className={styles.formActions}>
          <Link href="/cv-generation/create-cv/summary" className={styles.backButton}>
          <ArrowLeft size={16} className={styles.backIcon} /> Previous
          </Link>
          <Link href="/cv-generation/create-cv/education" className={styles.nextButton}>
            Next <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}

