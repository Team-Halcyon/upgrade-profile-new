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
    const cleaned = html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ')
    return cleaned.length > 200 ? cleaned.substring(0, 200) + '...' : cleaned
  }

  // Get match score color based on percentage
  const getMatchScoreColor = (score) => {
    if (score >= 80) return '#2d8c2d' // Green
    if (score >= 60) return '#f57c00' // Orange
    if (score >= 40) return '#ff9800' // Amber
    return '#d32f2f' // Red
  }

  const matchScore = job.match_score || 0

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
        
        <div className={styles.matchScore} style={{ backgroundColor: `${getMatchScoreColor(matchScore)}15` }}>
          <span className={styles.score} style={{ color: getMatchScoreColor(matchScore) }}>
            {matchScore}%
          </span>
          <div className={styles.matchLabel}>Match</div>
        </div>
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