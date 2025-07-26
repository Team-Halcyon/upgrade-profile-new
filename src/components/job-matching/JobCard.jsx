// import styles from "./JobCard.module.css"
// import Link from 'next/link'

// export default function JobCard({ job }) {
//   const { id, title, company, location, salaryRange, jobType, matchScore } = job

//   return (
//     <div className={styles.card}>
//       <div className={styles.content}>
//         <div className={styles.header}>
//           <h3 className={styles.title}>{title}</h3>
//           <div className={`${styles.badge} ${styles[jobType.toLowerCase().replace("-", "")]}`}>{jobType}</div>
//         </div>

//         <div className={styles.details}>
//           <div className={styles.detailItem}>
//             <span className={styles.label}>Company Name:</span>
//             <span className={styles.value}>{company}</span>
//           </div>
//           <div className={styles.detailItem}>
//             <span className={styles.label}>Location:</span>
//             <span className={styles.value}>{location}</span>
//           </div>
//           <div className={styles.detailItem}>
//             <span className={styles.label}>Salary Range:</span>
//             <span className={styles.value}>{salaryRange}</span>
//           </div>
//         </div>

//         <div className={styles.footer}>
//           <div className={styles.matchScore}>
//             <div className={styles.scoreLabel}>Match Score</div>
//             <div className={styles.scoreValue}>{matchScore}%</div>
//             <div className={styles.scoreBar}>
//               <div className={styles.scoreProgress} style={{ width: `${matchScore}%` }}></div>
//             </div>
//           </div>

//           <div className={styles.actions}>
//             <Link href={`/job-matching/job-details/${id}`}>
//               <button className={styles.viewButton}>View Details</button>
//             </Link>
//             <button className={styles.applyButton}>Quick Apply</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
"use client"
import styles from "./JobCard.module.css"

export default function JobCard({ job }) {
  // Format salary range
  const formatSalary = (min, max) => {
    if (min && max) {
      return `$${min.toLocaleString()} - $${max.toLocaleString()} per year`
    } else if (min) {
      return `$${min.toLocaleString()}+ per year`
    } else if (max) {
      return `Up to $${max.toLocaleString()} per year`
    }
    return "Salary not specified"
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  // Clean HTML from description
  const cleanDescription = (html) => {
    if (!html) return ""
    // Remove HTML tags and decode entities
    const cleaned = html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ')
    // Truncate to reasonable length
    return cleaned.length > 200 ? cleaned.substring(0, 200) + '...' : cleaned
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.companyInfo}>
          {job.company_logo && (
            <img 
              src={job.company_logo} 
              alt={`${job.company} logo`}
              className={styles.companyLogo}
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          )}
          <div className={styles.jobInfo}>
            <h3 className={styles.jobTitle}>{job.position || job.title}</h3>
            <p className={styles.company}>{job.company}</p>
          </div>
        </div>
        
        {job.matchScore && (
          <div className={styles.matchScore}>
            <span className={styles.score}>{job.matchScore}%</span>
            <div className={styles.matchLabel}>Match</div>
          </div>
        )}
      </div>

      <div className={styles.details}>
        <div className={styles.detailItem}>
          <span className={styles.icon}>📍</span>
          <span>{job.location || 'Location not specified'}</span>
        </div>
        
        <div className={styles.detailItem}>
          <span className={styles.icon}>💰</span>
          <span>{formatSalary(job.salary_min, job.salary_max)}</span>
        </div>
        
        {job.date && (
          <div className={styles.detailItem}>
            <span className={styles.icon}>📅</span>
            <span>Posted: {formatDate(job.date)}</span>
          </div>
        )}
      </div>

      {job.description && (
        <div className={styles.description}>
          <p>{cleanDescription(job.description)}</p>
        </div>
      )}

      {job.tags && job.tags.length > 0 && (
        <div className={styles.tags}>
          {job.tags.slice(0, 5).map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
            </span>
          ))}
          {job.tags.length > 5 && (
            <span className={styles.moreTagsIndicator}>
              +{job.tags.length - 5} more
            </span>
          )}
        </div>
      )}

      <div className={styles.actions}>
        {job.apply_url && (
          <a 
            href={job.apply_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.applyButton}
          >
            Apply Now
          </a>
        )}
        
        {job.url && job.url !== job.apply_url && (
          <a 
            href={job.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.viewButton}
          >
            View Details
          </a>
        )}
      </div>
    </div>
  )
}