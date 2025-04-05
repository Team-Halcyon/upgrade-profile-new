import React from 'react';
import styles from './Testimonials.module.css';

const testimonialData = [
  {
    id: 1,
    name: 'Sarah Johnson',
    initial: 'S',
    role: 'Software Engineer, Tech Innovations',
    quote: '"The AI resume builder helped me highlight my skills perfectly. I received 3 interview calls within a week of applying!"',
  },
  {
    id: 2,
    name: 'Michael Chen',
    initial: 'M',
    role: 'Marketing Specialist, Global Media',
    quote: '"The skill gap analysis showed me exactly what I needed to learn. After completing the recommended courses, I landed my dream job."',
  },
  {
    id: 3,
    name: 'Jessica Williams',
    initial: 'J',
    role: 'Data Analyst, Analytics Pro',
    quote: '"The interview preparation feature was a game-changer. I felt confident and prepared, and it definitely helped me ace my interviews."',
  },
];

const Testimonials = () => {
  return (
    <section className={styles.testimonials}>
      <div className={styles.container}>
        <div className={styles.heading}>
          
          <h2 className={styles.title}>What Our Users Say</h2>
          <p className={styles.subtitle}>
            Hear from professionals who transformed their careers with our AI-powered platform
          </p>
        </div>
        
        <div className={styles.testimonialsGrid}>
          {testimonialData.map((testimonial) => (
            <div key={testimonial.id} className={styles.testimonialCard}>
              <div className={styles.testimonialHeader}>
                <div className={styles.avatarContainer}>
                  <span className={styles.avatar}>{testimonial.initial}</span>
                </div>
                <div className={styles.userInfo}>
                  <h3 className={styles.userName}>{testimonial.name}</h3>
                  <p className={styles.userRole}>{testimonial.role}</p>
                </div>
              </div>
              <p className={styles.quote}>{testimonial.quote}</p>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={styles.star}>★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;