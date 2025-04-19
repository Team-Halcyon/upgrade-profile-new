import React from 'react';
import { Inter } from 'next/font/google';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/context/authContext'
import './globals.css';

// Initialize the Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Upgrade Profile',
  description: 'AI-powered tools for career growth, resume building, and job matching',
  icons: {
    icon: '/logo.svg', 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
