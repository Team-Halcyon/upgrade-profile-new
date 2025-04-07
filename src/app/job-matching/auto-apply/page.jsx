"use client"

import styles from "./auto-apply.module.css"
import { useState } from 'react'

export default function AutoApplyPage() {
  // State for form controls
  const [jobTypes, setJobTypes] = useState({
    fullTime: true,
    partTime: false,
    contract: false,
    remote: true
  });

  const [jobPlatforms, setJobPlatforms] = useState({
    linkedin: true,
    indeed: true,
    glassdoor: false,
    monster: false
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true
  });

  const [matchScore, setMatchScore] = useState(80);

  // Handlers for form controls
  const handleJobTypeChange = (e) => {
    const { id, checked } = e.target;
    setJobTypes({
      ...jobTypes,
      [id.replace('-', '')]: checked
    });
  };

  const handlePlatformChange = (e) => {
    const { id, checked } = e.target;
    setJobPlatforms({
      ...jobPlatforms,
      [id]: checked
    });
  };

  const handleNotificationChange = (e) => {
    const { id, checked } = e.target;
    setNotifications({
      ...notifications,
      [id.split('-')[0]]: checked
    });
  };

  const handleMatchScoreChange = (e) => {
    setMatchScore(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Auto-Apply</h1>
        <p className={styles.subtitle}>Let AI apply to jobs that match your profile automatically</p>
      </div>

      <div className={styles.content}>
        <div className={styles.settingsCard}>
          <h2 className={styles.cardTitle}>Auto-Apply Settings</h2>

          <div className={styles.settingSection}>
            <h3 className={styles.sectionTitle}>Job Preferences</h3>

            <div className={styles.formGroup}>
              <label className={styles.label}>Job Titles</label>
              <input
                type="text"
                className={styles.input}
                placeholder="e.g., Frontend Developer, UI Designer"
                defaultValue="Frontend Developer, React Developer, UI Engineer"
              />
              <p className={styles.hint}>Separate multiple titles with commas</p>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Locations</label>
              <input
                type="text"
                className={styles.input}
                placeholder="e.g., San Francisco, Remote"
                defaultValue="Remote, San Francisco, New York"
              />
              <p className={styles.hint}>Separate multiple locations with commas</p>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Minimum Salary</label>
              <input type="number" className={styles.input} placeholder="e.g., 80000" defaultValue="90000" />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Job Types</label>
              <div className={styles.checkboxGroup}>
                <div className={styles.checkbox}>
                  <input 
                    type="checkbox" 
                    id="full-time" 
                    checked={jobTypes.fullTime} 
                    onChange={handleJobTypeChange} 
                  />
                  <label htmlFor="full-time">Full-Time</label>
                </div>
                <div className={styles.checkbox}>
                  <input 
                    type="checkbox" 
                    id="part-time" 
                    checked={jobTypes.partTime} 
                    onChange={handleJobTypeChange} 
                  />
                  <label htmlFor="part-time">Part-Time</label>
                </div>
                <div className={styles.checkbox}>
                  <input 
                    type="checkbox" 
                    id="contract" 
                    checked={jobTypes.contract} 
                    onChange={handleJobTypeChange} 
                  />
                  <label htmlFor="contract">Contract</label>
                </div>
                <div className={styles.checkbox}>
                  <input 
                    type="checkbox" 
                    id="remote" 
                    checked={jobTypes.remote} 
                    onChange={handleJobTypeChange} 
                  />
                  <label htmlFor="remote">Remote</label>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.settingSection}>
            <h3 className={styles.sectionTitle}>Auto-Apply Criteria</h3>

            <div className={styles.formGroup}>
              <label className={styles.label}>Minimum Match Score</label>
              <div className={styles.rangeContainer}>
                <input 
                  type="range" 
                  min="50" 
                  max="100" 
                  value={matchScore} 
                  onChange={handleMatchScoreChange} 
                  className={styles.rangeInput} 
                />
                <div className={styles.rangeValue}>{matchScore}%</div>
              </div>
              <p className={styles.hint}>Only apply to jobs with this match score or higher</p>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Maximum Applications Per Day</label>
              <select className={styles.select} defaultValue="10">
                <option value="5">5 applications</option>
                <option value="10">10 applications</option>
                <option value="15">15 applications</option>
                <option value="20">20 applications</option>
                <option value="25">25 applications</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Job Platforms</label>
              <div className={styles.checkboxGroup}>
                <div className={styles.checkbox}>
                  <input 
                    type="checkbox" 
                    id="linkedin" 
                    checked={jobPlatforms.linkedin} 
                    onChange={handlePlatformChange} 
                  />
                  <label htmlFor="linkedin">LinkedIn</label>
                </div>
                <div className={styles.checkbox}>
                  <input 
                    type="checkbox" 
                    id="indeed" 
                    checked={jobPlatforms.indeed} 
                    onChange={handlePlatformChange} 
                  />
                  <label htmlFor="indeed">Indeed</label>
                </div>
                <div className={styles.checkbox}>
                  <input 
                    type="checkbox" 
                    id="glassdoor" 
                    checked={jobPlatforms.glassdoor} 
                    onChange={handlePlatformChange} 
                  />
                  <label htmlFor="glassdoor">Glassdoor</label>
                </div>
                <div className={styles.checkbox}>
                  <input 
                    type="checkbox" 
                    id="monster" 
                    checked={jobPlatforms.monster} 
                    onChange={handlePlatformChange} 
                  />
                  <label htmlFor="monster">Monster</label>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.settingSection}>
            <h3 className={styles.sectionTitle}>Notification Settings</h3>

            <div className={styles.formGroup}>
              <label className={styles.label}>Email Notifications</label>
              <div className={styles.toggle}>
                <input 
                  type="checkbox" 
                  id="email-toggle" 
                  className={styles.toggleInput} 
                  checked={notifications.email} 
                  onChange={handleNotificationChange} 
                />
                <label htmlFor="email-toggle" className={styles.toggleLabel}></label>
              </div>
              <p className={styles.hint}>Receive email notifications for new applications</p>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Push Notifications</label>
              <div className={styles.toggle}>
                <input 
                  type="checkbox" 
                  id="push-toggle" 
                  className={styles.toggleInput} 
                  checked={notifications.push} 
                  onChange={handleNotificationChange} 
                />
                <label htmlFor="push-toggle" className={styles.toggleLabel}></label>
              </div>
              <p className={styles.hint}>Receive push notifications for new applications</p>
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.saveButton}>Save Settings</button>
            <button className={styles.activateButton}>Activate Auto-Apply</button>
          </div>
        </div>

        <div className={styles.statsCard}>
          <h2 className={styles.cardTitle}>Auto-Apply Statistics</h2>

          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statValue}>24</div>
              <div className={styles.statLabel}>Total Applications</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>5</div>
              <div className={styles.statLabel}>Interviews</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>85%</div>
              <div className={styles.statLabel}>Avg. Match Score</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>3</div>
              <div className={styles.statLabel}>Today's Applications</div>
            </div>
          </div>

          <div className={styles.recentActivity}>
            <h3 className={styles.activityTitle}>Recent Activity</h3>

            <div className={styles.activityList}>
              <div className={styles.activityItem}>
                <div className={styles.activityIcon}>✓</div>
                <div className={styles.activityContent}>
                  <div className={styles.activityTitle}>Applied to Frontend Developer at Tech Solutions</div>
                  <div className={styles.activityTime}>2 hours ago</div>
                </div>
              </div>

              <div className={styles.activityItem}>
                <div className={styles.activityIcon}>✓</div>
                <div className={styles.activityContent}>
                  <div className={styles.activityTitle}>Applied to React Developer at WebFlow Inc</div>
                  <div className={styles.activityTime}>5 hours ago</div>
                </div>
              </div>

              <div className={styles.activityItem}>
                <div className={styles.activityIcon}>✓</div>
                <div className={styles.activityContent}>
                  <div className={styles.activityTitle}>Applied to UI Engineer at Creative Labs</div>
                  <div className={styles.activityTime}>Yesterday</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

