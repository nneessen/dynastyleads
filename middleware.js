// middleware.js
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  // Create a response object to pass to Supabase
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Check session
  const {
    data: { session }
  } = await supabase.auth.getSession();

  // If user isn't logged in and isn't on a login or signup route, redirect to /login
  const isAuthRoute =
    req.nextUrl.pathname.startsWith('/login') ||
    req.nextUrl.pathname.startsWith('/signup');
  if (!session && !isAuthRoute) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/login';
    return NextResponse.redirect(redirectUrl);
  }

  // Otherwise continue
  return res;
}

/**
 * Exclude static files and images from needing auth
 * You can adjust or remove if you want everything behind auth
 */
export const config = {
  matcher: ['/((?!.*\\..*|_next/static|_next/image|favicon.ico).*)']
};
