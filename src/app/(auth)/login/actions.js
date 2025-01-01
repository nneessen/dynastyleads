'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import { login as loginUser } from '../../../../lib/auth/authService.js';
import toast from 'react-hot-toast';

export async function login(formData) {
  const { error } = await loginUser(
    formData.get('email'),
    formData.get('password')
  );

  if (error) {
    redirect('/error');
  }

  toast.success('You are now logged in!');
  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(formData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email'),
    password: formData.get('password')
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
