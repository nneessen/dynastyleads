'use client';

import styled from 'styled-components';
import Heading from '@/ui/Heading';
import { useUser } from '@/features/auth/useUser';

function SubmitStep({ formData, onSubmit }) {
  // 1) Get the logged-in user from Supabase
  const { user, isLoading } = useUser();

  /**
   * Called when user clicks "Submit".
   * We'll inject user_id into formData, then call onSubmit(formData).
   */
  async function handleFinalSubmit() {
    console.log('[DEBUG SubmitStep] handleFinalSubmit called.');

    // 2) If still loading user or no user, block or show error
    if (isLoading) {
      console.log(
        '[DEBUG SubmitStep] user is still loading, can’t submit yet.'
      );
      return;
    }
    if (!user?.id) {
      console.log('[DEBUG SubmitStep] no user?.id, cannot create campaign.');
      alert('You must be logged in to create a campaign');
      return;
    }

    // 3) Insert user_id into formData
    formData.user_id = user.id;

    console.log(
      '[DEBUG SubmitStep] final formData before onSubmit ->',
      formData
    );

    // 4) Call onSubmit with the updated formData
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

      {/* 5) The button triggers handleFinalSubmit */}
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
