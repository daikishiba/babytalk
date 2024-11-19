'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../../../utils/supabase/server'
import { verifyRecaptcha } from '../../../utils/supabase/server'

export async function signup(formData: FormData, recaptchaToken: string | null) {
  if (!recaptchaToken || !(await verifyRecaptcha(recaptchaToken))) {
    redirect('/error?message=invalid-captcha')
  }

  const supabase = await createClient()

  const signupdata = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(signupdata)

  if (error) {
    console.error('Signup error:', error.message)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/thankyou')
}

export async function login(formData: FormData, recaptchaToken: string | null) {
  if (!recaptchaToken || !(await verifyRecaptcha(recaptchaToken))) {
    redirect('/error?message=invalid-captcha')
  }

  const supabase = await createClient()

  const logindata = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data, error } = await supabase.auth.signInWithPassword(logindata)

  if (error) {
    redirect('/error')
  }
  revalidatePath('/', 'layout')
  redirect(`/private/${data.user.id}`)
}
