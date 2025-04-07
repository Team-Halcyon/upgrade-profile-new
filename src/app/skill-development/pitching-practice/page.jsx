"use client"

import { useState, useEffect } from "react"
import styles from "./page.module.css"

export default function PitchingPracticePage() {
  const [animate, setAnimate] = useState(false)
  const [activeTab, setActiveTab] = useState("elevator")
  const [isRecording, setIsRecording] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  const pitchTemplates = [
    {
      id: 1,
      type: "elevator",
      title: "Job Interview Elevator",
      description: "A concise 30-second introduction for job interviews that highlights your skills and experience.",
      structure: [
        "Brief introduction with your name and professional title",
        "Your background and relevant experience",
        "Key accomplishments and skills",
        "Why you're interested in the company/position",
        "Your unique value proposition",
      ],
    },
    {
      id: 2,
      type: "elevator",
      title: "Networking Event Pitch",
      description: "A friendly pitch for professional networking events to make memorable connections.",
      structure: [
        "Engaging introduction with your name and what you do",
        "Brief description of your work or expertise",
        "Recent project or achievement",
        "What you're looking for or offering",
        "Question to engage the other person",
      ],
    },
    {
      id: 3,
      type: "presentation",
      title: "Project Presentation",
      description: "A structured 5-minute pitch to present your project or work to stakeholders.",
      structure: [
        "Introduction to the project and its purpose",
        "Problem statement and why it matters",
        "Your solution and approach",
        "Results and benefits",
        "Next steps or call to action",
      ],
    },
    {
      id: 4,
      type: "presentation",
      title: "Product Pitch",
      description: "A compelling pitch to showcase a product, service, or startup idea.",
      structure: [
        "Hook to grab attention",
        "Problem your product solves",
        "Solution your product provides",
        "Market opportunity and target audience",
        "Why your solution is unique",
        "Business model and growth potential",
        "Call to action",
      ],
    },
  ]

  const feedbackExamples = [
    {
      id: 1,
      date: "May 20, 2023",
      title: "Job Interview Elevator Pitch",
      rating: 8.5,
      strengths: ["Clear articulation of experience", "Confident delivery", "Good eye contact"],
      improvements: ["Could be more concise", "Add more specificity to achievements", "Improve body language"],
    },
    {
      id: 2,
      date: "May 15, 2023",
      title: "Product Pitch",
      rating: 7.8,
      strengths: ["Engaging introduction", "Clear value proposition", "Well-structured"],
      improvements: ["Speak more slowly", "Add more data to support claims", "Improve closing statement"],
    },
  ]

  useEffect(() => {
    setAnimate(true)
  }, [])

  const startRecording = () => {
    setIsRecording(true)

    // Simulate a recording session that ends after 30 seconds
    setTimeout(() => {
      setIsRecording(false)
    }, 30000)
  }

  const stopRecording = () => {
    setIsRecording(false)
  }

  const selectTemplate = (template) => {
    setSelectedTemplate(template)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={`${styles.title} ${animate ? styles.animateTitle : ""}`}>Pitching Practice</h1>
        <p className={`${styles.subtitle} ${animate ? styles.animateSubtitle : ""}`}>
          Master the art of persuasive communication through structured practice and AI feedback
        </p>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "elevator" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("elevator")}
        >
          Elevator Pitch
        </button>
        <button
          className={`${styles.tab} ${activeTab === "presentation" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("presentation")}
        >
          Presentation Pitch
        </button>
        <button
          className={`${styles.tab} ${activeTab === "feedback" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("feedback")}
        >
          My Feedback
        </button>
      </div>

      <div className={styles.content}>
        {(activeTab === "elevator" || activeTab === "presentation") && !selectedTemplate && (
          <div className={`${styles.templatesGrid} ${animate ? styles.animateContent : ""}`}>
            {pitchTemplates
              .filter((template) => template.type === activeTab)
              .map((template) => (
                <div key={template.id} className={styles.templateCard} onClick={() => selectTemplate(template)}>
                  <h2 className={styles.templateTitle}>{template.title}</h2>
                  <p className={styles.templateDescription}>{template.description}</p>
                  <button className={styles.useTemplateButton}>Use This Template</button>
                </div>
              ))}
          </div>
        )}

        {selectedTemplate && (
          <div className={`${styles.pitchPractice} ${animate ? styles.animateContent : ""}`}>
            <div className={styles.practiceHeader}>
              <button className={styles.backButton} onClick={() => setSelectedTemplate(null)}>
                ← Back to Templates
              </button>
              <h2 className={styles.practiceTitle}>{selectedTemplate.title}</h2>
            </div>

            <div className={styles.pitchStructure}>
              <h3 className={styles.structureTitle}>Pitch Structure</h3>
              <ol className={styles.structureList}>
                {selectedTemplate.structure.map((item, index) => (
                  <li key={index} className={styles.structureItem}>
                    {item}
                  </li>
                ))}
              </ol>
            </div>

            <div className={styles.recordingSection}>
              <div className={styles.videoPreview}>
                {isRecording ? (
                  <div className={styles.liveRecording}>
                    <div className={styles.recordingIndicator}>
                      <div className={styles.recordingDot}></div>
                      <span>Recording...</span>
                    </div>
                    {/* This would be a real video preview in production */}
                    <div className={styles.videoPlaceholder}>
                      <div className={styles.videoIcon}>
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
                          <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
                          <path d="M21 8v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
                          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                      </div>
                      <div className={styles.videoText}>Camera Preview</div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.startRecordingPrompt}>
                    <div className={styles.promptIcon}>
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
                        <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
                        <path d="M21 8v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                      </svg>
                    </div>
                    <div className={styles.promptText}>
                      Ready to start your pitch? Click the button below to begin recording.
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.recordingControls}>
                {!isRecording ? (
                  <button className={styles.startRecordingButton} onClick={startRecording}>
                    Start Recording
                  </button>
                ) : (
                  <button className={styles.stopRecordingButton} onClick={stopRecording}>
                    Stop Recording
                  </button>
                )}
              </div>
            </div>

            <div className={styles.pitchTips}>
              <h3 className={styles.tipsTitle}>
                Tips for a Great {selectedTemplate.type === "elevator" ? "Elevator Pitch" : "Presentation"}
              </h3>
              <div className={styles.tipsList}>
                <div className={styles.tipItem}>
                  <div className={styles.tipIcon}>📊</div>
                  <div className={styles.tipContent}>
                    <h4 className={styles.tipHeading}>Structure is Key</h4>
                    <p className={styles.tipText}>
                      Follow the structure but make it flow naturally. Practice transitions between points.
                    </p>
                  </div>
                </div>
                <div className={styles.tipItem}>
                  <div className={styles.tipIcon}>⏱️</div>
                  <div className={styles.tipContent}>
                    <h4 className={styles.tipHeading}>Time Yourself</h4>
                    <p className={styles.tipText}>
                      Keep your elevator pitch under 60 seconds. Be concise and impactful.
                    </p>
                  </div>
                </div>
                <div className={styles.tipItem}>
                  <div className={styles.tipIcon}>🎭</div>
                  <div className={styles.tipContent}>
                    <h4 className={styles.tipHeading}>Body Language</h4>
                    <p className={styles.tipText}>
                      Maintain eye contact, use open gestures, and control your pace and volume.
                    </p>
                  </div>
                </div>
                <div className={styles.tipItem}>
                  <div className={styles.tipIcon}>🎯</div>
                  <div className={styles.tipContent}>
                    <h4 className={styles.tipHeading}>Know Your Audience</h4>
                    <p className={styles.tipText}>
                      Tailor your pitch to resonate with the specific audience you're addressing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "feedback" && (
          <div className={`${styles.feedbackHistory} ${animate ? styles.animateContent : ""}`}>
            <h2 className={styles.feedbackTitle}>Your Pitch Feedback History</h2>

            {feedbackExamples.length > 0 ? (
              <div className={styles.feedbackList}>
                {feedbackExamples.map((feedback) => (
                  <div key={feedback.id} className={styles.feedbackCard}>
                    <div className={styles.feedbackHeader}>
                      <div className={styles.feedbackInfo}>
                        <h3 className={styles.feedbackName}>{feedback.title}</h3>
                        <p className={styles.feedbackDate}>{feedback.date}</p>
                      </div>
                      <div className={styles.feedbackRating}>
                        <span className={styles.ratingValue}>{feedback.rating}</span>
                        <span className={styles.ratingMax}>/10</span>
                      </div>
                    </div>

                    <div className={styles.feedbackDetails}>
                      <div className={styles.feedbackColumn}>
                        <h4 className={styles.feedbackColumnTitle}>
                          <span className={styles.strengthIcon}>✓</span> Strengths
                        </h4>
                        <ul className={styles.feedbackPoints}>
                          {feedback.strengths.map((strength, index) => (
                            <li key={index} className={styles.feedbackPoint}>
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className={styles.feedbackColumn}>
                        <h4 className={styles.feedbackColumnTitle}>
                          <span className={styles.improvementIcon}>↗</span> Areas to Improve
                        </h4>
                        <ul className={styles.feedbackPoints}>
                          {feedback.improvements.map((improvement, index) => (
                            <li key={index} className={styles.feedbackPoint}>
                              {improvement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className={styles.feedbackActions}>
                      <button className={styles.watchButton}>Watch Recording</button>
                      <button className={styles.practiceButton}>Practice Again</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📊</div>
                <h3 className={styles.emptyTitle}>No feedback history yet</h3>
                <p className={styles.emptyText}>Practice your pitches to receive AI-powered feedback</p>
                <button className={styles.startPracticeButton} onClick={() => setActiveTab("elevator")}>
                  Start Practicing
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

