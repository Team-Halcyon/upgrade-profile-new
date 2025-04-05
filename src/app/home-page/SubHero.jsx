import React from 'react';
import Image from 'next/image';
import styles from './SubHero.module.css';
import Button from '../../components/common/Button';
import { ArrowRight } from 'lucide-react';

const SubHero = () => {
  return (
    <section className={styles.subheroContainer}>
      <div className={styles.contentSide}>
        <div className={styles.badgeContainer}>
          <Button variant="outline" size="sm" className={styles.badge}>
            Get Started Today
          </Button>
        </div>
        
        <h2 className={styles.title}>
          Unlock Your Career<br />Potential
        </h2>
        
        <p className={styles.description}>
          Join Upgrade Profile today and gain exclusive access 
          to AI-powered tools, insights, and opportunities to 
          accelerate your career growth. Take the next step 
          toward success!
        </p>
        
        <div className={styles.ctaButtons}>
          <Button 
            variant="primary"
            size="md"
            withIcon
            icon={<ArrowRight size={18} />}
            className={styles.joinButton}
          >
            Join for free
          </Button>
          
          <Button 
            variant="secondary"
            size="md"
            className={styles.demoButton}
          >
            Schedule Demo
          </Button>
        </div>
        
        <div className={styles.statsContainer}>
          <div className={styles.avatarGroup}>
            <div className={styles.avatar}></div>
            <div className={styles.avatar}></div>
            <div className={styles.avatar}></div>
          </div>
          <p className={styles.stats}>
            Join <span className={styles.highlight}>5,000+</span> professionals
          </p>
        </div>
      </div>
      
      <div className={styles.imageSide}>
        <div className={styles.placeholderImage}>
          <Image
            src="/images/sub.png"
            alt="Career Dashboard Preview"
            width={500}
            height={400}
            priority
            quality={100}
          />
        </div>
      </div>
    </section>
  );
};

export default SubHero;