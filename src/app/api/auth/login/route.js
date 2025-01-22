// app/api/auth/login/route.js
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse, redirect } from 'next/server';

export async function POST(request) {
  // 1) Parse the form data
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');

  // 2) Create Supabase client with cookies
  const supabase = createRouteHandlerClient({ cookies });

  // 3) Attempt sign-in
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  // 4) On success, Supabase sets the session cookies automatically.
  //    Redirect to /campaigns or your chosen protected route.
  return redirect('/campaigns');
}
