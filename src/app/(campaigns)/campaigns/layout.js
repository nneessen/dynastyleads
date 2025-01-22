// app/(campaigns)/campaigns/layout.js
import { cookies } from 'next/headers';
import { supabase } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function CampaignsLayout({ children }) {
  const cookieStore = cookies();
  const access_token = cookieStore.get('access_token')?.value;
  if (!access_token) {
    redirect('/login');
  }

  // Optionally verify the token with supabase.auth.getUser
  supabase.auth.setSession({ access_token, refresh_token: '' });
  const { data: { user } = {} } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return <>{children}</>;
}
