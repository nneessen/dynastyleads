import { updateSession } from '@/utils/supabase/middleware';

/**
 * Middleware for handling user sessions and protecting routes.
 * @param {Request} request - The incoming Next.js request.
 * @returns {NextResponse} - The updated response from session handling.
 */
export async function middleware(request) {
  console.log('MIDDLEWARE RUN -> Path:', request.nextUrl.pathname);
  try {
    return await updateSession(request);
  } catch (err) {
    console.error('Middleware error:', err);
    return new Response('Internal Middleware Error', { status: 500 });
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/.*|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js|json|txt|xml|map)$).*)'
  ]
};
