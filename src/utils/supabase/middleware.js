import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function updateSession(request) {
  const response = NextResponse.next({ request });

  // CREATE A SERVER CLIENT WITH COOKIES...
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, {
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

  const { data: { user } = {} } = await supabase.auth.getUser();

  // ALLOW /login, /signup, /auth, etc. to skip redirect
  if (!user && !isPublicRoute(request)) {
    return redirectToLogin(request);
  }

  return response;
}

function isPublicRoute(request) {
  const pathname = request.nextUrl.pathname;

  // Allow these routes
  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/signup') ||
    pathname.startsWith('/auth')
  ) {
    return true;
  }

  return false;
}

function redirectToLogin(request) {
  const url = request.nextUrl.clone();
  url.pathname = '/login';
  return NextResponse.redirect(url);
}
