import { NextResponse } from 'next/server';
import supabase from './src/lib/supabase/client.js';

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Exclude static files and public assets
  if (
    pathname.startsWith('/_next') || // Next.js static files
    pathname.startsWith('/static') || // Custom static files
    pathname.startsWith('/favicon.ico') || // Favicon
    pathname.startsWith('/logo.png') // Any specific static asset
  ) {
    return NextResponse.next();
  }

  // Define public routes that don't require authentication
  const publicRoutes = ['/auth/login', '/auth/signup', '/api/public'];

  // Allow requests to public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check for a session token in the cookies
  const token = req.cookies.get('sb-access-token')?.value;

  if (!token) {
    // Redirect unauthenticated users to the login page
    const url = req.nextUrl.clone();
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  // Validate the session token with Supabase
  const { data: user, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    // Redirect to login if the token is invalid
    const url = req.nextUrl.clone();
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  // Proceed to the requested route if authenticated
  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'] // Apply middleware to all routes
};
