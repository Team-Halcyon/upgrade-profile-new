import styles from './Statistics.module.css';

export default function Statistics() {
  return (
    <section className={styles.statistics}>
      <div className={styles.container}>
        <div className={styles.stat}>
          <div className={styles.value}>98%</div>
          <div className={styles.label}>Resume Acceptance Rate</div>
        </div>
        
        <div className={styles.stat}>
          <div className={styles.value}>75%</div>
          <div className={styles.label}>Interview Success Rate</div>
        </div>
        
        <div className={styles.stat}>
          <div className={styles.value}>15K+</div>
          <div className={styles.label}>Jobs Applied Monthly</div>
        </div>
        
        <div className={styles.stat}>
          <div className={styles.value}>5K+</div>
          <div className={styles.label}>Career Transformations</div>
        </div>
      </div>
    </section>
  );
}