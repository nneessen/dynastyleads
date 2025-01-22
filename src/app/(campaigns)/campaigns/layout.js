// app/(campaigns)/campaigns/layout.js
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function CampaignsLayout({ children }) {
  const supabase = createServerComponentClient({ cookies: () => cookies() });
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  return <>{children}</>;
}
