// // "use client"

// // import Link from "next/link"
// // import { useState } from "react"
// // import {
// //   ArrowRight,
// //   FileText,
// //   Briefcase,
// //   GraduationCap,
// //   Award,
// //   Languages,
// //   User,
// // } from "lucide-react"
// // // import { useSearchParams } from "next/navigation"
// // // import { User, FileText, Briefcase, GraduationCap, Award, Languages, ArrowRight, ArrowLeft } from "lucide-react"
// // import styles from "./create-cv.module.css"
// // import { submitUserInfo } from "@/lib/userAPIs" // Importing the API function


// // // export default function CreateCVPage() {
// // //   const searchParams = useSearchParams();
// // //   const source = searchParams.get('source');
// //    const isFromUpload = source === 'upload';
// // export default function Page() {
// //   const [formData, setFormData] = useState({
// //     fullName: '',
// //     jobTitle: '',
// //     email: '',
// //     phone: '',
// //     location: '',
// //     linkedIn: '',
// //     website: '',
// //     github: ''
// //   })
  
// //   const [isLoading, setIsLoading] = useState(false)
// //   const [error, setError] = useState('')
// //   const [successMessage, setSuccessMessage] = useState('')

// //   const handleChange = (e) => {
// //     const { name, value } = e.target
// //     setFormData({
// //       ...formData,
// //       [name]: value
// //     })
// //   }

// //   const handleSubmit = async (e) => {
// //     e.preventDefault()
// //     setIsLoading(true)
// //     setError('')
// //     setSuccessMessage('')

// //     const result = await submitUserInfo(formData)

// //     if (result.success) {
// //       setSuccessMessage('Your information has been successfully saved.')
// //       // Redirect to the next step or page
// //       // For example, navigate to step 2
// //       window.location.href = "/cv-generation/create?step=2"
// //     } else {
// //       setError(result.message || 'An error occurred while saving your information')
// //     }

// //     setIsLoading(false)
// //   }

// //   return (
// //     <div className={styles.container}>
// //       <div className={styles.header}>
// //         <h1 className={styles.title}>
// //           {isFromUpload ? "Review Your CV Information" : "Create Your CV"}
// //         </h1>
// //         <p className={styles.subtitle}>
// //           {isFromUpload 
// //             ? "We've extracted information from your uploaded CV. Please review and make any necessary changes."
// //             : "Let's build your professional CV step by step with our AI-powered assistant"}
// //         </p>
// //       </div>
// //       <div className={styles.progressContainer}>
// //         <div className={styles.progressBar}>
// //           <div className={styles.progressFill} style={{ width: "16.6%" }}></div>
// //         </div>
// //         <div className={styles.progressSteps}>
// //           <div className={`${styles.progressStep} ${styles.activeStep}`}>
// //             <div className={styles.stepIcon}>
// //               <User size={18} />
// //             </div>
// //             <span>Personal</span>
// //           </div>
// //           <div className={styles.progressStep}>
// //             <div className={styles.stepIcon}>
// //               <FileText size={18} />
// //             </div>
// //             <span>Summary</span>
// //           </div>
// //           <div className={styles.progressStep}>
// //             <div className={styles.stepIcon}>
// //               <Briefcase size={18} />
// //             </div>
// //             <span>Experience</span>
// //           </div>
// //           <div className={styles.progressStep}>
// //             <div className={styles.stepIcon}>
// //               <GraduationCap size={18} />
// //             </div>
// //             <span>Education</span>
// //           </div>
// //           <div className={styles.progressStep}>
// //             <div className={styles.stepIcon}>
// //               <Award size={18} />
// //             </div>
// //             <span>Skills</span>
// //           </div>
// //           <div className={styles.progressStep}>
// //             <div className={styles.stepIcon}>
// //               <Languages size={18} />
// //             </div>
// //             <span>Additional</span>
// //         </div>
// //       </div>

// //       <div className={styles.formSection}>
// //         <h2 className={styles.sectionTitle}>Personal Information</h2>
// //         <p className={styles.sectionDescription}>
// //           {isFromUpload 
// //             ? "Review the personal information extracted from your uploaded CV"
// //             : "Let's start with your basic information that will appear at the top of your CV"}
// //         </p>

// //           {error && <div className={styles.error}>{error}</div>}
// //           {successMessage && <div className={styles.success}>{successMessage}</div>}

// //           <form onSubmit={handleSubmit}>
// //             <div className={styles.formGrid}>
// //               <div className={styles.formGroup}>
// //                 <label className={styles.formLabel}>Full Name*</label>
// //                 <input
// //                   type="text"
// //                   name="fullName"
// //                   value={formData.fullName}
// //                   onChange={handleChange}
// //                   className={styles.formInput}
// //                   placeholder="John Doe"
// //                   required
// //                 />
// //               </div>

// //               <div className={styles.formGroup}>
// //                 <label className={styles.formLabel}>Job Title*</label>
// //                 <input
// //                   type="text"
// //                   name="jobTitle"
// //                   value={formData.jobTitle}
// //                   onChange={handleChange}
// //                   className={styles.formInput}
// //                   placeholder="Senior Software Engineer"
// //                   required
// //                 />
// //               </div>

