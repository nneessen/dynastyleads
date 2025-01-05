'use client';

import { useMutation } from '@tanstack/react-query';

export function useCreateCampaign() {
  const mutation = useMutation({
    mutationFn: async (campaignData) => {
      console.log('[DEBUG] createCampaign data ->', campaignData);

      const response = await fetch('/api/campaigns/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaignData)
      });

      console.log('[DEBUG] /api/campaigns/create response ->', response);

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.error || 'Failed to create campaign');
      }

      const data = await response.json();
      return data;
    }
  });

  return {
    createCampaign: mutation.mutate,
    isCreating: mutation.isLoading
  };
}
