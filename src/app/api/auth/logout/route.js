import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { cookies as nextCookies } from 'next/headers';

/**
 * Mark this route dynamic so Next won't attempt any static optimization
 * that conflicts with reading/writing cookies at runtime.
 */
export const dynamic = 'force-dynamic';

export async function POST() {
  // 1) Create a route handler client, passing a *function* for cookies
  const supabase = createRouteHandlerClient({ cookies: () => nextCookies() });

  // 2) Sign out, which clears cookies automatically
  const { error } = await supabase.auth.signOut();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // 3) Return a 200 JSON response
  return NextResponse.json({ success: true }, { status: 200 });
}
