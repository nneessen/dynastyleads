import { createBrowserClient } from '@supabase/ssr';

/**
 * Creates a browser-side Supabase client.
 * This should be used for client-side operations, such as fetching data
 * or performing authentication actions.
 */
export function createClient() {
  try {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  } catch (error) {
    throw new Error('Supabase client initialization failed');
  }
}
