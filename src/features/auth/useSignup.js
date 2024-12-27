import { useMutation } from '@tanstack/react-query';
import { signup } from '../../services/authApi'; // Import your existing signup function
import toast from 'react-hot-toast';

export function useSignup() {
  const {
    mutate: signupUser,
    isLoading,
    error
  } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success('User successfully created!');
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to sign up.');
    }
  });

  return { signup: signupUser, isLoading, error };
}
