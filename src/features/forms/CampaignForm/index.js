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