// //               <div className={styles.formGroup}>
// //                 <label className={styles.formLabel}>Email*</label>
// //                 <input
// //                   type="email"
// //                   name="email"
// //                   value={formData.email}
// //                   onChange={handleChange}
// //                   className={styles.formInput}
// //                   placeholder="johndoe@example.com"
// //                   required
// //                 />
// //               </div>

// //               <div className={styles.formGroup}>
// //                 <label className={styles.formLabel}>Phone*</label>
// //                 <input
// //                   type="tel"
// //                   name="phone"
// //                   value={formData.phone}
// //                   onChange={handleChange}
// //                   className={styles.formInput}
// //                   placeholder="+1 (555) 123-4567"
// //                   required
// //                 />
// //               </div>

// //               <div className={styles.formGroup}>
// //                 <label className={styles.formLabel}>Location</label>
// //                 <input
// //                   type="text"
// //                   name="location"
// //                   value={formData.location}
// //                   onChange={handleChange}
// //                   className={styles.formInput}
// //                   placeholder="New York, NY"
// //                 />
// //               </div>

// //               <div className={styles.formGroup}>
// //                 <label className={styles.formLabel}>LinkedIn</label>
// //                 <input
// //                   type="text"
// //                   name="linkedIn"
// //                   value={formData.linkedIn}
// //                   onChange={handleChange}
// //                   className={styles.formInput}
// //                   placeholder="linkedin.com/in/johndoe"
// //                 />
// //               </div>


// //               <div className={styles.formGroup}>
// //                 <label className={styles.formLabel}>Website/Portfolio</label>
// //                 <input
// //                   type="text"
// //                   name="website"
// //                   value={formData.website}
// //                   onChange={handleChange}
// //                   className={styles.formInput}
// //                   placeholder="johndoe.com"
// //                 />
// //               </div>

// //               <div className={styles.formGroup}>

// //                 <label className={styles.formLabel}>GitHub</label>
// //                 <input
// //                   type="text"
// //                   name="github"
// //                   value={formData.github}
// //                   onChange={handleChange}
// //                   className={styles.formInput}
// //                   placeholder="github.com/johndoe"
// //                 />
// //               </div>
// //             </div>

// //             <div className={styles.aiAssistant}>
// //               <div className={styles.aiSuggestion}>
// //                 <p className={styles.aiMessage}>
// //                   <strong>AI Assistant:</strong> Would you like me to suggest a professional summary based on your job title?
// //                 </p>
// //                 <button className={styles.aiButton}>Yes, help me</button>
// //               </div>
// //             </div>

// //             <div className={styles.actions}>
// //               <Link href="/cv-generation" className={styles.backButton}>
// //                 Back
// //               </Link>
// //               <button type="submit" className={styles.continueButton} disabled={isLoading}>
// //                 {isLoading ? 'Saving...' : 'Continue'}
// //                 <ArrowRight size={18} />
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
   
// //   )
// // }
// "use client"

// // Disable static prerendering for this page
// export const dynamic = "force-dynamic";

// import Link from "next/link"
// import { useState, useEffect, Suspense } from "react"
// import { useSearchParams } from "next/navigation"
// import {
//   ArrowRight,
//   FileText,
//   Briefcase,
//   GraduationCap,
//   Award,
//   Languages,
//   User,
// } from "lucide-react"
// import styles from "./create-cv.module.css"
// import { submitUserInfo } from "@/lib/userAPIs"

// // Main component that uses client-side hooks
// function CreateCVPage() {
//   const searchParams = useSearchParams()
//   const [isFromUpload, setIsFromUpload] = useState(false)

//   const [formData, setFormData] = useState({
//     fullName: "",
//     jobTitle: "",
//     email: "",
//     phone: "",
//     location: "",
//     linkedIn: "",
//     website: "",
//     github: "",
//   })

//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")
//   const [successMessage, setSuccessMessage] = useState("")

//   // useEffect runs on the client, so we can safely use useSearchParams
//   useEffect(() => {
//     const source = searchParams.get("source")
//     if (source === "upload") {
//       setIsFromUpload(true)
//     }
//   }, [searchParams])

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData({ ...formData, [name]: value })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)
//     setError("")
//     setSuccessMessage("")

