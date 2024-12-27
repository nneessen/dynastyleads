import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/authApi';

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    retry: false // Avoid retrying if the user isn't authenticated
  });

  return {
    isLoading,
    user,
    isAuthenticated: !!user // Use presence of `user` to determine authentication
  };
}
