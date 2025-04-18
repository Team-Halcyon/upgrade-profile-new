"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import Button from '../common/Button';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/authContext'; // Adjust the import path as necessary

const Navbar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth(); 
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
          {user ? (
            <div className={styles.userNavIcons}>
              
                <Image
                  src="/images/blank-profile-picture.png" // Replace with real user image if available
                  alt="User"
                  width={32}
                  height={32}
                  className={styles.profileIcon}
                  onClick={toggleDropdown}
                />
              {dropdownOpen && (
                <div ref={dropdownRef} className={styles.dropdownMenu}>
                  <Link href="/dashboard" className={styles.dropdownItem}>Profile</Link>
                  <button className={`${styles.dropdownItem} ${styles.logout}`} onClick={() => logout()}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.authButtons}>
              <Link href="/auth/signin">
                <Button variant="outline" size="sm" className={styles.signInButton}>
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="primary" size="sm" className={styles.signUpButton}>
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;