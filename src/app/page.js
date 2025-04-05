import React from 'react';
import Hero from '@/app/home-page/Hero';
import Features from '@/app/home-page/Features';
import HowItWorks from '@/app/home-page/HowItWorks';
import ResumeBuilder from '@/app/home-page/ResumeBuilder';
import Statistics from '@/app/home-page/Statistics';
import Testimonials from '@/app/home-page/Testimonials';
import SubHero from '@/app/home-page/SubHero';
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
