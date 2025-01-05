import { useMutation } from '@tanstack/react-query';

export function useCreateCampaign() {
  const mutation = useMutation({
    mutationFn: async (campaignData) => {
      const response = await fetch('/api/campaigns/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaignData)
      });
      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.error || 'Failed to create campaign');
      }
      const data = await response.json();
      return data;
    }
    // onSuccess, onError, etc. if you want
  });

  return {
    createCampaign: mutation.mutate,
    isCreating: mutation.isLoading
    // ...
  };
}
