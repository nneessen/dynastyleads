import { useMutation } from '@tanstack/react-query';
import { signupUser } from '@/lib/auth/authService.js'; // Import your existing signup function
import toast from 'react-hot-toast';

export function useSignup() {
  const {
    mutate: signupUser,
    isLoading,
    error
  } = useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      toast.success('User successfully created!');
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to sign up.');
    }
  });

  return { signup: signupUser, isLoading, error };
}
