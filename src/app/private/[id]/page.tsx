
import { redirect } from 'next/navigation'
import ChatApp from '../../chat/chatapp'

import { createClient } from '../../../../utils/supabase/server'

export default async function PrivatePage() {
  
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  //console.log(data)
  if (error || !data?.user) {
    redirect('/login')
  }

  return <ChatApp />
}