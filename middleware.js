import { updateSession } from '@/utils/supabase/middleware';

/**
 * Middleware for handling user sessions and protecting routes.
 * @param {Request} request - The incoming Next.js request.
 * @returns {NextResponse} - The updated response from session handling.
 */
export async function middleware(request) {
  try {
    return await updateSession(request);
  } catch (error) {
    console.error('Middleware error:', error);
    return new Response('An unexpected error occurred in middleware', {
      status: 500
    });
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/.*|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js|json|txt|xml|map)$).*)'
  ]
};
