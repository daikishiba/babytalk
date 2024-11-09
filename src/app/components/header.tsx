
import styles from '../../styles/header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <h1>Baby Talk with AI</h1>
      <nav className={styles.nav}>
        <a href="/">Home</a>
        <a href="/login">Sign up / Log in</a>
        <a href="/contact">Contact</a>
      </nav>
    </header>
  );
}

export default Header;