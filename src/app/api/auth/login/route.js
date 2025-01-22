// app/api/auth/login/route.js
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req) {
  // 1) Parse the login form
  const formData = await req.formData();
  const email = formData.get('email');
  const password = formData.get('password');

  // 2) Create the Supabase client
  //    IMPORTANT: pass a function for cookies to avoid sync usage
  const supabase = createRouteHandlerClient({ cookies: () => cookies() });

  // 3) Sign in with password
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    // Return 401 or JSON indicating error
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 401,
      headers: { 'content-type': 'application/json' }
    });
  }

  // 4) On success, the library sets the Supabase session cookies automatically
  //    We do a plain 303 redirect to /campaigns
  return new NextResponse(null, {
    status: 303,
    headers: {
      location: '/campaigns'
    }
  });
}
