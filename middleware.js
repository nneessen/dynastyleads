import { updateSession } from '@/utils/supabase/middleware';
import { NextResponse } from 'next/server';

/**
 * Middleware for user sessions and protecting routes.
 */
export async function middleware(request) {
  console.log('MIDDLEWARE RUN -> Path:', request.nextUrl.pathname);
  try {
    // Call the function that checks session + possibly redirects
    return await updateSession(request);
  } catch (err) {
    console.error('Middleware error:', err);
    return new Response('Internal Middleware Error', { status: 500 });
  }
}

/**
 * Matcher for which routes to guard.
 * Excluding _next/static, images, favicon, etc.
 */
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/.*|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js|json|txt|xml|map)$).*)'
  ]
};
