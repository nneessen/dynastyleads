import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createCampaign as createCampaignApi } from '@/lib/campaigns/campaignService.js';

export function useCreateCampaign() {
  const queryClient = useQueryClient();

  const { mutate: createCampaign } = useMutation({
    mutationFn: createCampaignApi,
    onSuccess: () => {
      toast.success('Campaign successfully created');
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
    onError: (err) => toast.error(err.message || 'Failed to create campaign')
  });

  return { createCampaign };
}
