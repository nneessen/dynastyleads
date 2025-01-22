import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * This layout runs on every request to /campaigns/...,
 * checking if we have a valid Supabase session cookie.
 */
export default async function CampaignsLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session }
  } = await supabase.auth.getSession();

  // If no session, SSR-redirect to /login
  if (!session) {
    redirect('/login');
  }

  // Otherwise, render the children
  return <>{children}</>;
}
