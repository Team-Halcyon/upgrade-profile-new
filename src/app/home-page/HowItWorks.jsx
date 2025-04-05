
import React from 'react';
import styles from './HowItWorks.module.css';
import Link from 'next/link';

// Icons for each step
const UserIcon = () => (
  <div className={styles.icon}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  </div>
);

const ResumeIcon = () => (
  <div className={styles.icon}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  </div>
);

const SearchIcon = () => (
  <div className={styles.icon}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  </div>
);

const ChartIcon = () => (
  <div className={styles.icon}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  </div>
);

const ArrowIcon = () => (
  <div className={styles.arrow}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  </div>
);

const HowItWorks = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>How Upgrade Profile Works</h1>
        <p className={styles.subtitle}>
          Our AI-powered platform simplifies your job search in just a few easy steps
        </p>
      </div>

      <div className={styles.stepsContainer}>
        {/* Step 1 */}
        <div className={styles.step}>
          <div className={styles.stepNumber}>1</div>
          <UserIcon />
          <h2 className={styles.stepTitle}>Create Profile</h2>
          <p className={styles.stepDescription}>
            Sign up and input your career goals, experience, and preferences.
          </p>
        </div>

        <ArrowIcon />

        {/* Step 2 */}
        <div className={styles.step}>
          <div className={styles.stepNumber}>2</div>
          <ResumeIcon />
          <h2 className={styles.stepTitle}>Generate Resume</h2>
          <p className={styles.stepDescription}>
            Our AI creates optimized resumes tailored to your target roles.
          </p>
        </div>

        <ArrowIcon />

        {/* Step 3 */}
        <div className={styles.step}>
          <div className={styles.stepNumber}>3</div>
          <SearchIcon />
          <h2 className={styles.stepTitle}>Job Matching</h2>
          <p className={styles.stepDescription}>
            Get matched with job opportunities based on your profile.
          </p>
        </div>

        <ArrowIcon />

        {/* Step 4 */}
        <div className={styles.step}>
          <div className={styles.stepNumber}>4</div>
          <ChartIcon />
          <h2 className={styles.stepTitle}>Apply & Track</h2>
          <p className={styles.stepDescription}>
            Auto-apply to jobs and track your applications in real-time.
          </p>
        </div>
      </div>

      <div className={styles.ctaContainer}>
        <Link href="/start" className={styles.ctaButton}>
          Start Your Career Journey <span className={styles.ctaArrow}>→</span>
        </Link>
      </div>
    </div>
  );
};

export default HowItWorks;