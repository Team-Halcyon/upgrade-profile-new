import React from 'react';
import styles from './Navbar.module.css';
import Button from '../common/Button';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.leftSection}>
          <div className={styles.logoContainer}>
            <div className={styles.logoIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24" height="24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoTextBlack}>Upgrade</span>
              <span className={styles.logoTextGradient}>Profile</span>
            </div>
          </div>
        </div>

        <div className={styles.navLinks}>
          <a href="#" className={`${styles.navLink} ${styles.active}`}>Home</a>
          <a href="#" className={styles.navLink}>CV Generation</a>
          <a href="#" className={styles.navLink}>Job Matching</a>
          <a href="#" className={styles.navLink}>Skill Development</a>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.authButtons}>
            <Button
              variant="outline"
              size="sm"
              className={styles.signInButton}
            >
              <svg className={styles.emailIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>
              </svg>
              Sign In
            </Button>
            <Button
              variant="primary"
              size="sm"
              className={styles.signUpButton}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;