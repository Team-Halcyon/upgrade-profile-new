"use client"

import { useState, useEffect } from "react"
import styles from "./page.module.css"

export default function CareerPlanningPage() {
  const [animate, setAnimate] = useState(false)
  const [activeStep, setActiveStep] = useState(1)
  const [showGoalForm, setShowGoalForm] = useState(false)
  const [goalTitle, setGoalTitle] = useState("")
  const [goalTimeframe, setGoalTimeframe] = useState("6 months")

  const milestones = [
    {
      id: 1,
      title: "Complete Frontend Development Bootcamp",
      date: "July 2023",
      status: "completed",
      description: "Master HTML, CSS, JavaScript, and React.js through intensive training.",
    },
    {
      id: 2,
      title: "Build 3 Portfolio Projects",
      date: "September 2023",
      status: "in-progress",
      description: "Create projects that showcase your skills and problem-solving abilities.",
    },
    {
      id: 3,
      title: "Start Job Applications",
      date: "November 2023",
      status: "upcoming",
      description: "Apply to at least 5 jobs per week and track application status.",
    },
    {
      id: 4,
      title: "Secure First Developer Role",
      date: "January 2024",
      status: "upcoming",
      description: "Land a junior frontend developer position at a tech company.",
    },
  ]

  const careerGoals = [
    {
      id: 1,
      title: "Frontend Developer at Tech Company",
      timeframe: "6 months",
      progress: 65,
      type: "short-term",
    },
    {
      id: 2,
      title: "Senior Frontend Developer",
      timeframe: "3 years",
      progress: 25,
      type: "medium-term",
    },
    {
      id: 3,
      title: "Lead UI/UX Engineer",
      timeframe: "5 years",
      progress: 10,
      type: "long-term",
    },
  ]

  const progressSteps = [
    { id: 1, title: "Assess Your Skills", icon: "📋" },
    { id: 2, title: "Set Career Goals", icon: "🎯" },
    { id: 3, title: "Create Action Plan", icon: "📝" },
    { id: 4, title: "Track Progress", icon: "📊" },
  ]

  useEffect(() => {
    setAnimate(true)
  }, [])

  const handleAddGoal = (e) => {
    e.preventDefault()
    // Would add the goal to the state in a real application
    setShowGoalForm(false)
    setGoalTitle("")
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={`${styles.title} ${animate ? styles.animateTitle : ""}`}>Career Planning</h1>
        <p className={`${styles.subtitle} ${animate ? styles.animateSubtitle : ""}`}>
          Map out your professional journey with strategic goals and actionable steps
        </p>
      </div>

      <div className={`${styles.progressTracker} ${animate ? styles.animateTracker : ""}`}>
        {progressSteps.map((step) => (
          <div
            key={step.id}
            className={`${styles.progressStep} ${activeStep >= step.id ? styles.activeStep : ""}`}
            onClick={() => setActiveStep(step.id)}
          >
            <div className={styles.stepIcon}>{step.icon}</div>
            <div className={styles.stepTitle}>{step.title}</div>
            <div className={styles.stepIndicator}></div>
          </div>
        ))}
      </div>

      <div className={styles.content}>
        {activeStep === 1 && (
          <div className={`${styles.assessmentSection} ${animate ? styles.animateContent : ""}`}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Skills Assessment</h2>
              <p className={styles.sectionSubtitle}>
                Evaluate your current skills to identify strengths and areas for improvement
              </p>
            </div>

            <div className={styles.assessmentCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Your Skill Profile</h3>
                <button className={styles.refreshButton}>Refresh</button>
              </div>

              <div className={styles.skillCategories}>
                <div className={styles.skillCategory}>
                  <h4 className={styles.categoryTitle}>Technical Skills</h4>

                  <div className={styles.skillList}>
                    <div className={styles.skillItem}>
                      <div className={styles.skillInfo}>
                        <span className={styles.skillName}>React.js</span>
                        <span className={styles.skillLevel}>Advanced</span>
                      </div>
                      <div className={styles.skillBarContainer}>
                        <div className={styles.skillBar} style={{ width: "85%" }}></div>
                      </div>
                    </div>

                    <div className={styles.skillItem}>
                      <div className={styles.skillInfo}>
                        <span className={styles.skillName}>JavaScript</span>
                        <span className={styles.skillLevel}>Advanced</span>
                      </div>
                      <div className={styles.skillBarContainer}>
                        <div className={styles.skillBar} style={{ width: "90%" }}></div>
                      </div>
                    </div>

                    <div className={styles.skillItem}>
                      <div className={styles.skillInfo}>
                        <span className={styles.skillName}>CSS/SCSS</span>
                        <span className={styles.skillLevel}>Intermediate</span>
                      </div>
                      <div className={styles.skillBarContainer}>
                        <div className={styles.skillBar} style={{ width: "75%" }}></div>
                      </div>
                    </div>

                    <div className={styles.skillItem}>
                      <div className={styles.skillInfo}>
                        <span className={styles.skillName}>Node.js</span>
                        <span className={styles.skillLevel}>Beginner</span>
                      </div>
                      <div className={styles.skillBarContainer}>
                        <div className={styles.skillBar} style={{ width: "40%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.skillCategory}>
                  <h4 className={styles.categoryTitle}>Soft Skills</h4>

                  <div className={styles.skillList}>
                    <div className={styles.skillItem}>
                      <div className={styles.skillInfo}>
                        <span className={styles.skillName}>Communication</span>
                        <span className={styles.skillLevel}>Advanced</span>
                      </div>
                      <div className={styles.skillBarContainer}>
                        <div className={styles.skillBar} style={{ width: "85%" }}></div>
                      </div>
                    </div>

                    <div className={styles.skillItem}>
                      <div className={styles.skillInfo}>
                        <span className={styles.skillName}>Teamwork</span>
                        <span className={styles.skillLevel}>Advanced</span>
                      </div>
                      <div className={styles.skillBarContainer}>
                        <div className={styles.skillBar} style={{ width: "90%" }}></div>
                      </div>
                    </div>

                    <div className={styles.skillItem}>
                      <div className={styles.skillInfo}>
                        <span className={styles.skillName}>Problem Solving</span>
                        <span className={styles.skillLevel}>Intermediate</span>
                      </div>
                      <div className={styles.skillBarContainer}>
                        <div className={styles.skillBar} style={{ width: "70%" }}></div>
                      </div>
                    </div>

                    <div className={styles.skillItem}>
                      <div className={styles.skillInfo}>
                        <span className={styles.skillName}>Leadership</span>
                        <span className={styles.skillLevel}>Intermediate</span>
                      </div>
                      <div className={styles.skillBarContainer}>
                        <div className={styles.skillBar} style={{ width: "65%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button className={styles.continueButton} onClick={() => setActiveStep(2)}>
                Continue to Goal Setting
              </button>
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div className={`${styles.goalsSection} ${animate ? styles.animateContent : ""}`}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Career Goals</h2>
              <p className={styles.sectionSubtitle}>Define your short-term and long-term professional objectives</p>
            </div>

            <div className={styles.goalsContainer}>
              <div className={styles.goalsHeader}>
                <h3 className={styles.goalsTitle}>Your Career Path</h3>
                <button className={styles.addGoalButton} onClick={() => setShowGoalForm(true)}>
                  Add New Goal
                </button>
              </div>

              {showGoalForm && (
                <div className={styles.goalForm}>
                  <h3 className={styles.formTitle}>Create New Goal</h3>

                  <form onSubmit={handleAddGoal}>
                    <div className={styles.formGroup}>
                      <label htmlFor="goal-title" className={styles.formLabel}>
                        Goal Title
                      </label>
                      <input
                        id="goal-title"
                        type="text"
                        className={styles.formInput}
                        placeholder="e.g., Become a Senior Developer"
                        value={goalTitle}
                        onChange={(e) => setGoalTitle(e.target.value)}
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="goal-timeframe" className={styles.formLabel}>
                        Timeframe
                      </label>
                      <select
                        id="goal-timeframe"
                        className={styles.formSelect}
                        value={goalTimeframe}
                        onChange={(e) => setGoalTimeframe(e.target.value)}
                      >
                        <option value="3 months">3 months</option>
                        <option value="6 months">6 months</option>
                        <option value="1 year">1 year</option>
                        <option value="3 years">3 years</option>
                        <option value="5 years">5 years</option>
                      </select>
                    </div>

                    <div className={styles.formActions}>
                      <button type="button" className={styles.cancelButton} onClick={() => setShowGoalForm(false)}>
                        Cancel
                      </button>
                      <button type="submit" className={styles.submitButton}>
                        Create Goal
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className={styles.goalsList}>
                {careerGoals.map((goal) => (
                  <div key={goal.id} className={`${styles.goalCard} ${styles[goal.type]}`}>
                    <div className={styles.goalHeader}>
                      <span className={styles.goalTimeframe}>{goal.timeframe}</span>
                      <span className={styles.goalType}>
                        {goal.type === "short-term"
                          ? "Short-term"
                          : goal.type === "medium-term"
                            ? "Medium-term"
                            : "Long-term"}
                      </span>
                    </div>

                    <h4 className={styles.goalTitle}>{goal.title}</h4>

                    <div className={styles.goalProgress}>
                      <div className={styles.progressLabel}>
                        <span>Progress</span>
                        <span>{goal.progress}%</span>
                      </div>
                      <div className={styles.progressBarContainer}>
                        <div className={styles.progressBar} style={{ width: `${goal.progress}%` }}></div>
                      </div>
                    </div>

                    <div className={styles.goalActions}>
                      <button className={styles.editButton}>Edit</button>
                      <button className={styles.detailsButton}>View Details</button>
                    </div>
                  </div>
                ))}
              </div>

              <button className={styles.continueButton} onClick={() => setActiveStep(3)}>
                Continue to Action Plan
              </button>
            </div>
          </div>
        )}

        {activeStep === 3 && (
          <div className={`${styles.planSection} ${animate ? styles.animateContent : ""}`}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Action Plan</h2>
              <p className={styles.sectionSubtitle}>
                Break down your goals into actionable steps with clear milestones
              </p>
            </div>

            <div className={styles.planContainer}>
              <div className={styles.milestonesTimeline}>
                {milestones.map((milestone, index) => (
                  <div key={milestone.id} className={`${styles.milestoneItem} ${styles[milestone.status]}`}>
                    <div className={styles.milestoneIconContainer}>
                      <div className={styles.milestoneIcon}></div>
                      {index < milestones.length - 1 && <div className={styles.milestoneLine}></div>}
                    </div>

                    <div className={styles.milestoneContent}>
                      <div className={styles.milestoneHeader}>
                        <h3 className={styles.milestoneTitle}>{milestone.title}</h3>
                        <span className={styles.milestoneDate}>{milestone.date}</span>
                      </div>
                      <p className={styles.milestoneDescription}>{milestone.description}</p>

                      {milestone.status === "in-progress" && (
                        <div className={styles.milestoneActions}>
                          <button className={styles.resourcesButton}>Resources</button>
                          <button className={styles.completeButton}>Mark Complete</button>
                        </div>
                      )}

                      {milestone.status === "upcoming" && (
                        <div className={styles.milestoneActions}>
                          <button className={styles.startButton}>Start Now</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.planActions}>
                <button className={styles.addMilestoneButton}>Add New Milestone</button>
                <button className={styles.continueButton} onClick={() => setActiveStep(4)}>
                  Continue to Progress Tracking
                </button>
              </div>
            </div>
          </div>
        )}

        {activeStep === 4 && (
          <div className={`${styles.trackingSection} ${animate ? styles.animateContent : ""}`}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Progress Tracking</h2>
              <p className={styles.sectionSubtitle}>Monitor your career advancement and celebrate achievements</p>
            </div>

            <div className={styles.trackingContainer}>
              <div className={styles.trackingOverview}>
                <div className={styles.overviewCard}>
                  <div className={styles.overviewIcon}>🎯</div>
                  <div className={styles.overviewValue}>3</div>
                  <div className={styles.overviewLabel}>Active Goals</div>
                </div>

                <div className={styles.overviewCard}>
                  <div className={styles.overviewIcon}>✅</div>
                  <div className={styles.overviewValue}>1</div>
                  <div className={styles.overviewLabel}>Completed Milestones</div>
                </div>

                <div className={styles.overviewCard}>
                  <div className={styles.overviewIcon}>⏳</div>
                  <div className={styles.overviewValue}>1</div>
                  <div className={styles.overviewLabel}>In Progress</div>
                </div>

                <div className={styles.overviewCard}>
                  <div className={styles.overviewIcon}>📅</div>
                  <div className={styles.overviewValue}>2</div>
                  <div className={styles.overviewLabel}>Upcoming</div>
                </div>
              </div>

              <div className={styles.progressChart}>
                <h3 className={styles.chartTitle}>Career Progression</h3>
                <div className={styles.chartPlaceholder}>
                  {/* This would be a real chart in production */}
                  <div className={styles.chartLabel}>Overall Career Progress</div>
                  <div className={styles.overallProgress}>
                    <div className={styles.progressLabel}>
                      <span>Short-term Goal Progress</span>
                      <span>65%</span>
                    </div>
                    <div className={styles.overallProgressBar}>
                      <div className={`${styles.progressSegment} ${styles.shortTerm}`} style={{ width: "65%" }}></div>
                    </div>
                  </div>

                  <div className={styles.overallProgress}>
                    <div className={styles.progressLabel}>
                      <span>Medium-term Goal Progress</span>
                      <span>25%</span>
                    </div>
                    <div className={styles.overallProgressBar}>
                      <div className={`${styles.progressSegment} ${styles.mediumTerm}`} style={{ width: "25%" }}></div>
                    </div>
                  </div>

                  <div className={styles.overallProgress}>
                    <div className={styles.progressLabel}>
                      <span>Long-term Goal Progress</span>
                      <span>10%</span>
                    </div>
                    <div className={styles.overallProgressBar}>
                      <div className={`${styles.progressSegment} ${styles.longTerm}`} style={{ width: "10%" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.trackingActions}>
                <button className={styles.downloadButton}>Download Report</button>
                <button className={styles.shareButton}>Share Progress</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

