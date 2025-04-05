"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import Button from '../common/Button';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.leftSection}>
          <div className={styles.logoContainer}>
            <Link href="/" className={styles.logoLink}>
              <div className={styles.logoIcon}>
                <Image 
                  src="/images/up-logo.png" 
                  alt="Upgrade Profile Logo" 
                  width={32} 
                  height={32}
                  priority
                />
              </div>
              <div className={styles.logoText}>
                <span className={styles.logoTextBlue}>Upgrade</span>
                <span className={styles.logoTextGradient}>Profile</span>
              </div>
            </Link>
          </div>
        </div>

        <div className={styles.navLinks}>
          <Link 
            href="/" 
            className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}
          >
            Home
          </Link>
          <Link 
            href="/cv-generation" 
            className={`${styles.navLink} ${pathname === '/cv-generation' ? styles.active : ''}`}
          >
            CV Generation
          </Link>
          <Link 
            href="/job-matching" 
            className={`${styles.navLink} ${pathname === '/job-matching' ? styles.active : ''}`}
          >
            Job Matching
          </Link>
          <Link 
            href="/skill-development" 
            className={`${styles.navLink} ${pathname === '/skill-development' ? styles.active : ''}`}
          >
            Skill Development
          </Link>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.authButtons}>
            <Link href="/auth/signin">
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
            </Link>
            <Link href="/auth/signup">
              <Button
                variant="primary"
                size="sm"
                className={styles.signUpButton}
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;