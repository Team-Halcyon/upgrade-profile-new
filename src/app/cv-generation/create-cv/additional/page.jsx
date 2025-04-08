// "use client"


// import Link from "next/link"
// import { useSearchParams } from "next/navigation"
// import styles from "../create-cv.module.css"
// import additionalStyles from "./additional.module.css"
// import { User, FileText, Briefcase, GraduationCap, Award, Languages, ArrowRight, Trash, Plus, ArrowLeft } from "lucide-react"

// export default function AdditionalPage() {
//   const searchParams = useSearchParams();
//   const source = searchParams.get('source') || '';

//   return (
//     <div className={styles.container}>
      
//       <div className={styles.progressContainer}>
//         <div className={styles.progressBar}>
//           <div className={styles.progressFill} style={{ width: "100%" }}></div>
//         </div>
//         <div className={styles.progressSteps}>
//           <div className={styles.progressStep}>
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
//           <div className={`${styles.progressStep} ${styles.activeStep}`}>
//             <div className={styles.stepIcon}>
//               <Languages size={18} />
//             </div>
//             <span>Additional</span>
//           </div>
//         </div>
//       </div>

//       <div className={styles.formSection}>
//         <h2 className={styles.sectionTitle}>Additional Information</h2>
//         <p className={styles.sectionDescription}>Add any additional information to enhance your CV</p>

//         <div className={additionalStyles.additionalSections}>
//           <div className={additionalStyles.additionalSection}>
//             <h3 className={additionalStyles.sectionTitle}>Languages</h3>
//             <div className={additionalStyles.languagesContainer}>
//               <div className={additionalStyles.languageEntry}>
//                 <div className={styles.formGroup}>
//                   <label className={styles.formLabel}>Language</label>
//                   <input type="text" className={styles.formInput} placeholder="English" />
//                 </div>
//                 <div className={styles.formGroup}>
//                   <label className={styles.formLabel}>Proficiency</label>
//                   <select className={styles.formInput}>
//                     <option value="native">Native</option>
//                     <option value="fluent">Fluent</option>
//                     <option value="advanced">Advanced</option>
//                     <option value="intermediate">Intermediate</option>
//                     <option value="basic">Basic</option>
//                   </select>
//                 </div>
//                 <button className={additionalStyles.removeButton}>
//                   <Trash size={16} />
//                 </button>
//               </div>
//               <button className={additionalStyles.addButton}>
//                 <Plus size={16} /> Add Language
//               </button>
//             </div>
//           </div>

//           <div className={additionalStyles.additionalSection}>
//             <h3 className={additionalStyles.sectionTitle}>Certifications</h3>
//             <div className={additionalStyles.certificationsContainer}>
//               <div className={additionalStyles.certificationEntry}>
//                 <div className={styles.formGroup}>
//                   <label className={styles.formLabel}>Certification Name</label>
//                   <input type="text" className={styles.formInput} placeholder="AWS Certified Solutions Architect" />
//                 </div>
//                 <div className={styles.formGroup}>
//                   <label className={styles.formLabel}>Issuing Organization</label>
//                   <input type="text" className={styles.formInput} placeholder="Amazon Web Services" />
//                 </div>
//                 <div className={styles.formGroup}>
//                   <label className={styles.formLabel}>Issue Date</label>
//                   <input type="month" className={styles.formInput} />
//                 </div>
//                 <button className={additionalStyles.removeButton}>
//                   <Trash size={16} />
//                 </button>
//               </div>
//               <button className={additionalStyles.addButton}>
//                 <Plus size={16} /> Add Certification
//               </button>
//             </div>
//           </div>

//           <div className={additionalStyles.additionalSection}>
//             <h3 className={additionalStyles.sectionTitle}>Projects</h3>
//             <div className={additionalStyles.projectsContainer}>
//               <div className={additionalStyles.projectEntry}>
//                 <div className={styles.formGroup}>
//                   <label className={styles.formLabel}>Project Name</label>
//                   <input type="text" className={styles.formInput} placeholder="E-commerce Platform" />
//                 </div>
//                 <div className={styles.formGroup}>
//                   <label className={styles.formLabel}>Description</label>
//                   <textarea
//                     className={styles.formTextarea}
//                     rows="3"
//                     placeholder="Developed a full-stack e-commerce platform using React, Node.js, and MongoDB"
//                   ></textarea>
//                 </div>
//                 <div className={styles.formGroup}>
//                   <label className={styles.formLabel}>Project URL (Optional)</label>
//                   <input type="text" className={styles.formInput} placeholder="https://github.com/username/project" />
//                 </div>
//                 <button className={additionalStyles.removeButton}>
//                   <Trash size={16} />
//                 </button>
//               </div>
//               <button className={additionalStyles.addButton}>
//                 <Plus size={16} /> Add Project
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className={styles.formActions}>
//           <Link href="/cv-generation/create-cv/skills" className={styles.backButton}>
//             <ArrowLeft size={18} className={styles.backIcon} /> Previous
//           </Link>
//           <Link 
//             href={`/cv-generation/cv-templates?source=${source || 'create'}`} 
//             className={styles.nextButton}
//           >
//             Choose template <ArrowRight size={16} />
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }
"use client"

