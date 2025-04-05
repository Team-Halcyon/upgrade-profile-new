import React from 'react';
import Hero from '@/components/HomePage/Hero';
import Features from '@/components/HomePage/Features';
import HowItWorks from '@/components/HomePage/HowItWorks';
import ResumeBuilder from '@/components/HomePage/ResumeBuilder';
import Statistics from '@/components/HomePage/Statistics';
import Testimonials from '@/components/HomePage/Testimonials';
import SubHero from '@/components/HomePage/SubHero';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <Statistics />
      <ResumeBuilder />
      <Features />
      <SubHero />
      <HowItWorks />
      <Testimonials />
    </main>
  );
}