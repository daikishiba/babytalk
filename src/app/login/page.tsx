import { login, signup } from './actions'
import styles from '../../styles/loginpage.module.css'

export default function LoginPage() {
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
				placeholder='Enter your password' required />
			<button className={styles.button} formAction={login}>Log in</button>
			<button className={styles.button} formAction={signup}>Sign up</button>
    	</form>
  )
}