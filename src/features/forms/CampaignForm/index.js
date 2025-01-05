'use client';

import { useSearchParams } from 'next/navigation';
import MultiStepForm from '../../../ui/MultiStepForm/index.js';
import NameCampaignStep from '../NameCampaignStep/index.js';
import BudgetStep from '../BudgetStep/index.js';
import StatesStep from '../StatesStep/index.js';
import SubmitStep from '../SubmitStep/index.js';
import toast from 'react-hot-toast';
import { useCreateCampaign } from '../../campaigns/useCreateCampaign.js';
import { useCreateAdSet } from '../../adSets/useCreateAdSet.js';
import { MORTGAGE_PLAN_LEVELS } from '../../../utils/constants.js';

/**
 * Final version to ensure user_id is present.
 * We'll forcibly set user_id = "test-001" so it definitely shows up in the debug logs.
 * If your server still sees no user_id, it means the code isn't being used or is overridden.
 */
function CampaignForm({ onSubmit }) {
  const searchParams = useSearchParams();
  const planType = searchParams.get('plan');

  const { createCampaign, isCreating: isCreatingCampaign } =
    useCreateCampaign();
  const { createAdSet, isCreating: isCreatingAdSet } = useCreateAdSet();

  const selectedPlan = MORTGAGE_PLAN_LEVELS.find(
    (plan) => plan.name === planType
  );

  async function handleSubmit(formData) {
    try {
      // 1) Force user_id for demonstration
      formData.user_id = 'test-001';

      // 2) Debug log so you see EXACT final data
      console.log('[DEBUG handleSubmit] final formData ->', formData);

      // 3) Create the campaign
      const campaign = await new Promise((resolve, reject) =>
        createCampaign(formData, {
          onSuccess: resolve,
          onError: reject
        })
      );

      // 4) Optionally create an ad set
      await new Promise((resolve, reject) =>
        createAdSet(
          {
            campaignId: campaign.id,
            budget: formData.budget,
            geoLocations: formData.states
          },
          {
            onSuccess: resolve,
            onError: reject
          }
        )
      );

      onSubmit(formData);
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
