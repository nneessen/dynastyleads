import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createAdSet as createAdSetApi } from '@/lib/adSets/adSetService';

export function useCreateAdSet() {
  const queryClient = useQueryClient();

  const {
    mutate: createAdSet,
    isLoading: isCreating,
    error
  } = useMutation({
    mutationFn: createAdSetApi,
    onSuccess: () => {
      toast.success('Ad Set successfully created');
      queryClient.invalidateQueries({ queryKey: ['adSets'] });
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to create Ad Set');
    }
  });

  return { createAdSet, isCreating, error };
}
