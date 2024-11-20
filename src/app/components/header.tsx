
import styles from '../../styles/header.module.css';
import { logout } from '../logout/actions';
import { User } from "@supabase/supabase-js";
import Link from 'next/link';


interface HeaderProps {
	user: User | null;
	userId: string | undefined
  }


const Header: React.FC<HeaderProps>  = ({user, userId}) => {

  return (
    <header className={styles.header}>
      <h1>Baby Talk with AI</h1>
      <nav className={styles.nav}>
        <button className={styles.button}>
          <Link href="/" className={styles.link}>Home</Link>
        </button>
		{user && (
			<button className={styles.button}>
			<Link href={`/private/${userId}`} className={styles.link}>Chat</Link>
			</button>)}
        <button className={styles.button}>
          <Link href="/login" className={styles.link}>Log in</Link>
        </button>
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

