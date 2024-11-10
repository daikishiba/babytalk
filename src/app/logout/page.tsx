
import { logout } from './actions' 

export default function LogOut() {
	return (
		  <form>
			  <button formAction={logout}>Log out</button>
		  </form>
	)
  }
