import { getServerSupabase } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function updateSession(request) {
  // Create an initial response object
  const response = NextResponse.next({ request });

  // Create a server client that can read/write cookies
  const supabase = await getServerSupabase();
  const { data: { user } = {} } = await supabase.auth.getUser();

  // If user is missing and the route is NOT public, redirect to /login
  if (!user && !isPublicRoute(request)) {
    return redirectToLogin(request);
  }

  // Otherwise, pass through
  return response;
}

function isPublicRoute(request) {
  const pathname = request.nextUrl.pathname;
  // Example of allowing /login, /signup, and /auth routes
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
