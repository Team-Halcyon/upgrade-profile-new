"use client"

import styles from "./templates.module.css"
import { FormattedText } from "@/lib/text-formatter"

export default function MinimalTemplate({ data }) {
  const { personalInfo, summary, experience, education, skills, languages, certifications, projects } = data

  return (
    <div className={styles.minimalTemplate}>
      <header className={styles.minimalHeader}>
        <h1 className={styles.minimalName}>{personalInfo.fullName}</h1>
        <p className={styles.minimalJobTitle}>{personalInfo.jobTitle}</p>
        
        <div className={styles.minimalContactInfo}>
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
          {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
          {personalInfo.website && <div>{personalInfo.website}</div>}
          {personalInfo.github && <div>{personalInfo.github}</div>}
        </div>
      </header>

      {summary && (
        <section className={styles.section}>
          <h2 className={styles.minimalSectionTitle}>Summary</h2>
          <div className={styles.minimalDivider}></div>
          <FormattedText text={summary} className={styles.summary} />
        </section>
      )}

      {experience && experience.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.minimalSectionTitle}>Experience</h2>
          <div className={styles.minimalDivider}></div>
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
              <FormattedText 
                text={exp.description} 
                className={styles.experienceDescription} 
              />
            </div>
          ))}
        </section>
      )}

      {education && education.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.minimalSectionTitle}>Education</h2>
          <div className={styles.minimalDivider}></div>
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
                <FormattedText 
                  text={edu.description} 
                  className={styles.educationDescription} 
                />
              )}
            </div>
          ))}
        </section>
      )}

      {skills && skills.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.minimalSectionTitle}>Skills</h2>
          <div className={styles.minimalDivider}></div>
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
          <h2 className={styles.minimalSectionTitle}>Languages</h2>
          <div className={styles.minimalDivider}></div>
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
          <h2 className={styles.minimalSectionTitle}>Certifications</h2>
          <div className={styles.minimalDivider}></div>
          {certifications.map((cert, index) => (
            <div key={index} className={styles.certificationItem}>
              <div className={styles.certificationName}>{cert.name}</div>
              <div className={styles.certificationIssuer}>{cert.issuer}</div>
              <div className={styles.certificationDate}>{cert.date}</div>
            </div>
          ))}
        </section>
      )}

      {projects && projects.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.minimalSectionTitle}>Projects</h2>
          <div className={styles.minimalDivider}></div>
          {projects.map((project, index) => (
            <div key={index} className={styles.projectItem}>
              <h3 className={styles.projectName}>{project.name}</h3>
              <FormattedText 
                text={project.description} 
                className={styles.projectDescription} 
              />
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
  )
}