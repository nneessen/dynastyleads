import { createBrowserClient } from '@supabase/ssr';

/**
 * Creates a browser-side Supabase client.
 * For client-side operations (hooks, data fetching in components, etc.).
 */
export function getBrowserSupabase() {
  try {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  } catch (error) {
    throw new Error('Supabase client initialization failed (client).');
  }
}
