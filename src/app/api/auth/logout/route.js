// app/api/auth/logout/route.js
import { getServerSupabase } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function POST() {
  const supabase = await getServerSupabase();
  const { error } = await supabase.auth.signOut();
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400
    });
  }

  // Clear cookies automatically or manually
  // For manual approach:
  // const response = NextResponse.redirect('/login');
  // response.cookies.delete('access_token');
  // response.cookies.delete('refresh_token');
  // return response;

  redirect('/login');
}
