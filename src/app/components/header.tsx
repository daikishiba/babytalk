import styles from '../../styles/header.module.css';
import { logout } from '../logout/actions';

function Header() {
  return (
    <header className={styles.header}>
      <h1>Baby Talk AI</h1>
      <nav className={styles.nav}>
        <button className={styles.button}>
          <a href="/" className={styles.link}>Home</a>
        </button>
        <button className={styles.button}>
          <a href="/login" className={styles.link}>Log in</a>
        </button>
		<form className={styles.form} action={logout}>
          <button type="submit" className={styles.button}>Log out</button>
        </form>
        <button className={styles.button}>
          <a href="/contact" className={styles.link}>Contact</a>
        </button>
      </nav>
    </header>
  );
}

export default Header;
