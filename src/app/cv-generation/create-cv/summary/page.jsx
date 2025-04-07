import Link from "next/link"
import styles from "../create-cv.module.css"
import summaryStyles from "./summary.module.css"
import { User, FileText, Briefcase, GraduationCap, Award, Languages, ArrowRight, ArrowLeft } from "lucide-react"

export default function SummaryPage() {
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
          Add a compelling professional summary that highlights your expertise and career goals
        </p>

        <div className={styles.formGroup} style={{ marginBottom: "2rem" }}>
          <label className={styles.formLabel}>Professional Summary*</label>
          <textarea
            className={styles.formTextarea}
            rows="6"
            placeholder="Experienced software engineer with 8+ years of expertise in developing scalable web applications using modern technologies. Proven track record of leading teams and delivering high-quality solutions that meet business objectives."
            required
          ></textarea>
        </div>

        <div className={styles.aiAssistant}>
          <div className={styles.aiMessage}>
            <strong>AI Assistant:</strong> I've analyzed your job title and can suggest a tailored professional summary.
          </div>
          <button className={styles.aiButton}>Generate Summary</button>
        </div>

        <div className={summaryStyles.summaryTips}>
          <h3 className={summaryStyles.tipsTitle}>Tips for a Great Summary</h3>
          <ul className={summaryStyles.tipsList}>
            <li>Keep it concise </li>
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
          <Link href="/cv-generation/create-cv/experience" className={styles.nextButton}>
            Next <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}

