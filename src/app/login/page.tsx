'use client'

import { login, signup } from './actions'
import styles from '../../styles/loginpage.module.css'
import { useEffect, useState } from 'react'

export default function LoginPage() {
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)

  useEffect(() => {
    // Load the Google reCAPTCHA script
    const script = document.createElement('script')
    script.src = 'https://www.google.com/recaptcha/api.js'
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    // Extend the Window interface to include handleRecaptcha
    const globalWindow = window as Window & { handleRecaptcha?: (token: string) => void }
    globalWindow.handleRecaptcha = (token: string) => {
      setRecaptchaToken(token)
    }

    return () => {
      // Clean up the global callback
      delete globalWindow.handleRecaptcha
    }
  }, [])

  const [isLoading, setIsLoading] = useState(false); // ローディング状態
  const [action, setAction] = useState<null | 'login' | 'signup'>(null); // 現在のアクション

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    setIsLoading(true);
    try {
      if (action === 'login') {
        await login(formData, recaptchaToken);
      } else if (action === 'signup') {
        await signup(formData, recaptchaToken);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <label className={styles.label} htmlFor="email">Email:</label>
      <input  
        className={styles.input}
        id="email" name="email" type="email" 
        placeholder="Enter your email" required />
      <label className={styles.label} htmlFor="password">Password:</label>
      <input
        className={styles.input}
        id="password" name="password" type="password" 
        placeholder='At least 6 characters' required />
      <div
        className="g-recaptcha"
        data-sitekey="6Lfub4MqAAAAAFtNnc96c6E53EyWBRZoJOyfQR7y" // Replace with your actual site key
        data-callback="handleRecaptcha"
      />
      <button
        className={styles.button}
        type="submit"
        disabled={isLoading && action === 'login'}
        onClick={() => setAction('login')}
      >
        {isLoading && action === 'login' ? 'Logging in...' : 'Log in'}
      </button>

      {/* サインアップボタン */}
      <button
        className={styles.button}
        type="submit"
        disabled={isLoading && action === 'signup'}
        onClick={() => setAction('signup')}
      >
        {isLoading && action === 'signup' ? 'Signing up...' : 'Sign up'}
      </button>
    </form>
  );
}
