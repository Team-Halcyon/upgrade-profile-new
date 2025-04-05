"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../auth.module.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Simulate API call to send password reset instructions
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.leftPanel}>
          <h2 className={styles.title}>Reset Your Password</h2>
          <p className={styles.subtitle}>
            Enter your email address and we'll send you instructions to reset your password.
          </p>
        </div>
        <div className={styles.rightPanel}>
          <div className={styles.formContainer}>
            <h1 className={styles.welcomeTitle}>Forgot Password</h1>
            <p className={styles.welcomeSubtitle}>Enter your email to reset your password</p>
            
            {error && <div className={styles.errorMessage}>{error}</div>}
            {success && (
              <div className={styles.successMessage}>
                Password reset instructions have been sent to your email.
              </div>
            )}
            
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>
              
              <button
                type="submit"
                className={styles.primaryButton}
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Reset Instructions'}
              </button>
            </form>
            
            <div className={styles.signinPrompt}>
              Remember your password? <Link href="/auth/signin" className={styles.signinLink}>Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