import Link from "next/link"
import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import styles from "../create-cv.module.css"
import additionalStyles from "./additional.module.css"
import { User, FileText, Briefcase, GraduationCap, Award, Languages, ArrowRight, Trash, Plus, ArrowLeft } from "lucide-react"

export default function AdditionalPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdditionalPageContent />
    </Suspense>
  );
}

function AdditionalPageContent() {
  const searchParams = useSearchParams();
  const source = searchParams.get('source') || '';

  return (
    <div className={styles.container}>
      
      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: "100%" }}></div>
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
          <div className={styles.progressStep}>
            <div className={styles.stepIcon}>
              <Award size={18} />
            </div>
            <span>Skills</span>
          </div>
          <div className={`${styles.progressStep} ${styles.activeStep}`}>
            <div className={styles.stepIcon}>
              <Languages size={18} />
            </div>
            <span>Additional</span>
          </div>
        </div>
      </div>

      <div className={styles.formSection}>
        <h2 className={styles.sectionTitle}>Additional Information</h2>
        <p className={styles.sectionDescription}>Add any additional information to enhance your CV</p>

        <div className={additionalStyles.additionalSections}>
          <div className={additionalStyles.additionalSection}>
            <h3 className={additionalStyles.sectionTitle}>Languages</h3>
            <div className={additionalStyles.languagesContainer}>
              <div className={additionalStyles.languageEntry}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Language</label>
                  <input type="text" className={styles.formInput} placeholder="English" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Proficiency</label>
                  <select className={styles.formInput}>
                    <option value="native">Native</option>
                    <option value="fluent">Fluent</option>
                    <option value="advanced">Advanced</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="basic">Basic</option>
                  </select>
                </div>
                <button className={additionalStyles.removeButton}>
                  <Trash size={16} />
                </button>
              </div>
              <button className={additionalStyles.addButton}>
                <Plus size={16} /> Add Language
              </button>
            </div>
          </div>

          <div className={additionalStyles.additionalSection}>
            <h3 className={additionalStyles.sectionTitle}>Certifications</h3>
            <div className={additionalStyles.certificationsContainer}>
              <div className={additionalStyles.certificationEntry}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Certification Name</label>
                  <input type="text" className={styles.formInput} placeholder="AWS Certified Solutions Architect" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Issuing Organization</label>
                  <input type="text" className={styles.formInput} placeholder="Amazon Web Services" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Issue Date</label>
                  <input type="month" className={styles.formInput} />
                </div>
                <button className={additionalStyles.removeButton}>
                  <Trash size={16} />
                </button>
              </div>
              <button className={additionalStyles.addButton}>
                <Plus size={16} /> Add Certification
              </button>
            </div>
          </div>

          <div className={additionalStyles.additionalSection}>
            <h3 className={additionalStyles.sectionTitle}>Projects</h3>
            <div className={additionalStyles.projectsContainer}>
              <div className={additionalStyles.projectEntry}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Project Name</label>
                  <input type="text" className={styles.formInput} placeholder="E-commerce Platform" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Description</label>
                  <textarea
                    className={styles.formTextarea}
                    rows="3"
                    placeholder="Developed a full-stack e-commerce platform using React, Node.js, and MongoDB"
                  ></textarea>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Project URL (Optional)</label>
                  <input type="text" className={styles.formInput} placeholder="https://github.com/username/project" />
                </div>
                <button className={additionalStyles.removeButton}>
                  <Trash size={16} />
                </button>
              </div>
              <button className={additionalStyles.addButton}>
                <Plus size={16} /> Add Project
              </button>
            </div>
          </div>
        </div>

        <div className={styles.formActions}>
          <Link href="/cv-generation/create-cv/skills" className={styles.backButton}>
            <ArrowLeft size={18} className={styles.backIcon} /> Previous
          </Link>
          <Link 
            href={`/cv-generation/cv-templates?source=${source || 'create'}`} 
            className={styles.nextButton}
          >
            Choose template <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}

