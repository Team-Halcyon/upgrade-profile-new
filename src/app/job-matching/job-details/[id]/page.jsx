import styles from "../job-details.module.css"
import Link from 'next/link'

// Sample job data - in a real app, you would fetch this based on the ID
const jobData = {
  id: 1,
  title: "Frontend Developer",
  company: "Tech Solutions Ltd",
  location: "San Francisco, CA",
  salaryRange: "$90,000 - $130,000 per year",
  jobType: "Full-Time",
  matchScore: 92,
  description: `
    We are looking for a skilled Frontend Developer to join our team. You will be responsible for building the client-side of our web applications. You should be able to translate our company and customer needs into functional and appealing interactive applications.
    
    If you're interested in creating a user-friendly environment by writing code and moving forward in your career, then this job is for you. We expect you to be a tech-savvy professional, who is curious about new digital technologies and aspires to combine usability with visual design.
  `,
  requirements: [
    "Proven work experience as a Frontend developer",
    "Hands-on experience with markup languages",
    "Experience with JavaScript, CSS and jQuery",
    "Familiarity with browser testing and debugging",
    "In-depth understanding of the entire web development process",
    "Understanding of layout aesthetics",
    "Knowledge of SEO principles",
    "An ability to perform well in a fast-paced environment",
    "Excellent analytical and multitasking skills",
  ],
  benefits: [
    "Competitive salary",
    "Health insurance",
    "Flexible working hours",
    "Remote work options",
    "Professional development opportunities",
    "Modern office space",
  ],
  skillsMatch: [
    { skill: "React.js", match: true },
    { skill: "JavaScript", match: true },
    { skill: "CSS", match: true },
    { skill: "HTML", match: true },
    { skill: "TypeScript", match: false },
    { skill: "Next.js", match: true },
    { skill: "Redux", match: false },
    { skill: "Responsive Design", match: true },
  ],
}

export default function JobDetailPage({ params }) {
  // Now we can access the job ID from the URL
  const { id } = params;
  
  // In a real application, you would fetch the job data based on the ID
  console.log("Job ID from URL:", id);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/job-matching" className={styles.backButton}>
          ← Back to Jobs
        </Link>

        <div className={styles.jobHeader}>
          <h1 className={styles.title}>{jobData.title}</h1>
          <div className={styles.company}>{jobData.company}</div>
          <div className={styles.meta}>
            <span className={styles.location}>{jobData.location}</span>
            <span className={styles.divider}>•</span>
            <span className={styles.salary}>{jobData.salaryRange}</span>
            <span className={styles.divider}>•</span>
            <span className={`${styles.jobType} ${styles[jobData.jobType.toLowerCase().replace("-", "")]}`}>
              {jobData.jobType}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.mainContent}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Job Description</h2>
            <div className={styles.description}>{jobData.description}</div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Requirements</h2>
            <ul className={styles.requirementsList}>
              {jobData.requirements.map((req, index) => (
                <li key={index} className={styles.requirementItem}>
                  {req}
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Benefits</h2>
            <div className={styles.benefitsGrid}>
              {jobData.benefits.map((benefit, index) => (
                <div key={index} className={styles.benefitItem}>
                  <div className={styles.benefitIcon}>✓</div>
                  <div className={styles.benefitText}>{benefit}</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className={styles.sidebar}>
          <div className={styles.matchCard}>
            <div className={styles.matchHeader}>
              <h3 className={styles.matchTitle}>Match Score</h3>
              <div className={styles.matchValue}>{jobData.matchScore}%</div>
            </div>
            <div className={styles.matchBar}>
              <div className={styles.matchProgress} style={{ width: `${jobData.matchScore}%` }}></div>
            </div>
            <div className={styles.matchText}>Your profile is a strong match for this position!</div>
          </div>

          <div className={styles.skillsCard}>
            <h3 className={styles.skillsTitle}>Skills Match</h3>
            <div className={styles.skillsList}>
              {jobData.skillsMatch.map((skill, index) => (
                <div key={index} className={styles.skillItem}>
                  <div className={`${styles.skillIcon} ${skill.match ? styles.match : styles.missing}`}>
                    {skill.match ? "✓" : "✗"}
                  </div>
                  <div className={styles.skillName}>{skill.skill}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.applyButton}>Apply Now</button>
            <button className={styles.saveButton}>Save Job</button>
          </div>
        </div>
      </div>
    </div>
  )
}