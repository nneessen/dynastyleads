'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '@/lib/auth/authService';
import { useRouter } from 'next/navigation';

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.clear();
      router.replace('/login');
    }
  });

  return { logout, isLoading };
}
