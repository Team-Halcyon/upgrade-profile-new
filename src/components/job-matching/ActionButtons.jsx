import styles from "./ActionButtons.module.css"
import Link from 'next/link'

export default function ActionButtons() {
  return (
    <div className={styles.container}>
        <button className={styles.viewButton}>View All Jobs</button>
      <Link href="/job-matching/auto-apply">
        <button className={styles.applyButton}>Auto-Apply</button>
      </Link>
    </div>
  )
}

