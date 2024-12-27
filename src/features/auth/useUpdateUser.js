import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser } from '../../lib/auth/authService';
import toast from 'react-hot-toast';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success('User successfully updated');
      queryClient.setQueryData(['user'], user);
    },
    onError: (err) => toast.error(err.message)
  });
  return { updateUser, isUpdating };
}
