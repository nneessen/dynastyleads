import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

/**
 * Handles user session updates and redirects unauthenticated users to the login page.
 * @param {Request} request - The incoming Next.js request.
 */
export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, {
              ...options,
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'Strict'
            })
          );
        }
      }
    }
  );

  try {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (
      !user &&
      !request.nextUrl.pathname.startsWith('/login') &&
      !request.nextUrl.pathname.startsWith('/auth')
    ) {
      return redirectToLogin(request);
    }
  } catch (error) {
    console.error('Error in updateSession:', error);
    return new Response('Session update failed', { status: 500 });
  }

  return supabaseResponse;
}

/**
 * Redirects unauthenticated users to the login page.
 * @param {Request} request - The incoming request.
 * @returns {NextResponse} - A redirect response.
 */
function redirectToLogin(request) {
  const url = request.nextUrl.clone();
  url.pathname = '/login';
  return NextResponse.redirect(url);
}