//     const result = await submitUserInfo(formData)
//     if (result.success) {
//       setSuccessMessage("Your information has been successfully saved.")
//       window.location.href = "/cv-generation/create?step=2"
//     } else {
//       setError(result.message || "An error occurred while saving your information")
//     }
//     setIsLoading(false)
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h1 className={styles.title}>
//           {isFromUpload ? "Review Your CV Information" : "Create Your CV"}
//         </h1>
//         <p className={styles.subtitle}>
//           {isFromUpload
//             ? "We've extracted information from your uploaded CV. Please review and make any necessary changes."
//             : "Let's build your professional CV step by step with our AI-powered assistant"}
//         </p>
//       </div>
//       <div className={styles.progressContainer}>
//         <div className={styles.progressBar}>
//           <div className={styles.progressFill} style={{ width: "16.6%" }}></div>
//         </div>
//         <div className={styles.progressSteps}>
//           <div className={`${styles.progressStep} ${styles.activeStep}`}>
//             <div className={styles.stepIcon}>
//               <User size={18} />
//             </div>
//             <span>Personal</span>
//           </div>
//           <div className={styles.progressStep}>
//             <div className={styles.stepIcon}>
//               <FileText size={18} />
//             </div>
//             <span>Summary</span>
//           </div>
//           <div className={styles.progressStep}>
//             <div className={styles.stepIcon}>
//               <Briefcase size={18} />
//             </div>
//             <span>Experience</span>
//           </div>
//           <div className={styles.progressStep}>
//             <div className={styles.stepIcon}>
//               <GraduationCap size={18} />
//             </div>
//             <span>Education</span>
//           </div>
//           <div className={styles.progressStep}>
//             <div className={styles.stepIcon}>
//               <Award size={18} />
//             </div>
//             <span>Skills</span>
//           </div>
//           <div className={styles.progressStep}>
//             <div className={styles.stepIcon}>
//               <Languages size={18} />
//             </div>
//             <span>Additional</span>
//           </div>
//         </div>
//       </div>

//       <div className={styles.formSection}>
//         <h2 className={styles.sectionTitle}>Personal Information</h2>
//         <p className={styles.sectionDescription}>
//           {isFromUpload
//             ? "Review the personal information extracted from your uploaded CV"
//             : "Let's start with your basic information that will appear at the top of your CV"}
//         </p>

//         {error && <div className={styles.error}>{error}</div>}
//         {successMessage && <div className={styles.success}>{successMessage}</div>}

//         <form onSubmit={handleSubmit}>
//           <div className={styles.formGrid}>
//             <div className={styles.formGroup}>
//               <label className={styles.formLabel}>Full Name*</label>
//               <input
//                 type="text"
//                 name="fullName"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 className={styles.formInput}
//                 placeholder="John Doe"
//                 required
//               />
//             </div>

//             <div className={styles.formGroup}>
//               <label className={styles.formLabel}>Job Title*</label>
//               <input
//                 type="text"
//                 name="jobTitle"
//                 value={formData.jobTitle}
//                 onChange={handleChange}
//                 className={styles.formInput}
//                 placeholder="Senior Software Engineer"
//                 required
//               />
//             </div>

//             <div className={styles.formGroup}>
//               <label className={styles.formLabel}>Email*</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={styles.formInput}
//                 placeholder="johndoe@example.com"
//                 required
//               />
//             </div>

//             <div className={styles.formGroup}>
//               <label className={styles.formLabel}>Phone*</label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className={styles.formInput}
//                 placeholder="+1 (555) 123-4567"
//                 required
//               />
//             </div>

//             <div className={styles.formGroup}>
//               <label className={styles.formLabel}>Location</label>
//               <input
//                 type="text"
//                 name="location"
//                 value={formData.location}
//                 onChange={handleChange}
//                 className={styles.formInput}
//                 placeholder="New York, NY"
//               />
//             </div>

//             <div className={styles.formGroup}>
//               <label className={styles.formLabel}>LinkedIn</label>
//               <input
//                 type="text"
//                 name="linkedIn"
//                 value={formData.linkedIn}
//                 onChange={handleChange}
//                 className={styles.formInput}
//                 placeholder="linkedin.com/in/johndoe"
//               />
//             </div>

//             <div className={styles.formGroup}>
//               <label className={styles.formLabel}>Website/Portfolio</label>
//               <input
//                 type="text"
//                 name="website"
//                 value={formData.website}
//                 onChange={handleChange}
//                 className={styles.formInput}
//                 placeholder="johndoe.com"
//               />
//             </div>

//             <div className={styles.formGroup}>
//               <label className={styles.formLabel}>GitHub</label>
//               <input
//                 type="text"
//                 name="github"
//                 value={formData.github}
//                 onChange={handleChange}
//                 className={styles.formInput}
//                 placeholder="github.com/johndoe"
//               />
//             </div>
//           </div>

//           <div className={styles.aiAssistant}>
//             <div className={styles.aiSuggestion}>
//               <p className={styles.aiMessage}>
//                 <strong>AI Assistant:</strong> Would you like me to suggest a professional summary based on your job title?
//               </p>
//               <button className={styles.aiButton}>Yes, help me</button>
//             </div>
//           </div>

//           <div className={styles.actions}>
//             <Link href="/cv-generation" className={styles.backButton}>
//               Back
//             </Link>
//             <button type="submit" className={styles.continueButton} disabled={isLoading}>
//               {isLoading ? "Saving..." : "Continue"}
//               <ArrowRight size={18} />
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// // Wrap the CreateCVPage in Suspense to ensure client-only hooks work as expected
// export default function Page() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <CreateCVPage />
//     </Suspense>
//   )
// }


