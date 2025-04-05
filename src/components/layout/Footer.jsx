import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <div className={styles.logoSection}>
            <div className={styles.logoContainer}>
              <div className={styles.logoIcon}>
                <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" />
                  <path d="M12 6L12 18" stroke="white" strokeWidth="2" />
                  <path d="M6 10L18 10" stroke="white" strokeWidth="2" />
                </svg>
              </div>
              <div className={styles.logoText}>
                <span className={styles.upgradePart}>Upgrade</span>
                <span className={styles.profilePart}>Profile</span>
              </div>
            </div>
            <p className={styles.tagline}>
              AI-powered career acceleration platform that helps job seekers land their dream jobs faster and more efficiently.
            </p>
          </div>

          <div className={styles.linksSection}>
            <div className={styles.linkColumn}>
              <h3 className={styles.columnTitle}>Features</h3>
              <ul className={styles.linksList}>
                <li><Link href="/resume-builder">Resume Builder</Link></li>
                <li><Link href="/job-matching">Job Matching</Link></li>
                <li><Link href="/skill-development">Skill Development</Link></li>
                <li><Link href="/interview-preparation">Interview Preparation</Link></li>
                <li><Link href="/career-analytics">Career Analytics</Link></li>
              </ul>
            </div>

            <div className={styles.linkColumn}>
              <h3 className={styles.columnTitle}>Company</h3>
              <ul className={styles.linksList}>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/careers">Careers</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/press">Press</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
              </ul>
            </div>

            <div className={styles.linkColumn}>
              <h3 className={styles.columnTitle}>Resources</h3>
              <ul className={styles.linksList}>
                <li><Link href="/help">Help Center</Link></li>
                <li><Link href="/resources">Career Resources</Link></li>
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/terms">Terms of Service</Link></li>
                <li><Link href="/faqs">FAQs</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <div className={styles.languageSelector}>
            <button className={styles.languageButton}>English</button>
          </div>
          <div className={styles.copyright}>
            © 2025 Upgrade Profile • Privacy • Terms
          </div>
          <div className={styles.socialLinks}>
            <Link href="https://twitter.com" className={styles.socialIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </Link>
            <Link href="https://facebook.com" className={styles.socialIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </Link>
            <Link href="https://linkedin.com" className={styles.socialIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </Link>
            <Link href="https://youtube.com" className={styles.socialIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}