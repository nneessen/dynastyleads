'use client';

import styled from 'styled-components';
import Heading from '@/ui/Heading';
import { useUser } from '@/features/auth/useUser';

/**
 * SubmitStep is the final step in the multi-step form.
 * We ensure that user_id is attached to formData right before calling onSubmit.
 */
function SubmitStep({ formData, onSubmit }) {
  // 1) Get the logged-in user
  const { user, isLoading } = useUser();

  // 2) Final click handler
  async function handleFinalSubmit() {
    console.log('[DEBUG SubmitStep] handleFinalSubmit called.');

    // If user is still loading, block
    if (isLoading) {
      console.log('[DEBUG SubmitStep] user isLoading => cannot submit yet.');
      return;
    }
    // If user has no id, show error or block
    if (!user?.id) {
      console.log(
        '[DEBUG SubmitStep] user?.id is missing => cannot create campaign.'
      );
      alert('You must be logged in to create a campaign');
      return;
    }

    // 3) The critical fix:
    // Attach user_id to the final formData
    formData.user_id = user.id;

    console.log('[DEBUG SubmitStep] final formData ->', formData);

    // 4) Call the onSubmit from MultiStepForm
    // which calls your useCreateCampaign logic
    onSubmit?.(formData);
  }

  return (
    <StepContainer>
      <Heading style={{ color: 'var(--color-grey-900)' }} as="h1">
        Confirm Details
      </Heading>

      <ReviewContainer>
        <p>
          <strong>Campaign Name:</strong> {formData.campaign_name || '(none)'}
        </p>
        <p>
          <strong>Budget:</strong> {formData.budget || '(none)'}
        </p>
        <p>
          <strong>States:</strong>{' '}
          {formData.states?.join(', ') || 'None Selected'}
        </p>
      </ReviewContainer>

      <SubmitButton onClick={handleFinalSubmit}>Submit</SubmitButton>
    </StepContainer>
  );
}

export default SubmitStep;

/** Styles **/
const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
`;

const ReviewContainer = styled.div`
  margin-bottom: 20px;
  text-align: left;
  width: 100%;
  max-width: 400px;
  padding: 10px;
  color: var(--color-grey-900);
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
