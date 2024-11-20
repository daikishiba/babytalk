import Header from "./components/header"
import Footer from "./components/footer"
import '../styles/index.css'
import { createClient } from "@/utils/supabase/server"


export const metadata = {
  title: 'babytalkwithai',
  description: 'generate conversation for baby by AI',
  icons: {
    icon: "/favicon.ico", // `public`フォルダのルートからのパス
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id

  return (
    <html lang="en">
	  <body>
		<Header user={user} userId={userId}/>
		  <main>{children}</main>
		<Footer />
	  </body>
    </html>
  )
}