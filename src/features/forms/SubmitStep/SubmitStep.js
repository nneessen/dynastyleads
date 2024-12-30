import styled from 'styled-components';
import Heading from '@/ui/Heading/Heading';

function SubmitStep({ formData, onSubmit }) {
  return (
    <StepContainer>
      <Heading style={{ color: 'var(--color-grey-900)' }} as="h1">
        Confirm Details
      </Heading>
      <ReviewContainer>
        <p>
          <strong>Campaign Name:</strong> {formData.campaignName}
        </p>
        <p>
          <strong>Budget:</strong> ${formData.budget}
        </p>
        <p>
          <strong>States:</strong>{' '}
          {formData.states?.join(', ') || 'None Selected'}
        </p>
      </ReviewContainer>
      <SubmitButton onClick={() => onSubmit?.(formData)}>Submit</SubmitButton>
    </StepContainer>
  );
}

export default SubmitStep;

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
