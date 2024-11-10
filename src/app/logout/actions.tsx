'use server'

import { createClient } from '../../../utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function logout(formData: FormData) {
	const supabase = await createClient()

	const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error.message);
    } else {
      // ログアウト後にホームページなどにリダイレクト
      revalidatePath('/', 'layout')
	  redirect('/')
    }
  };