"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { saveSelectedTemplate } from "@/app/actions/cv-actions"
import styles from "./cv-templates.module.css"

const templates = [
  {
    id: "classic",
    name: "Classic Professional",
    image: "/placeholder.svg?height=400&width=300",
    description: "Clean and professional design suitable for most industries",
  },
  {
    id: "modern",
    name: "Modern Creative",
    image: "/placeholder.svg?height=400&width=300",
    description: "Contemporary design with a creative touch",
  },
  {
    id: "minimal",
    name: "Minimal Elegant",
    image: "/placeholder.svg?height=400&width=300",
    description: "Simple and elegant design focusing on content",
  },
  {
    id: "executive",
    name: "Executive Premium",
    image: "/placeholder.svg?height=400&width=300",
    description: "Sophisticated design for senior professionals",
  },
  {
    id: "tech",
    name: "Tech Innovator",
    image: "/placeholder.svg?height=400&width=300",
    description: "Modern design optimized for tech professionals",
  },
  {
    id: "creative",
    name: "Creative Portfolio",
    image: "/placeholder.svg?height=400&width=300",
    description: "Vibrant design for creative professionals",
  },
]

// Component that uses useSearchParams
function TemplatesContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const source = searchParams.get("source") || "create"

  const [activeIndex, setActiveIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const backDestination = source === "upload" ? "/cv-generation/create-cv" : "/cv-generation/create-cv/additional"
  const backLabel = "Back to Edit CV"

  const handleSelectTemplate = async (templateId) => {
    setIsLoading(true)
    setError("")

    try {
      const result = await saveSelectedTemplate(templateId)

      if (result.success) {
        router.push(`/cv-generation/preview-cv?template=${templateId}&source=${source}`)
      } else {
        setError(result.error || "Failed to select template")
      }
    } catch (error) {
      console.error("Error selecting template:", error)
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? templates.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === templates.length - 1 ? 0 : prev + 1))
  }

  const handleDotClick = (index) => {
    setActiveIndex(index)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Choose your preferred CV template</h1>
        <p className={styles.subtitle}>Select a professional template that best represents your personal brand</p>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <div className={styles.templateCarousel}>
        <button className={styles.carouselButton} aria-label="Previous templates" onClick={handlePrevious}>
          <ChevronLeft size={24} />
        </button>

        <div className={styles.templatesContainer}>
          {templates.map((template) => (
            <div
              key={template.id}
              className={styles.templateCard}
              style={{ display: templates[activeIndex].id === template.id ? "flex" : "none" }}
            >
              <div className={styles.templateImageContainer}>
                <Image
                  src={template.image || "/placeholder.svg"}
                  alt={template.name}
                  width={300}
                  height={400}
                  className={styles.templateImage}
                />
              </div>
              <h3 className={styles.templateName}>{template.name}</h3>
              <p className={styles.templateDescription}>{template.description}</p>
              <button
                className={styles.selectButton}
                onClick={() => handleSelectTemplate(template.id)}
                disabled={isLoading}
              >
                {isLoading && templates[activeIndex].id === template.id ? "Selecting..." : "Select Template"}
              </button>
            </div>
          ))}
        </div>

        <button className={styles.carouselButton} aria-label="Next templates" onClick={handleNext}>
          <ChevronRight size={24} />
        </button>
      </div>

      <div className={styles.pagination}>
        {templates.map((_, index) => (
          <button
            key={index}
            className={`${styles.paginationDot} ${index === activeIndex ? styles.activeDot : ""}`}
            aria-label={`Go to template ${index + 1}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>

      <div className={styles.actions}>
        <Link href={backDestination} className={styles.backButton}>
          {backLabel}
        </Link>
      </div>
    </div>
  )
}

// Main component with Suspense boundary
export default function TemplatesPage() {
  return (
    <Suspense fallback={<div className={styles.loadingContainer}>Loading...</div>}>
      <TemplatesContent />
    </Suspense>
  )
}
