'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '@/lib/auth/authService';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user);
      router.replace('/'); // Replaces the current history entry
      toast.success('You are now logged in!');
    },
    onError: () => {
      toast.error('Provided email or password are invalid');
    }
  });

  return { login, isLoading };
}
