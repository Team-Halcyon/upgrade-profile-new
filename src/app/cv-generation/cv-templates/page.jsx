"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
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

export default function TemplatesPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Choose your preferred CV template</h1>
        <p className={styles.subtitle}>Select a professional template that best represents your personal brand</p>
      </div>

      <div className={styles.templateCarousel}>
        <button className={styles.carouselButton} aria-label="Previous templates">
          <ChevronLeft size={24} />
        </button>

        <div className={styles.templatesContainer}>
          {templates.map((template) => (
            <div key={template.id} className={styles.templateCard}>
              <div className={styles.templateImageContainer}>
                <Image
                  src={template.image}
                  alt={template.name}
                  width={300}
                  height={400}
                  className={styles.templateImage}
                />
              </div>
              <h3 className={styles.templateName}>{template.name}</h3>
              <p className={styles.templateDescription}>{template.description}</p>
              <Link href={`/cv-generation/editor?template=${template.id}`} className={styles.selectButton}>
                Select Template
              </Link>
            </div>
          ))}
        </div>

        <button className={styles.carouselButton} aria-label="Next templates">
          <ChevronRight size={24} />
        </button>
      </div>

      <div className={styles.pagination}>
        {templates.map((_, index) => (
          <button
            key={index}
            className={`${styles.paginationDot} ${index === 0 ? styles.activeDot : ""}`}
            aria-label={`Go to template ${index + 1}`}
          />
        ))}
      </div>

      <div className={styles.actions}>
        <Link href="/cv-generation" className={styles.backButton}>
          Back to Options
        </Link>
      </div>
    </div>
  )
}
