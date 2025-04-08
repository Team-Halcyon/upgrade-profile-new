// "use client"

// import Link from "next/link"
// import Image from "next/image"
// import { ChevronLeft, ChevronRight } from "lucide-react"
// import { useSearchParams } from "next/navigation"
// import styles from "./cv-templates.module.css"

// const templates = [
//   {
//     id: "classic",
//     name: "Classic Professional",
//     image: "/placeholder.svg?height=400&width=300",
//     description: "Clean and professional design suitable for most industries",
//   },
//   {
//     id: "modern",
//     name: "Modern Creative",
//     image: "/placeholder.svg?height=400&width=300",
//     description: "Contemporary design with a creative touch",
//   },
//   {
//     id: "minimal",
//     name: "Minimal Elegant",
//     image: "/placeholder.svg?height=400&width=300",
//     description: "Simple and elegant design focusing on content",
//   },
//   {
//     id: "executive",
//     name: "Executive Premium",
//     image: "/placeholder.svg?height=400&width=300",
//     description: "Sophisticated design for senior professionals",
//   },
//   {
//     id: "tech",
//     name: "Tech Innovator",
//     image: "/placeholder.svg?height=400&width=300",
//     description: "Modern design optimized for tech professionals",
//   },
//   {
//     id: "creative",
//     name: "Creative Portfolio",
//     image: "/placeholder.svg?height=400&width=300",
//     description: "Vibrant design for creative professionals",
//   },
// ]

// export default function TemplatesPage() {
//   const searchParams = useSearchParams();
//   const source = searchParams.get('source') || 'create'; // Default to 'create' if not specified
  
//   // Back button destination based on source
//   const backDestination = source === 'upload' 
//     ? '/cv-generation/create-cv' 
//     : '/cv-generation/create-cv/additional';
  
//   // Always use "Back to Edit CV" label as per requirement
//   const backLabel = "Back to Edit CV";

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h1 className={styles.title}>Choose your preferred CV template</h1>
//         <p className={styles.subtitle}>Select a professional template that best represents your personal brand</p>
//       </div>

//       <div className={styles.templateCarousel}>
//         <button className={styles.carouselButton} aria-label="Previous templates">
//           <ChevronLeft size={24} />
//         </button>

//         <div className={styles.templatesContainer}>
//           {templates.map((template) => (
//             <div key={template.id} className={styles.templateCard}>
//               <div className={styles.templateImageContainer}>
//                 <Image
//                   src={template.image}
//                   alt={template.name}
//                   width={300}
//                   height={400}
//                   className={styles.templateImage}
//                 />
//               </div>
//               <h3 className={styles.templateName}>{template.name}</h3>
//               <p className={styles.templateDescription}>{template.description}</p>
//               <Link 
//                 href={`/cv-generation/preview-cv?template=${template.id}&source=${source}`} 
//                 className={styles.selectButton}
//               >
//                 Select Template
//               </Link>
//             </div>
//           ))}
//         </div>

//         <button className={styles.carouselButton} aria-label="Next templates">
//           <ChevronRight size={24} />
//         </button>
//       </div>

//       <div className={styles.pagination}>
//         {templates.map((_, index) => (
//           <button
//             key={index}
//             className={`${styles.paginationDot} ${index === 0 ? styles.activeDot : ""}`}
//             aria-label={`Go to template ${index + 1}`}
//           />
//         ))}
//       </div>

//       <div className={styles.actions}>
//         <Link href={backDestination} className={styles.backButton}>
//           {backLabel}
//         </Link>
//       </div>
//     </div>
//   )
// }
// "use client"

// import Link from "next/link"
// import Image from "next/image"
// import { ChevronLeft, ChevronRight } from "lucide-react"
// import { useSearchParams } from "next/navigation"
// import { Suspense } from "react"
// import styles from "./cv-templates.module.css"

// const templates = [
//   {
//     id: "classic",
//     name: "Classic Professional",
//     image: "/placeholder.svg?height=400&width=300",
//     description: "Clean and professional design suitable for most industries",
//   },
//   {
//     id: "modern",
//     name: "Modern Creative",
//     image: "/placeholder.svg?height=400&width=300",
//     description: "Contemporary design with a creative touch",
//   },
//   {
//     id: "minimal",
//     name: "Minimal Elegant",
//     image: "/placeholder.svg?height=400&width=300",
//     description: "Simple and elegant design focusing on content",
//   },
//   {
//     id: "executive",
//     name: "Executive Premium",
//     image: "/placeholder.svg?height=400&width=300",
//     description: "Sophisticated design for senior professionals",
//   },
//   {
//     id: "tech",
//     name: "Tech Innovator",
//     image: "/placeholder.svg?height=400&width=300",
//     description: "Modern design optimized for tech professionals",
//   },
//   {
//     id: "creative",
//     name: "Creative Portfolio",
//     image: "/placeholder.svg?height=400&width=300",
//     description: "Vibrant design for creative professionals",
//   },
// ]

// function TemplatesPage() {
//   const searchParams = useSearchParams()
//   const source = searchParams.get("source") || "create" // Default to 'create' if not specified

//   // Back button destination based on source
//   const backDestination =
//     source === "upload"
//       ? "/cv-generation/create-cv"
//       : "/cv-generation/create-cv/additional"

//   // Always use "Back to Edit CV" label as per requirement
//   const backLabel = "Back to Edit CV"

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h1 className={styles.title}>Choose your preferred CV template</h1>
//         <p className={styles.subtitle}>
//           Select a professional template that best represents your personal
//           brand
//         </p>
//       </div>

//       <div className={styles.templateCarousel}>
//         <button className={styles.carouselButton} aria-label="Previous templates">
//           <ChevronLeft size={24} />
//         </button>

//         <div className={styles.templatesContainer}>
//           {templates.map((template) => (
//             <div key={template.id} className={styles.templateCard}>
//               <div className={styles.templateImageContainer}>
//                 <Image
//                   src={template.image}
//                   alt={template.name}
//                   width={300}
//                   height={400}
//                   className={styles.templateImage}
//                 />
//               </div>
//               <h3 className={styles.templateName}>{template.name}</h3>
//               <p className={styles.templateDescription}>
//                 {template.description}
//               </p>
//               <Link
//                 href={`/cv-generation/preview-cv?template=${template.id}&source=${source}`}
//                 className={styles.selectButton}
//               >
//                 Select Template
//               </Link>
//             </div>
//           ))}
//         </div>

//         <button className={styles.carouselButton} aria-label="Next templates">
//           <ChevronRight size={24} />
//         </button>
//       </div>

//       <div className={styles.pagination}>
//         {templates.map((_, index) => (
//           <button
//             key={index}
//             className={`${styles.paginationDot} ${
//               index === 0 ? styles.activeDot : ""
//             }`}
//             aria-label={`Go to template ${index + 1}`}
//           />
//         ))}
//       </div>

//       <div className={styles.actions}>
//         <Link href={backDestination} className={styles.backButton}>
//           {backLabel}
//         </Link>
//       </div>
//     </div>
//   )
// }

// // Wrap the TemplatesPage in Suspense so that client hooks are not called during SSR.
// export default function Page() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <TemplatesPage />
//     </Suspense>
//   )
// }


