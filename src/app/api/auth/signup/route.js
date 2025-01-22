// app/api/auth/signup/route.js
import { supabase } from '@/utils/supabase/client';

export async function POST(req) {
  try {
    const { email, password, full_name, ...rest } = await req.json();

    // 1. Create user in Supabase Auth
    const { data: authData, error: authError } =
      await supabase.auth.admin.createUser({
        email,
        password,
        email_confirmed: true,
        user_metadata: { full_name }
      });
    if (authError) {
      return new Response(JSON.stringify({ error: authError.message }), {
        status: 400
      });
    }

    // 2. Insert user details in 'users' table
    const userId = authData.user.id;
    const { error: insertError } = await supabase.from('users').insert({
      id: userId,
      email,
      full_name,
      ...rest
    });
    if (insertError) {
      return new Response(JSON.stringify({ error: insertError.message }), {
        status: 400
      });
    }

    // 3. Return the new user
    return new Response(JSON.stringify({ user: authData.user }), {
      status: 200
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500
    });
  }
}
