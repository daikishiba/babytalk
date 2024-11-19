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
    document.body.appendChild(script);

	const globalWindow = window as Window & { handleRecaptcha?: (token: string) => void }
    globalWindow.handleRecaptcha = (token: string) => {
      setRecaptchaToken(token)
    }

    return () => {
      // Clean up the global callback
      delete globalWindow.handleRecaptcha
    }
  }, [])

  return (
    <form className={styles.form}>
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
        formAction={(formData) => signup(formData, recaptchaToken)}>Sign up</button>
      <button
        className={styles.button}
        formAction={(formData) => login(formData, recaptchaToken)}>Log in</button>
    </form>
  )
}
