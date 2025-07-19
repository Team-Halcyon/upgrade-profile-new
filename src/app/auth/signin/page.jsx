"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../auth.module.css';
import { useAuth } from '@/context/authContext';
import { signIn } from '@/lib/auth'; 

export default function SignInPage() {
  const { login } = useAuth(); 
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    setError('');

    try {
          // Send the form data to your backend to create a user
          const result = await signIn(formData);
    
          if (result.success) {
            router.push('../../');
          } else {
            setError(result.message || 'Failed to signIn account. Please try again.');
          }
        } catch (err) {
          setError('An error occurred. Please try again later.');
          console.error('Log In error:', err);
        } finally {
          setIsLoading(false);
        }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSignIn();
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.leftPanel}>
          <h2 className={styles.title}>Join Thousands of Successful Job Seekers</h2>
          <p className={styles.subtitle}>
            Our AI-powered platform has helped over 5,000 professionals land their dream jobs faster and more efficiently.
          </p>
          <div className={styles.dots}>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
          </div>
        </div>
        <div className={styles.rightPanel}>
          <div className={styles.formContainer}>
            <h1 className={styles.welcomeTitle}>Welcome back</h1>
            <p className={styles.welcomeSubtitle}>Sign in to your account to continue</p>

            {error && <div className={styles.errorMessage}>{error}</div>}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.rememberForgot}>
                <label className={styles.rememberMeLabel}>
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className={styles.checkbox}
                  />
                  Remember me
                </label>
                <Link href="/auth/forgot-password" className={styles.forgotLink}>
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className={styles.primaryButton}
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <div className={styles.divider}>
              <span>Or continue with</span>
            </div>

            <div className={styles.oauthButtons}>
              <button
                type="button"
                onClick={() => {}}
                className={styles.oauthButton}
                disabled={isLoading}
              >
                <svg className={styles.oauthIcon} viewBox="0 0 24 24">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                </svg>
                Google
              </button>
              <button
                type="button"
                onClick={() => {}}
                className={styles.oauthButton}
                disabled={isLoading}
              >
                <svg className={styles.oauthIcon} viewBox="0 0 24 24">
                  <path d="M13.397,20.997v-8.196h2.765l0.411-3.209h-3.176V7.548c0-0.926,0.258-1.56,1.587-1.56h1.684V3.127C15.849,3.039,15.025,2.997,14.201,3c-2.444,0-4.122,1.492-4.122,4.231v2.355H7.332v3.209h2.753v8.202H13.397z"/>
                </svg>
                Facebook
              </button>
            </div>

            <div className={styles.signupPrompt}>
              Don&apos;t have an account? <Link href="/auth/signup" className={styles.signupLink}>Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
