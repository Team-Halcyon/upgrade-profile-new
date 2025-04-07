"use client"

import { useState, useEffect } from "react"
import styles from "./page.module.css"

export default function MentoringPage() {
  const [animate, setAnimate] = useState(false)
  const [activeTab, setActiveTab] = useState("find")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterAvailability, setFilterAvailability] = useState(false)
  const [filterNewMentors, setFilterNewMentors] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState("All Skills")

  const mentors = [
    {
      id: 1,
      name: "Dr. Sarah Lee",
      title: "Expert in AI",
      image: "/placeholder.svg?height=200&width=200",
      skills: ["AI", "Machine Learning", "Python"],
      availability: "Available for chat",
      isNew: false,
    },
    {
      id: 2,
      name: "James Carter",
      title: "Marketing Guru",
      image: "/placeholder.svg?height=200&width=200",
      skills: ["Digital Marketing", "SEO", "Content Strategy"],
      availability: "Available for call",
      isNew: true,
    },
    {
      id: 3,
      name: "Emily Stone",
      title: "Startup Advisor",
      image: "/placeholder.svg?height=200&width=200",
      skills: ["Business Development", "Fundraising"],
      availability: "Available for chat",
      isNew: false,
    },
    {
      id: 4,
      name: "Michael Brown",
      title: "Software Engineer",
      image: "/placeholder.svg?height=200&width=200",
      skills: ["JavaScript", "React", "Node.js"],
      availability: "Available for call",
      isNew: false,
    },
    {
      id: 5,
      name: "Linda Green",
      title: "Career Coach",
      image: "/placeholder.svg?height=200&width=200",
      skills: ["Interview Prep", "Career Transition"],
      availability: "Available for chat",
      isNew: false,
    },
    {
      id: 6,
      name: "Robert King",
      title: "Data Scientist",
      image: "/placeholder.svg?height=200&width=200",
      skills: ["Data Analysis", "Python", "Machine Learning"],
      availability: "Available for call",
      isNew: true,
    },
  ]

  const sessions = []

  const skills = [
    "All Skills",
    "AI",
    "Machine Learning",
    "Python",
    "JavaScript",
    "React",
    "Node.js",
    "Digital Marketing",
    "Career Development",
  ]

  useEffect(() => {
    setAnimate(true)
  }, [])

  const filteredMentors = mentors.filter((mentor) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

    // Availability filter
    const matchesAvailability = !filterAvailability || mentor.availability.includes("Available")

    // New mentors filter
    const matchesNewMentors = !filterNewMentors || mentor.isNew

    // Skills filter
    const matchesSkill = selectedSkill === "All Skills" || mentor.skills.includes(selectedSkill)

    return matchesSearch && matchesAvailability && matchesNewMentors && matchesSkill
  })

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={`${styles.title} ${animate ? styles.animateTitle : ""}`}>Find a Mentor</h1>
        <p className={`${styles.subtitle} ${animate ? styles.animateSubtitle : ""}`}>
          Connect with industry experts who can guide you through your career journey
        </p>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "find" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("find")}
        >
          Find a Mentor
        </button>
        <button
          className={`${styles.tab} ${activeTab === "sessions" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("sessions")}
        >
          My Sessions
        </button>
        <button
          className={`${styles.tab} ${activeTab === "become" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("become")}
        >
          Become a Mentor
        </button>
      </div>

      {activeTab === "find" && (
        <div className={`${styles.findMentorContent} ${animate ? styles.animateContent : ""}`}>
          <div className={styles.searchFilters}>
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search by name or skill..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className={styles.filters}>
              <div className={styles.checkboxFilter}>
                <input
                  type="checkbox"
                  id="have-meeting"
                  checked={filterAvailability}
                  onChange={() => setFilterAvailability(!filterAvailability)}
                />
                <label htmlFor="have-meeting">Available for Meeting</label>
              </div>

              <div className={styles.checkboxFilter}>
                <input
                  type="checkbox"
                  id="new-mentors"
                  checked={filterNewMentors}
                  onChange={() => setFilterNewMentors(!filterNewMentors)}
                />
                <label htmlFor="new-mentors">New Mentors</label>
              </div>

              <div className={styles.selectFilter}>
                <span className={styles.filterLabel}>Skills</span>
                <select
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className={styles.skillSelect}
                >
                  {skills.map((skill) => (
                    <option key={skill} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.selectFilter}>
                <span className={styles.filterLabel}>Availability</span>
                <select className={styles.availabilitySelect}>
                  <option>Any Time</option>
                  <option>This Week</option>
                  <option>Next Week</option>
                  <option>Custom Date</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles.mentorsGrid}>
            {filteredMentors.length > 0 ? (
              filteredMentors.map((mentor) => (
                <div key={mentor.id} className={styles.mentorCard}>
                  <div className={styles.mentorImageContainer}>
                    <img src={mentor.image || "/placeholder.svg"} alt={mentor.name} className={styles.mentorImage} />
                    {mentor.isNew && <div className={styles.newBadge}>New</div>}
                  </div>

                  <div className={styles.mentorInfo}>
                    <h3 className={styles.mentorName}>{mentor.name}</h3>
                    <p className={styles.mentorTitle}>{mentor.title}</p>

                    <div className={styles.mentorSkills}>
                      {mentor.skills.map((skill, index) => (
                        <span key={index} className={styles.skillTag}>
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className={styles.mentorAvailability}>{mentor.availability}</div>
                  </div>

                  <button className={styles.connectButton}>Connect</button>
                </div>
              ))
            ) : (
              <div className={styles.noResults}>
                <div className={styles.noResultsIcon}>🔍</div>
                <h3 className={styles.noResultsTitle}>No mentors found</h3>
                <p className={styles.noResultsText}>Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "sessions" && (
        <div className={`${styles.sessionsContent} ${animate ? styles.animateContent : ""}`}>
          {sessions.length > 0 ? (
            <div className={styles.sessionsList}>{/* Sessions would be listed here */}</div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📅</div>
              <h3 className={styles.emptyTitle}>No upcoming sessions</h3>
              <p className={styles.emptyText}>Connect with a mentor to schedule your first session</p>
              <button className={styles.findMentorButton} onClick={() => setActiveTab("find")}>
                Find a Mentor
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === "become" && (
        <div className={`${styles.becomeContent} ${animate ? styles.animateContent : ""}`}>
          <div className={styles.becomeCard}>
            <h2 className={styles.becomeTitle}>Share Your Expertise</h2>
            <p className={styles.becomeText}>
              Help others grow in their careers by sharing your knowledge and experience. Becoming a mentor is rewarding
              and helps you build your professional network.
            </p>

            <div className={styles.benefitsList}>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>💼</div>
                <div className={styles.benefitContent}>
                  <h3 className={styles.benefitTitle}>Enhance Your Professional Profile</h3>
                  <p className={styles.benefitText}>
                    Mentoring demonstrates leadership and strengthens your expertise.
                  </p>
                </div>
              </div>

              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>🤝</div>
                <div className={styles.benefitContent}>
                  <h3 className={styles.benefitTitle}>Build Your Network</h3>
                  <p className={styles.benefitText}>Connect with motivated professionals in your industry.</p>
                </div>
              </div>

              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>📈</div>
                <div className={styles.benefitContent}>
                  <h3 className={styles.benefitTitle}>Earn Extra Income</h3>
                  <p className={styles.benefitText}>Set your own rates and schedule for mentoring sessions.</p>
                </div>
              </div>
            </div>

            <button className={styles.applyButton}>Apply to Become a Mentor</button>
          </div>
        </div>
      )}

      <div className={`${styles.testimonials} ${animate ? styles.animateTestimonials : ""}`}>
        <h2 className={styles.testimonialsTitle}>Success Stories</h2>

        <div className={styles.testimonialsList}>
          <div className={styles.testimonialCard}>
            <div className={styles.testimonialContent}>
              <p className={styles.testimonialText}>
                "My mentor helped me transition from marketing to UX design. Their guidance on building a portfolio and
                preparing for interviews was invaluable."
              </p>
            </div>
            <div className={styles.testimonialAuthor}>
              <div className={styles.testimonialAvatar}></div>
              <div className={styles.testimonialInfo}>
                <div className={styles.testimonialName}>Alex Johnson</div>
                <div className={styles.testimonialRole}>UX Designer at TechCorp</div>
              </div>
            </div>
          </div>

          <div className={styles.testimonialCard}>
            <div className={styles.testimonialContent}>
              <p className={styles.testimonialText}>
                "I had weekly sessions with my mentor for 3 months. They helped me refine my leadership skills and
                prepare for a management role."
              </p>
            </div>
            <div className={styles.testimonialAuthor}>
              <div className={styles.testimonialAvatar}></div>
              <div className={styles.testimonialInfo}>
                <div className={styles.testimonialName}>Maria Garcia</div>
                <div className={styles.testimonialRole}>Product Manager at StartUp Inc</div>
              </div>
            </div>
          </div>

          <div className={styles.testimonialCard}>
            <div className={styles.testimonialContent}>
              <p className={styles.testimonialText}>
                "The technical guidance I received helped me accelerate my learning in AI and machine learning. I'm now
                confident in my skills."
              </p>
            </div>
            <div className={styles.testimonialAuthor}>
              <div className={styles.testimonialAvatar}></div>
              <div className={styles.testimonialInfo}>
                <div className={styles.testimonialName}>David Chen</div>
                <div className={styles.testimonialRole}>AI Engineer at DataAI</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

