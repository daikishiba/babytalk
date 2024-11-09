
import styles from '../../styles/footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>@{new Date().getFullYear()} Baby Talk with AI</p>
    </footer>
  );
}

export default Footer;
