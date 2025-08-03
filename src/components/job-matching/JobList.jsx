// import JobCard from "./JobCard"
// import styles from "./JobList.module.css"

// // Sample job data
// const jobsData = [
//   {
//     id: 1,
//     title: "Frontend Developer",
//     company: "Tech Solutions Ltd",
//     location: "San Francisco, CA",
//     salaryRange: "$90,000 - $130,000 per year",
//     jobType: "Full-Time",
//     matchScore: 92,
//   },
//   {
//     id: 2,
//     title: "Software Engineer",
//     company: "Newton Web Solutions",
//     location: "Toronto, Canada",
//     salaryRange: "CAD 70,000 - CAD 90,000 per year",
//     jobType: "Full-Time",
//     matchScore: 88,
//   },
//   {
//     id: 3,
//     title: "Data Scientist",
//     company: "AI Innovations Inc",
//     location: "Remote",
//     salaryRange: "$90,000 - $120,000 per year",
//     jobType: "Full-Time",
//     matchScore: 85,
//   },
//   {
//     id: 4,
//     title: "AI Engineer",
//     company: "DeepAI Labs",
//     location: "Remote",
//     salaryRange: "$110,000 - $150,000 per year",
//     jobType: "Full-Time",
//     matchScore: 90,
//   },
//   {
//     id: 5,
//     title: "Full Stack Developer",
//     company: "ScaleUp Technologies",
//     location: "Berlin, Germany",
//     salaryRange: "€70,000 - €95,000 per year",
//     jobType: "Internship",
//     matchScore: 78,
//   },
//   {
//     id: 6,
//     title: "UI/UX Designer",
//     company: "Creative Minds Studio",
//     location: "New York, NY",
//     salaryRange: "$85,000+ per year",
//     jobType: "Part-Time",
//     matchScore: 82,
//   },
// ]

// export default function JobList() {
//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h2 className={styles.title}>Matching Jobs</h2>
//         <p className={styles.subtitle}>{jobsData.length} jobs found based on your profile</p>
//       </div>

//       <div className={styles.jobsList}>
//         {jobsData.map((job) => (
//           <JobCard key={job.id} job={job} />
//         ))}
//       </div>
//     </div>
//   )
// }
"use client"
import { useState, useEffect } from "react"
import JobCard from "./JobCard"
import styles from "./JobList.module.css"

export default function JobList({ jobs, loading, error }) {
  // If no jobs prop is passed, we can still show loading/error states
  const jobsToDisplay = jobs || []

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Finding Matching Jobs...</h2>
          <p className={styles.subtitle}>Please wait while we analyze your CV</p>
        </div>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Processing your CV and fetching matching jobs...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Error</h2>
          <p className={styles.subtitle} style={{ color: 'red' }}>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Matching Jobs</h2>
        <p className={styles.subtitle}>
          {jobsToDisplay.length} jobs found based on your profile
        </p>
      </div>

      <div className={styles.jobsList}>
        {jobsToDisplay.length > 0 ? (
          jobsToDisplay.map((job) => (
            <JobCard key={job.id || job.slug} job={job} />
          ))
        ) : (
          <div className={styles.noJobs}>
            <p>No matching jobs found. Try uploading a different CV or check back later.</p>
          </div>
        )}
      </div>
    </div>
  )
}