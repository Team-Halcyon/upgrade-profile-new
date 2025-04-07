import styles from "./JobCard.module.css"
import Link from 'next/link'

export default function JobCard({ job }) {
  const { id, title, company, location, salaryRange, jobType, matchScore } = job

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <div className={`${styles.badge} ${styles[jobType.toLowerCase().replace("-", "")]}`}>{jobType}</div>
        </div>

        <div className={styles.details}>
          <div className={styles.detailItem}>
            <span className={styles.label}>Company Name:</span>
            <span className={styles.value}>{company}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Location:</span>
            <span className={styles.value}>{location}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Salary Range:</span>
            <span className={styles.value}>{salaryRange}</span>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.matchScore}>
            <div className={styles.scoreLabel}>Match Score</div>
            <div className={styles.scoreValue}>{matchScore}%</div>
            <div className={styles.scoreBar}>
              <div className={styles.scoreProgress} style={{ width: `${matchScore}%` }}></div>
            </div>
          </div>

          <div className={styles.actions}>
            <Link href={`/job-matching/job-details/${id}`}>
              <button className={styles.viewButton}>View Details</button>
            </Link>
            <button className={styles.applyButton}>Quick Apply</button>
          </div>
        </div>
      </div>
    </div>
  )
}

