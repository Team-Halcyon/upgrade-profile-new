import styles from './Hero.module.css';
import Button from '../common/Button';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.tag}>
            <span>AI-Powered Career Search</span>
          </div>
          
          <h1 className={styles.title}>
            Get Your <span className={styles.highlight}>Dream Job</span> Faster
          </h1>
          
          <p className={styles.description}>
            Our AI-powered platform automates CV creation, job applications, and skill development 
            to accelerate your career growth.
          </p>
          
          <div className={styles.actions}>
            <Button href="/get-started" variant="primary" arrow>
              Get Started Free
            </Button>
            <Button href="/demo" variant="outline">
              Watch Demo
            </Button>
          </div>
          
          <div className={styles.stats}>
            {/* <div className={styles.circles}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
            </div> */}
            <p>1,200+ job seekers found success last month</p>
          </div>
        </div>
        
        <div className={styles.imageWrapper}>
          <div className={styles.image}>
            <Image 
              src="/images/hero.png" 
              alt="Dashboard Preview" 
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
