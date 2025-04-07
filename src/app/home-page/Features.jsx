"use client";

import { useState } from 'react';
import styles from './Features.module.css';
import {
  FileText, Search, Briefcase, Target, Book, MessageSquare,
  Leaf, BarChart2, Users
} from 'lucide-react';

const Features = () => {
  const [activeTab, setActiveTab] = useState('resume');

  const tabData = {
    resume: {
      name: 'Resume & Applications',
      features: [
        {
          icon: <FileText />,
          title: 'Resume Generation',
          description: 'Create professional, ATS-optimized resumes with our AI templates tailored to your target roles.',
        },
        {
          icon: <Search />,
          title: 'Smart Job Matching',
          description: 'Our AI scans job portals to find positions that match your skills and preferences with high accuracy.',
        },
        {
          icon: <Briefcase />,
          title: 'Auto-Apply System',
          description: 'Automatically apply to selected jobs with customized applications based on your preferences.',
        },
      ],
    },
    skills: {
      name: 'Skills Development',
      features: [
        {
          icon: <Target />,
          title: 'Skill Gap Analysis',
          description: 'AI identifies missing skills required for your target roles and provides actionable insights.',
        },
        {
          icon: <Book />,
          title: 'Learning Pathways',
          description: 'Personalized learning recommendations from top platforms to help you acquire in-demand skills.',
        },
        {
          icon: <MessageSquare />,
          title: 'Interview Preparation',
          description: 'AI-driven mock interviews with role-specific questions and instant feedback on your responses.',
        },
      ],
    },
    career: {
      name: 'Career Growth',
      features: [
        {
          icon: <Leaf />,
          title: 'Portfolio Builder',
          description: 'Create an interactive digital portfolio showcasing your projects and achievements to impress recruiters.',
        },
        {
          icon: <BarChart2 />,
          title: 'Career Analytics',
          description: 'Track applications, responses, and interviews with AI-based success predictions and insights.',
        },
        {
          icon: <Users />,
          title: 'Networking Hub',
          description: 'Connect with industry professionals and access mentorship programs to accelerate your career growth.',
        },
      ],
    },
  };

  return (
    <section className={styles.featuresSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Revolutionize Your Job Search</h2>
        <p className={styles.subtitle}>
          Our platform combines AI technology with career expertise to streamline your job search
          process and maximize your chances of success.
        </p>

        <div className={styles.tabs}>
          {Object.keys(tabData).map((tab) => (
            <button
              key={tab}
              className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tabData[tab].name}
            </button>
          ))}
        </div>

        <div className={styles.featuresGrid}>
          {tabData[activeTab].features.map((feature, index) => (
            <div className={styles.featureCard} key={index}>
              <div className={styles.iconContainer}>
                {feature.icon}
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
              {/* <a href="#" className={styles.learnMore}>
                Learn more &gt;
              </a> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;