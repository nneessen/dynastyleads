'use client';

import dynamicImport from 'next/dynamic';
// Force dynamic so Next won't try to prerender
export const dynamic = 'force-dynamic';

import MultiStepForm from '@/ui/MultiStepForm';
const NameCampaignStep = dynamicImport(
  () => import('@/features/forms/NameCampaignStep')
);
const BudgetStep = dynamicImport(() => import('@/features/forms/BudgetStep'));
const StatesStep = dynamicImport(() => import('@/features/forms/StatesStep'));
const SubmitStep = dynamicImport(() => import('@/features/forms/SubmitStep'));

import toast from 'react-hot-toast';
import { useCreateCampaign } from '@/features/campaigns/useCreateCampaign';
import { useCreateAdSet } from '@/features/adSets/useCreateAdSet';
import { useSearchParams } from 'next/navigation';
import { MORTGAGE_PLAN_LEVELS } from '@/utils/constants';

function CampaignForm({ onSubmit }) {
  const searchParams = useSearchParams();
  const planType = searchParams.get('plan');

  const { createCampaign, isCreating: isCreatingCampaign } =
    useCreateCampaign();
  const { createAdSet, isCreating: isCreatingAdSet } = useCreateAdSet();

  const selectedPlan = MORTGAGE_PLAN_LEVELS.find(
    (plan) => plan.name === planType
  );

  async function handleSubmit(data) {
    try {
      const [campaign] = await Promise.all([
        new Promise((resolve, reject) =>
          createCampaign(data, {
            onSuccess: resolve,
            onError: reject
          })
        )
      ]);

      await new Promise((resolve, reject) =>
        createAdSet(
          {
            campaignId: campaign.id, // from the newly created campaign
            budget: data.budget, // or daily_budget
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
