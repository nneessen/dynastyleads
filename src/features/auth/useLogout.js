'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutUser } from '../../lib/auth/authService.js';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      toast.success('You have been logged out');
      queryClient.clear();
      router.replace('/auth/login');
    }
  });

  return { logout, isLoading };
}
