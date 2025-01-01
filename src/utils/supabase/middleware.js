// src/utils/supabase/middleware.js
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function updateSession(request) {
  // We'll modify this to handle token refresh.
  let supabaseResponse = NextResponse.next({ request });

  // 1. Create a server-side Supabase client from the incoming cookies.
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
    // 2. Check the current session from Supabase
    // This returns { session: { access_token, refresh_token, expires_at } }
    const {
      data: { session },
      error: sessionError
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error('Error fetching session:', sessionError);
      return new Response('Failed to get session', { status: 500 });
    }

    // 3. If there's NO session, user is not logged in => redirect (unless on login/auth pages)
    if (
      !session &&
      !request.nextUrl.pathname.startsWith('/login') &&
      !request.nextUrl.pathname.startsWith('/auth')
    ) {
      return redirectToLogin(request);
    }

    // 4. If there IS a session, check if token is expired or near expiry
    if (session && session.expires_at && isTokenExpired(session.expires_at)) {
      // Attempt a token refresh
      const { data: newSession, error: refreshError } =
        await supabase.auth.refreshSession();

      if (refreshError || !newSession.session) {
        console.error('Token refresh failed:', refreshError?.message);
        // Force user to log in again if refresh fails
        return redirectToLogin(request);
      }

      // 5. If refresh succeeds, set new cookies with the updated tokens
      // The Supabase client’s setAll() logic above will run automatically
      // after calling refreshSession().
      console.log('Token refreshed successfully');
    }

    // 6. If everything is fine or successfully refreshed, continue
  } catch (error) {
    console.error('Error in updateSession:', error);
    return new Response('Session update failed', { status: 500 });
  }

  // 7. Return the updated response (with possibly updated cookies)
  return supabaseResponse;
}

/**
 * Simple utility to check if the token is expired.
 * @param {number} expiresAt - A timestamp in seconds (as provided by Supabase session.expires_at)
 * @returns {boolean} true if current time is beyond expiresAt
 */
function isTokenExpired(expiresAt) {
  // Convert current time to seconds
  const nowInSeconds = Math.floor(Date.now() / 1000);
  return nowInSeconds >= expiresAt;
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
