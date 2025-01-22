// new
// app/api/auth/login/route.js
import { cookies } from 'next/headers';
import { supabase } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function POST(req) {
  // 1. Parse form data
  const formData = await req.formData();
  const email = formData.get('email');
  const password = formData.get('password');

  // 2. Sign in with Supabase
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) {
    // You can redirect to an error page or return 401
    return new Response(JSON.stringify({ error: error.message }), {
      status: 401
    });
  }

  // 3. If sign-in is successful, set cookies for SSR usage
  if (data.session) {
    const cookieStore = cookies();
    cookieStore.set('access_token', data.session.access_token, {
      httpOnly: true,
      secure: false, // set to true in production with HTTPS
      path: '/',
      sameSite: 'strict'
    });
    cookieStore.set('refresh_token', data.session.refresh_token, {
      httpOnly: true,
      secure: false, // set to true in production with HTTPS
      path: '/',
      sameSite: 'strict'
    });
  }

  // 4. Redirect or return JSON
  redirect('/campaigns'); // or wherever you want to go after login
}

// previous version
// // app/api/auth/login/route.js
// import { cookies } from 'next/headers';
// import { supabase } from '@/utils/supabase/server'; // (server client)
//
// export async function POST(request) {
//   const { email, password } = await request.json();
//
//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password
//   });
//
//   if (error) {
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 401
//     });
//   }
//
//   // Set a secure, HTTP-only cookie with the session:
//   const cookieStore = cookies();
//   if (data.session) {
//     // If using Supabase 2.x:
//     //  `supabase.auth.setAuthCookie` is no longer built-in,
//     //  so you'll manually set cookies from data.session if needed.
//     cookieStore.set('access_token', data.session.access_token, {
//       httpOnly: true,
//       secure: true,
//       path: '/',
//       sameSite: 'strict'
//     });
//     cookieStore.set('refresh_token', data.session.refresh_token, {
//       httpOnly: true,
//       secure: true,
//       path: '/',
//       sameSite: 'strict'
//     });
//   }
//
//   return new Response(
//     JSON.stringify({
//       user: data.user
//     }),
//     { status: 200 }
//   );
// }
