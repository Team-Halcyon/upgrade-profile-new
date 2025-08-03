// import JobList from "@/components/job-matching/JobList"
// import JobFilters from "@/components/job-matching/JobFilters"
// import ActionButtons from "@/components/job-matching/ActionButtons"
// import styles from "./job-matching.module.css"

// export default function JobMatchingPage() {
//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h1 className={styles.title}>Job Matching</h1>
//         <p className={styles.subtitle}>Find and apply to jobs that match your skills and preferences</p>
//       </div>

//       <div className={styles.actionContainer}>
//         <ActionButtons />
//       </div>

//       <div className={styles.content}>
//         <div className={styles.filtersContainer}>
//           <JobFilters />
//         </div>
//         <div className={styles.jobsContainer}>
//           <JobList />
//         </div>
//       </div>
//     </div>
//   )
// }

import JobMatching from "@/components/job-matching/JobMatching"

export default function JobMatchingPage() {
  return <JobMatching />
}