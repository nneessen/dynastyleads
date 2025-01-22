// app/api/auth/logout/route.js
import { cookies } from 'next/headers';
import { supabase } from '@/utils/supabase/server';

export async function POST() {
  // Sign out on the server if you'd like:
  const { error } = await supabase.auth.signOut();
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400
    });
  }

  // Clear tokens from cookies:
  const cookieStore = cookies();
  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
