"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import styles from "../create-cv.module.css"
import skillsStyles from "./skills.module.css"
import { User, FileText, Briefcase, GraduationCap, Award, Languages, ArrowRight ,ArrowLeft} from "lucide-react"

export default function SkillsPage() {
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
          <div className={styles.progressFill} style={{ width: "83%" }}></div>
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
          <div className={styles.progressStep}>
            <div className={styles.stepIcon}>
              <GraduationCap size={18} />
            </div>
            <span>Education</span>
          </div>
          <div className={`${styles.progressStep} ${styles.activeStep}`}>
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
        <h2 className={styles.sectionTitle}>Skills</h2>
        <p className={styles.sectionDescription}>
          Add your technical and professional skills with proficiency levels
        </p>

        <div className={skillsStyles.skillsContainer}>
          <div className={skillsStyles.skillsSection}>
            <h3 className={skillsStyles.skillsSectionTitle}>Technical Skills</h3>
            <div className={skillsStyles.skillsInputContainer}>
              <input
                type="text"
                className={skillsStyles.skillsInput}
                placeholder="Add a skill (e.g., JavaScript, Python, React)"
              />
              <button className={skillsStyles.addSkillButton}>
                <i className="fas fa-plus"></i>
              </button>
            </div>

            <div className={skillsStyles.skillTags}>
              <div className={skillsStyles.skillTag}>
                JavaScript <button className={skillsStyles.removeSkillButton}>&times;</button>
              </div>
              <div className={skillsStyles.skillTag}>
                React <button className={skillsStyles.removeSkillButton}>&times;</button>
              </div>
              <div className={skillsStyles.skillTag}>
                Node.js <button className={skillsStyles.removeSkillButton}>&times;</button>
              </div>
              <div className={skillsStyles.skillTag}>
                TypeScript <button className={skillsStyles.removeSkillButton}>&times;</button>
              </div>
              <div className={skillsStyles.skillTag}>
                GraphQL <button className={skillsStyles.removeSkillButton}>&times;</button>
              </div>
            </div>
          </div>

          <div className={skillsStyles.skillsSection}>
            <h3 className={skillsStyles.skillsSectionTitle}>Soft Skills</h3>
            <div className={skillsStyles.skillsInputContainer}>
              <input
                type="text"
                className={skillsStyles.skillsInput}
                placeholder="Add a skill (e.g., Leadership, Communication)"
              />
              <button className={skillsStyles.addSkillButton}>
                <i className="fas fa-plus"></i>
              </button>
            </div>

            <div className={skillsStyles.skillTags}>
              <div className={skillsStyles.skillTag}>
                Team Leadership <button className={skillsStyles.removeSkillButton}>&times;</button>
              </div>
              <div className={skillsStyles.skillTag}>
                Problem Solving <button className={skillsStyles.removeSkillButton}>&times;</button>
              </div>
              <div className={skillsStyles.skillTag}>
                Communication <button className={skillsStyles.removeSkillButton}>&times;</button>
              </div>
            </div>
          </div>

          <div className={skillsStyles.aiSuggestion}>
            <div className={skillsStyles.aiSuggestionHeader}>
              <h3 className={skillsStyles.aiSuggestionTitle}>
                <i className="fas fa-lightbulb"></i> AI Skill Suggestions
              </h3>
              <p className={skillsStyles.aiSuggestionSubtitle}>
                Based on your job title and experience, we recommend these skills:
              </p>
            </div>
            <div className={skillsStyles.aiSuggestionTags}>
              <button className={skillsStyles.aiSuggestionTag}>Docker</button>
              <button className={skillsStyles.aiSuggestionTag}>Kubernetes</button>
              <button className={skillsStyles.aiSuggestionTag}>AWS</button>
              <button className={skillsStyles.aiSuggestionTag}>CI/CD</button>
              <button className={skillsStyles.aiSuggestionTag}>Agile Methodologies</button>
            </div>
          </div>
        </div>

        <div className={styles.formActions}>
          <Link href="/cv-generation/create-cv/education" className={styles.backButton}>
          <ArrowLeft size={16} className={styles.backIcon} /> Previous
          </Link>
          <Link href="/cv-generation/create-cv/additional" className={styles.nextButton}>
            Next <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}

