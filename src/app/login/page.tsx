'use client'

import { login, signup } from './actions'
import styles from '../../styles/loginpage.module.css'
import { useEffect, useState } from 'react'

export default function LoginPage() {
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)

  useEffect(() => {
    // Load the Google reCAPTCHA script
    const script = document.createElement('script')
    script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit'
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    // Define the global callback for reCAPTCHA
    const globalWindow = window as Window & {
		onRecaptchaLoad?: () => void
		grecaptcha?: {
		  render: (container: string, params: { sitekey: string; callback: (token: string) => void }) => void
		}
	  }
    globalWindow.onRecaptchaLoad = () => {
      if (globalWindow.grecaptcha) {
        globalWindow.grecaptcha.render('recaptcha-container', {
          sitekey: '6Lfub4MqAAAAAFtNnc96c6E53EyWBRZoJOyfQR7y', // Replace with your actual site key
          callback: (token: string) => setRecaptchaToken(token), // Set token on successful verification
        })
      }
    }

    return () => {
      // Clean up the script
      document.body.removeChild(script)
      delete globalWindow.onRecaptchaLoad
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
      <div id="recaptcha-container" className="g-recaptcha"></div>
      <button
        className={styles.button}
        type="submit"
        onClick={(e) => {
          e.preventDefault()
          signup(new FormData(e.target as HTMLFormElement), recaptchaToken)
        }}>Sign up</button>
      <button
        className={styles.button}
        type="submit"
        onClick={(e) => {
          e.preventDefault()
          login(new FormData(e.target as HTMLFormElement), recaptchaToken)
        }}>Log in</button>
    </form>
  )
}
