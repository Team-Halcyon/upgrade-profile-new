import Link from "next/link"
import styles from "../create-cv.module.css"
import educationStyles from "./education.module.css"
import { User, FileText, Briefcase, GraduationCap, Award, Languages, ArrowRight ,ArrowLeft} from "lucide-react"

export default function EducationPage() {
  return (
    <div className={styles.container}>
      
      
      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: "66.4%" }}></div>
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
          <div className={styles.progressStep}>
            <div className={styles.stepIcon}>
              <Briefcase size={18} />
            </div>
            <span>Experience</span>
          </div>
          <div className={`${styles.progressStep} ${styles.activeStep}`}>
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
        <h2 className={styles.sectionTitle}>Education</h2>
        <p className={styles.sectionDescription}>Add your educational background, degrees, and certifications</p>

        <div className={educationStyles.educationEntry}>
          <div className={educationStyles.entryHeader}>
            <h3 className={educationStyles.entryTitle}>Education #1</h3>
            <button className={educationStyles.removeButton}>
              <i className="fas fa-trash"></i>
            </button>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Degree*</label>
              <input
                type="text"
                className={styles.formInput}
                placeholder="Bachelor of Science in Computer Science"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Institution*</label>
              <input type="text" className={styles.formInput} placeholder="University of Technology" required />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Location</label>
              <input type="text" className={styles.formInput} placeholder="Boston, MA" />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Field of Study</label>
              <input type="text" className={styles.formInput} placeholder="Computer Science" />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Start Date*</label>
              <input type="month" className={styles.formInput} required />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>End Date</label>
              <div className={educationStyles.endDateContainer}>
                <input type="month" className={styles.formInput} />
                <label className={educationStyles.currentStudyLabel}>
                  <input type="checkbox" className={educationStyles.currentStudyCheckbox} />
                  <span>Currently studying</span>
                </label>
              </div>
            </div>
          </div>

          <div className={styles.formGroup} style={{ marginBottom: "1.5rem" }}>
            <label className={styles.formLabel}>Description (Optional)</label>
            <textarea
              className={styles.formTextarea}
              rows="4"
              placeholder="• Graduated with honors (GPA: 3.8/4.0)
• Specialized in Artificial Intelligence and Machine Learning
• Relevant coursework: Data Structures, Algorithms, Database Systems
• Senior project: Developed a machine learning model for predictive analytics"
            ></textarea>
          </div>
        </div>

        <button className={educationStyles.addEducationButton}>
          <i className="fas fa-plus"></i> Add Another Education
        </button>

        <div className={styles.formActions}>
          <Link href="/cv-generation/create-cv/experience" className={styles.backButton}>
          <ArrowLeft size={16} className={styles.backIcon} /> Previous
          </Link>
          <Link href="/cv-generation/create-cv/skills" className={styles.nextButton}>
            Next <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}

