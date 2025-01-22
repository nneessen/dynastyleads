// app/api/auth/loginMagic/route.js
import { supabase } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function POST(req) {
  const formData = await req.formData();
  const email = formData.get('email');

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: 'http://localhost:3000/campaigns' // or wherever
    }
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 401
    });
  }

  // Possibly redirect or show a "check your email" page
  redirect('/check-your-email');
}
