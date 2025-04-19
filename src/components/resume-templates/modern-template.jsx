"use client"

import styles from "./templates.module.css"

export default function ModernTemplate({ data }) {
  const { personalInfo, summary, experience, education, skills, languages, certifications, projects } = data

  return (
    <div className={styles.modernTemplate}>
      <div className={styles.modernSidebar}>
        <section className={styles.section}>
          <h2 className={styles.modernSectionTitle}>Contact</h2>
          <div className={styles.modernContactInfo}>
            {personalInfo.email && (
              <div className={styles.modernContactItem}>
                <span>📧</span> {personalInfo.email}
              </div>
            )}
            {personalInfo.phone && (
              <div className={styles.modernContactItem}>
                <span>📱</span> {personalInfo.phone}
              </div>
            )}
            {personalInfo.location && (
              <div className={styles.modernContactItem}>
                <span>📍</span> {personalInfo.location}
              </div>
            )}
            {personalInfo.linkedin && (
              <div className={styles.modernContactItem}>
                <span>🔗</span> {personalInfo.linkedin}
              </div>
            )}
            {personalInfo.website && (
              <div className={styles.modernContactItem}>
                <span>🌐</span> {personalInfo.website}
              </div>
            )}
            {personalInfo.github && (
              <div className={styles.modernContactItem}>
                <span>💻</span> {personalInfo.github}
              </div>
            )}
          </div>
        </section>

        {skills && skills.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.modernSectionTitle}>Skills</h2>
            <div className={styles.skillsList}>
              {skills.map((skill, index) => (
                <div key={index} className={styles.skillItem}>
                  {skill}
                </div>
              ))}
            </div>
          </section>
        )}

        {languages && languages.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.modernSectionTitle}>Languages</h2>
            <div className={styles.languagesList}>
              {languages.map((lang, index) => (
                <div key={index} className={styles.languageItem}>
                  <span className={styles.languageName}>{lang.language}</span>
                  <span className={styles.languageProficiency}>{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {certifications && certifications.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.modernSectionTitle}>Certifications</h2>
            {certifications.map((cert, index) => (
              <div key={index} className={styles.certificationItem}>
                <div className={styles.certificationName}>{cert.name}</div>
                <div className={styles.certificationIssuer}>{cert.issuer}</div>
                <div className={styles.certificationDate}>{cert.date}</div>
              </div>
            ))}
          </section>
        )}
      </div>

      <div className={styles.modernMain}>
        <header className={styles.modernHeader}>
          <h1 className={styles.modernName}>{personalInfo.fullName}</h1>
          <p className={styles.modernJobTitle}>{personalInfo.jobTitle}</p>
        </header>

        {summary && (
          <section className={styles.section}>
            <h2 className={styles.modernSectionTitle}>Professional Summary</h2>
            <div className={styles.summary}>{summary}</div>
          </section>
        )}

        {experience && experience.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.modernSectionTitle}>Experience</h2>
            {experience.map((exp, index) => (
              <div key={index} className={styles.experienceItem}>
                <div className={styles.experienceHeader}>
                  <h3 className={styles.experienceTitle}>{exp.jobTitle}</h3>
                  <div className={styles.experienceCompany}>{exp.company}</div>
                  {exp.location && <div className={styles.experienceLocation}>{exp.location}</div>}
                  <div className={styles.experienceDates}>
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </div>
                </div>
                <div className={styles.experienceDescription}>
                  {exp.description.split("\n").map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {education && education.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.modernSectionTitle}>Education</h2>
            {education.map((edu, index) => (
              <div key={index} className={styles.educationItem}>
                <div className={styles.educationHeader}>
                  <h3 className={styles.educationDegree}>{edu.degree}</h3>
                  <div className={styles.educationInstitution}>{edu.institution}</div>
                  {edu.location && <div className={styles.educationLocation}>{edu.location}</div>}
                  <div className={styles.educationDates}>
                    {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                  </div>
                </div>
                {edu.description && (
                  <div className={styles.educationDescription}>
                    {edu.description.split("\n").map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {projects && projects.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.modernSectionTitle}>Projects</h2>
            {projects.map((project, index) => (
              <div key={index} className={styles.projectItem}>
                <h3 className={styles.projectName}>{project.name}</h3>
                <div className={styles.projectDescription}>{project.description}</div>
                {project.url && (
                  <div className={styles.projectUrl}>
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      {project.url}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  )
}