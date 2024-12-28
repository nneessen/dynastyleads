'use client';

import MultiStepForm from '@/ui/MultiStepForm/MultiStepForm';
import NameCampaignStep from '@/features/forms/NameCampaignStep/NameCampaignStep';
import BudgetStep from '@/features/forms/Budget/Budget';
import StatesStep from '@/features/forms/StatesStep/StatesStep';
import SubmitStep from '@/features/forms/SubmitStep/SubmitStep';
import toast from 'react-hot-toast';
import { useCreateCampaign } from '@/features/campaigns/useCreateCampaign';
import { useCreateAdSet } from '@/features/adSets/useCreateAdSet';
import { useSearchParams } from 'next/navigation';
import { MORTGAGE_PLAN_LEVELS } from '@/utils/constants';

function CampaignForm({ onSubmit }) {
  const searchParams = useSearchParams();
  const planType = searchParams.get('plan'); // Use Next.js' useSearchParams to get the query parameter

  const { createCampaign, isCreating: isCreatingCampaign } =
    useCreateCampaign();
  const { createAdSet, isCreating: isCreatingAdSet } = useCreateAdSet();

  const selectedPlan = MORTGAGE_PLAN_LEVELS.find(
    (plan) => plan.name === planType
  );

  async function handleSubmit(data) {
    try {
      const campaign = await new Promise((resolve, reject) =>
        createCampaign(data, {
          onSuccess: resolve,
          onError: reject
        })
      );

      await new Promise((resolve, reject) =>
        createAdSet(
          {
            campaignId: campaign.id,
            budget: data.budget,
            geoLocations: data.states
          },
          {
            onSuccess: resolve,
            onError: reject
          }
        )
      );

      onSubmit(data);
      toast.success('Campaign and Ad Set created successfully!');
    } catch (error) {
      toast.error(error.message || 'An error occurred during submission.');
    }
  }

  return (
    <MultiStepForm
      steps={[NameCampaignStep, BudgetStep, StatesStep, SubmitStep]}
      onSubmit={handleSubmit}
      isSubmitting={isCreatingCampaign || isCreatingAdSet}
      leftContent={selectedPlan}
    />
  );
}

export default CampaignForm;
