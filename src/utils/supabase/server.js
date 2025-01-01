import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Creates a server-side Supabase client.
 * This should be used in middleware or API routes for secure interactions with Supabase.
 */
export async function createClient() {
  const cookieStore = await cookies();

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    console.error('Supabase environment variables are missing.');
    throw new Error('Supabase environment variables are required');
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, {
                ...options,
                httpOnly: true, // Prevent client-side scripts from accessing cookies
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                sameSite: 'Strict' // Mitigate CSRF attacks
              })
            );
          } catch (error) {
            console.error('Failed to set cookies in server client:', error);
          }
        }
      }
    }
  );
}
