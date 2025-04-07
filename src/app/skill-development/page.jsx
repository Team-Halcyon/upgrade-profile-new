"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import styles from "./page.module.css"

export default function SkillDevelopmentPage() {
  const router = useRouter()
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  const navigateTo = (path) => {
    router.push(`/skill-development/${path}`)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={`${styles.title} ${animate ? styles.animateTitle : ""}`}>Skill Development Hub</h1>
        <p className={`${styles.subtitle} ${animate ? styles.animateSubtitle : ""}`}>
          Enhance your skills, boost your career, and stand out in the job market
        </p>
      </div>

      <div className={styles.cards}>
        <div
          className={`${styles.card} ${animate ? styles.animateCard : ""}`}
          style={{ animationDelay: "0.1s" }}
          onClick={() => navigateTo("skill-gap")}
        >
          <div className={styles.cardIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.2 6 3 11l3.8 1.5M20.2 6l-7.4 5.5" />
              <path d="m20.2 6-3.8 10.5M3 11l3.8 5.5M6.8 16.5l3.8 1.5" />
              <path d="M10.6 18 17 11" />
            </svg>
          </div>
          <h2 className={styles.cardTitle}>Skill Gap Analysis</h2>
          <p className={styles.cardDescription}>
            Identify and bridge the gap between your current skills and your career goals.
          </p>
          <div className={styles.cardFooter}>
            <span className={styles.cardTag}>AI-Powered</span>
            <button className={styles.cardButton}>Analyze Skills</button>
          </div>
        </div>

        <div
          className={`${styles.card} ${animate ? styles.animateCard : ""}`}
          style={{ animationDelay: "0.2s" }}
          onClick={() => navigateTo("mock-interview")}
        >
          <div className={styles.cardIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 9h8" />
              <path d="M8 13h6" />
              <path d="M18 4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3.5l-3 3v-3H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
            </svg>
          </div>
          <h2 className={styles.cardTitle}>Mock Interview</h2>
          <p className={styles.cardDescription}>
            Practice your interview skills with AI-powered simulations and get feedback.
          </p>
          <div className={styles.cardFooter}>
            <span className={styles.cardTag}>Interactive</span>
            <button className={styles.cardButton}>Start Practice</button>
          </div>
        </div>

        <div
          className={`${styles.card} ${animate ? styles.animateCard : ""}`}
          style={{ animationDelay: "0.3s" }}
          onClick={() => navigateTo("pitching-practice")}
        >
          <div className={styles.cardIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3Z" />
              <path d="M17 11a7.5 7.5 0 0 1-5 7.5 7.5 7.5 0 0 1-5-7.5" />
              <path d="M19 10v2a9 9 0 0 1-7.5 8.9" />
              <path d="M5 10v2a9 9 0 0 0 7.5 8.9" />
              <path d="M12 19v3" />
            </svg>
          </div>
          <h2 className={styles.cardTitle}>Pitching Practice</h2>
          <p className={styles.cardDescription}>
            Master the art of self-presentation and create impactful elevator pitches.
          </p>
          <div className={styles.cardFooter}>
            <span className={styles.cardTag}>Video-based</span>
            <button className={styles.cardButton}>Practice Pitch</button>
          </div>
        </div>

        <div
          className={`${styles.card} ${animate ? styles.animateCard : ""}`}
          style={{ animationDelay: "0.4s" }}
          onClick={() => navigateTo("mentoring")}
        >
          <div className={styles.cardIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v8" />
              <path d="M18.4 6.6 13.6 9" />
              <path d="m6.6 7.5 5.3-3" />
              <circle cx="12" cy="14" r="4" />
              <path d="M12 18v4" />
            </svg>
          </div>
          <h2 className={styles.cardTitle}>Mentoring</h2>
          <p className={styles.cardDescription}>
            Connect with industry experts who can guide you through your career journey.
          </p>
          <div className={styles.cardFooter}>
            <span className={styles.cardTag}>Networking</span>
            <button className={styles.cardButton}>Find Mentors</button>
          </div>
        </div>

        <div
          className={`${styles.card} ${animate ? styles.animateCard : ""}`}
          style={{ animationDelay: "0.5s" }}
          onClick={() => navigateTo("career-planning")}
        >
          <div className={styles.cardIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 17 12 22 22 17" />
              <path d="M2 12 12 17 22 12" />
              <path d="M12 2 2 7 12 12 22 7 12 2Z" />
            </svg>
          </div>
          <h2 className={styles.cardTitle}>Career Planning</h2>
          <p className={styles.cardDescription}>
            Map out your career path with AI-powered insights and strategic planning.
          </p>
          <div className={styles.cardFooter}>
            <span className={styles.cardTag}>Strategic</span>
            <button className={styles.cardButton}>Plan Career</button>
          </div>
        </div>
      </div>

      <div className={`${styles.statsContainer} ${animate ? styles.animateStats : ""}`}>
        <div className={styles.statItem}>
          <div className={styles.statValue}>85%</div>
          <div className={styles.statLabel}>Users Report Job Offers</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>12K+</div>
          <div className={styles.statLabel}>Learning Resources</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>500+</div>
          <div className={styles.statLabel}>Expert Mentors</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>93%</div>
          <div className={styles.statLabel}>Interview Success</div>
        </div>
      </div>
    </div>
  )
}

