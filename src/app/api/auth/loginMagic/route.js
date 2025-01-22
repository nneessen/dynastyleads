// app/api/auth/loginMagic/route.js
import { supabase } from '@/utils/supabase/client';

export async function POST(req) {
  try {
    const { email } = await req.json();

    // Magic link:
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'https://yourdomain.com' // or wherever you want Supabase to redirect after sign-in
      }
    });
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 401
      });
    }

    return new Response(
      JSON.stringify({ message: 'Check your email for the magic link!' }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500
    });
  }
}
