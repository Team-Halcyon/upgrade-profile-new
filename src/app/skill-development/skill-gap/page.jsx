"use client"

import { useState, useEffect } from "react"
import styles from "./page.module.css"

export default function SkillGapPage() {
  const [currentSkills, setCurrentSkills] = useState([
    { id: 1, name: "React.js", level: 75 },
    { id: 2, name: "JavaScript", level: 80 },
    { id: 3, name: "CSS/SCSS", level: 70 },
    { id: 4, name: "Node.js", level: 60 },
    { id: 5, name: "UI/UX Design", level: 45 },
  ])

  const [targetRole, setTargetRole] = useState("Frontend Developer")
  const [animate, setAnimate] = useState(false)
  const [activeTab, setActiveTab] = useState("gap")

  // Required skills for target role
  const targetSkills = {
    "Frontend Developer": [
      { name: "React.js", required: 80 },
      { name: "JavaScript", required: 85 },
      { name: "CSS/SCSS", required: 80 },
      { name: "Responsive Design", required: 90 },
      { name: "TypeScript", required: 75 },
      { name: "UI/UX Design", required: 70 },
    ],
    "Fullstack Developer": [
      { name: "React.js", required: 75 },
      { name: "JavaScript", required: 85 },
      { name: "Node.js", required: 80 },
      { name: "Database (SQL/NoSQL)", required: 80 },
      { name: "API Design", required: 75 },
      { name: "DevOps", required: 60 },
    ],
    "Data Scientist": [
      { name: "Python", required: 90 },
      { name: "Machine Learning", required: 85 },
      { name: "Data Visualization", required: 80 },
      { name: "SQL", required: 75 },
      { name: "Statistics", required: 85 },
      { name: "Big Data Technologies", required: 70 },
    ],
  }

  const coursesSuggestions = [
    {
      id: 1,
      title: "Advanced React Patterns",
      platform: "Udemy",
      duration: "12 hours",
      rating: 4.8,
      price: "$59.99",
      image: "/images/Advanced React Patterns.png",
    },
    {
      id: 2,
      title: "TypeScript for React Developers",
      platform: "Coursera",
      duration: "8 weeks",
      rating: 4.7,
      price: "$49.99/month",
      image: "/images/TypeScript for React Developers.png",
    },
    {
      id: 3,
      title: "Responsive Web Design ",
      platform: "Frontend Masters",
      duration: "15 hours",
      rating: 4.9,
      price: "$39.99",
      image: "/images/Responsive Web Design.png",
    },
  ]

  useEffect(() => {
    setAnimate(true)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={`${styles.title} ${animate ? styles.animateTitle : ""}`}>Skill Gap Analysis & Booster</h1>
          <p className={`${styles.subtitle} ${animate ? styles.animateSubtitle : ""}`}>
            Analyze your skills, identify gaps, and get personalized recommendations to boost your career
          </p>
        </div>
        <div className={`${styles.roleSelector} ${animate ? styles.animateSelector : ""}`}>
          <label htmlFor="role">Target Role:</label>
          <select
            id="role"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className={styles.select}
          >
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Fullstack Developer">Fullstack Developer</option>
            <option value="Data Scientist">Data Scientist</option>
          </select>
        </div>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${activeTab === "gap" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("gap")}
        >
          Skill Gap Analysis
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === "boost" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("boost")}
        >
          Skill Booster
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === "track" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("track")}
        >
          Progress Tracking
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === "gap" && (
          <div className={`${styles.analysisContainer} ${animate ? styles.animateContent : ""}`}>
            <div className={styles.skillsComparisonGrid}>
              {targetSkills[targetRole].map((skill, index) => {
                const userSkill = currentSkills.find((s) => s.name === skill.name) || { level: 0 }
                const gap = skill.required - userSkill.level

                return (
                  <div key={index} className={styles.skillComparisonCard}>
                    <div className={styles.skillHeader}>
                      <h3 className={styles.skillName}>{skill.name}</h3>
                      <div className={gap > 0 ? styles.gapBadge : styles.matchBadge}>
                        {gap > 0 ? `${gap}% Gap` : "Matched"}
                      </div>
                    </div>

                    <div className={styles.skillLevels}>
                      <div className={styles.skillLevelItem}>
                        <span className={styles.skillLevelLabel}>Your Level:</span>
                        <div className={styles.skillBarContainer}>
                          <div
                            className={styles.skillBar}
                            style={{ width: `${userSkill.level}%`, backgroundColor: "#0083b0" }}
                          ></div>
                          <span className={styles.skillBarLabel}>{userSkill.level}%</span>
                        </div>
                      </div>

                      <div className={styles.skillLevelItem}>
                        <span className={styles.skillLevelLabel}>Required Level:</span>
                        <div className={styles.skillBarContainer}>
                          <div
                            className={styles.skillBar}
                            style={{ width: `${skill.required}%`, backgroundColor: "#F06292" }}
                          ></div>
                          <span className={styles.skillBarLabel}>{skill.required}%</span>
                        </div>
                      </div>
                    </div>

                    {gap > 0 && (
                      <div className={styles.actionSection}>
                        <button className={styles.actionButton}>Find Courses</button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className={styles.analysisActions}>
              <button className={styles.primaryButton}>Download Full Analysis</button>
              <button className={styles.secondaryButton}>Share Results</button>
            </div>
          </div>
        )}

        {activeTab === "boost" && (
          <div className={`${styles.boosterContainer} ${animate ? styles.animateContent : ""}`}>
            <div className={styles.recommendationsHeader}>
              <h2 className={styles.recommendationsTitle}>Recommended Learning Paths</h2>
              <p className={styles.recommendationsSubtitle}>
                Based on your skill gaps, we've curated these learning paths to help you reach your career goals
              </p>
            </div>

            <div className={styles.coursesList}>
              {coursesSuggestions.map((course) => (
                <div key={course.id} className={styles.courseCard}>
                  <div className={styles.courseImageContainer}>
                    <img src={course.image || "/placeholder.svg"} alt={course.title} className={styles.courseImage} />
                    <div className={styles.coursePlatform}>{course.platform}</div>
                  </div>

                  <div className={styles.courseContent}>
                    <h3 className={styles.courseTitle}>{course.title}</h3>

                    <div className={styles.courseDetails}>
                      <div className={styles.courseDetail}>
                        <span className={styles.detailIcon}>⏱️</span>
                        <span>{course.duration}</span>
                      </div>
                      <div className={styles.courseDetail}>
                        <span className={styles.detailIcon}>⭐</span>
                        <span>{course.rating}</span>
                      </div>
                      <div className={styles.courseDetail}>
                        <span className={styles.detailIcon}>💰</span>
                        <span>{course.price}</span>
                      </div>
                    </div>

                    <div className={styles.courseActions}>
                      <button className={styles.enrollButton}>Enroll Now</button>
                      <button className={styles.saveButton}>Save</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.customizedPathSection}>
              <h2 className={styles.customizedPathTitle}>Get a Customized Learning Path</h2>
              <p className={styles.customizedPathText}>
                Our AI can create a personalized learning journey based on your current skills, target role, and
                available time for learning.
              </p>
              <button className={styles.customizeButton}>Create My Path</button>
            </div>
          </div>
        )}

        {activeTab === "track" && (
          <div className={`${styles.trackingContainer} ${animate ? styles.animateContent : ""}`}>
            <div className={styles.progressHeader}>
              <h2 className={styles.progressTitle}>Your Learning Journey</h2>
              <p className={styles.progressSubtitle}>Track your skill development progress over time</p>
            </div>

            <div className={styles.progressChart}>
              <div className={styles.chartPlaceholder}>
                {/* This would be a real chart in production */}
                <div className={styles.chartInfo}>
                  <div className={styles.chartValue}>+27%</div>
                  <div className={styles.chartLabel}>Skill improvement in the last 3 months</div>
                </div>
              </div>
            </div>

            <div className={styles.achievementsSection}>
              <h3 className={styles.achievementsTitle}>Recent Achievements</h3>

              <div className={styles.achievements}>
                <div className={styles.achievementCard}>
                  <div className={styles.achievementIcon}>🏆</div>
                  <div className={styles.achievementContent}>
                    <h4 className={styles.achievementTitle}>React Advanced Certificate</h4>
                    <p className={styles.achievementDate}>Completed on May 15, 2023</p>
                  </div>
                </div>

                <div className={styles.achievementCard}>
                  <div className={styles.achievementIcon}>📊</div>
                  <div className={styles.achievementContent}>
                    <h4 className={styles.achievementTitle}>30-Day Coding Challenge</h4>
                    <p className={styles.achievementDate}>Completed on April 20, 2023</p>
                  </div>
                </div>

                <div className={styles.achievementCard}>
                  <div className={styles.achievementIcon}>🎯</div>
                  <div className={styles.achievementContent}>
                    <h4 className={styles.achievementTitle}>TypeScript Fundamentals</h4>
                    <p className={styles.achievementDate}>Completed on March 5, 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

