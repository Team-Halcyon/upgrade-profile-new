"use client"

import styles from "./JobFilters.module.css"
import { useState } from 'react'

export default function JobFilters() {
  // State to manage checkbox values
  const [jobTypeFilters, setJobTypeFilters] = useState({
    anyType: true,
    fullTime: true,
    partTime: true,
    internship: true
  })
  
  const [experienceLevelFilters, setExperienceLevelFilters] = useState({
    entry: false,
    mid: false,
    senior: false
  })
  
  // Handlers for checkbox changes
  const handleJobTypeChange = (e) => {
    const { id, checked } = e.target
    setJobTypeFilters({
      ...jobTypeFilters,
      [id.replace('-', '')]: checked
    })
  }
  
  const handleExperienceLevelChange = (e) => {
    const { id, checked } = e.target
    setExperienceLevelFilters({
      ...experienceLevelFilters,
      [id]: checked
    })
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Filters</h2>

      <div className={styles.filterSection}>
        <h3 className={styles.sectionTitle}>Location</h3>
        <input type="text" placeholder="Province/District/City" className={styles.input} />
        <button className={styles.filterButton}>Filter</button>
      </div>

      <div className={styles.filterSection}>
        <h3 className={styles.sectionTitle}>Sort by</h3>
        <select className={styles.select}>
          <option value="relevance">Relevance</option>
          <option value="date">Date Posted</option>
          <option value="salary">Salary (High to Low)</option>
          <option value="match">Match Score</option>
        </select>
      </div>

      <div className={styles.filterSection}>
        <h3 className={styles.sectionTitle}>Job Type</h3>
        <div className={styles.checkboxGroup}>
          <div className={styles.checkboxItem}>
            <input 
              type="checkbox" 
              id="any-type" 
              checked={jobTypeFilters.anyType}
              onChange={handleJobTypeChange} 
            />
            <label htmlFor="any-type">Any Type</label>
          </div>
          <div className={styles.checkboxItem}>
            <input 
              type="checkbox" 
              id="full-time" 
              checked={jobTypeFilters.fullTime}
              onChange={handleJobTypeChange} 
            />
            <label htmlFor="full-time">Full-Time</label>
          </div>
          <div className={styles.checkboxItem}>
            <input 
              type="checkbox" 
              id="part-time" 
              checked={jobTypeFilters.partTime}
              onChange={handleJobTypeChange} 
            />
            <label htmlFor="part-time">Part-Time</label>
          </div>
          <div className={styles.checkboxItem}>
            <input 
              type="checkbox" 
              id="internship" 
              checked={jobTypeFilters.internship}
              onChange={handleJobTypeChange} 
            />
            <label htmlFor="internship">Internship</label>
          </div>
        </div>
      </div>

      <div className={styles.filterSection}>
        <h3 className={styles.sectionTitle}>Experience Level</h3>
        <div className={styles.checkboxGroup}>
          <div className={styles.checkboxItem}>
            <input 
              type="checkbox" 
              id="entry" 
              checked={experienceLevelFilters.entry}
              onChange={handleExperienceLevelChange} 
            />
            <label htmlFor="entry">Entry Level</label>
          </div>
          <div className={styles.checkboxItem}>
            <input 
              type="checkbox" 
              id="mid" 
              checked={experienceLevelFilters.mid}
              onChange={handleExperienceLevelChange} 
            />
            <label htmlFor="mid">Mid Level</label>
          </div>
          <div className={styles.checkboxItem}>
            <input 
              type="checkbox" 
              id="senior" 
              checked={experienceLevelFilters.senior}
              onChange={handleExperienceLevelChange} 
            />
            <label htmlFor="senior">Senior Level</label>
          </div>
        </div>
      </div>

      <div className={styles.filterSection}>
        <h3 className={styles.sectionTitle}>Salary Range</h3>
        <div className={styles.rangeContainer}>
          <input type="range" min="0" max="200000" step="10000" className={styles.rangeInput} />
          <div className={styles.rangeLabels}>
            <span>$0</span>
            <span>$200K+</span>
          </div>
        </div>
      </div>

      <button className={styles.resetButton}>Reset Filters</button>
    </div>
  )
}

