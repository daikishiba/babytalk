
import styles from '../../styles/header.module.css';
import { logout } from '../logout/actions';
import { User } from "@supabase/supabase-js";


interface HeaderProps {
	user: User | null;
	userId: string | undefined
  }


const Header: React.FC<HeaderProps>  = ({user, userId}) => {

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
		{user && (
			<button className={styles.button}>
			<a href={`/private/${userId}`} className={styles.link}>Chat</a>
			</button>)}
		{user && (
			<form className={styles.form} action={logout}>
				<button type="submit" className={styles.button}>Log out</button>
			</form>
			)}
      </nav>
    </header>
  );
}

export default Header;

