import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function verifyRecaptcha(token: string): Promise<boolean> {
	const secretKey = process.env.RECAPTCHA_SECRET_KEY // Google reCAPTCHAのシークレットキー
	const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
	  method: 'POST',
	  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
	  body: `secret=${secretKey}&response=${token}`,
	})
  
	const data = await response.json()
	return data.success
  }


export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}