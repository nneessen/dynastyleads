'use client';
import { useState } from 'react';
import styled from 'styled-components';
import ButtonGroup from '@/ui/ButtonGroup/ButtonGroup';
import Button from '@/ui/Button/Button';
import Heading from '@/ui/Heading/Heading';

const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 75vh;
  overflow: hidden;
  border-radius: var(--border-radius-md);
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color-grey-900);
  color: var(--color-grey-100);
  padding: 2rem;
  overflow-y: auto;
`;

const LeftTopSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const LeftBottomSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  background-color: var(--color-grey-300);
  padding: 2rem;
  border-radius: var(--border-radius-md);
  margin: 1rem;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color-grey-300);
  padding: 2rem;
`;

const RightTopSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const RightBottomSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 2rem;
`;

const StepNavigation = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const PlanDetails = styled.div`
  p {
    line-height: 1.6rem;
    font-size: 1.2rem;
  }
  ul {
    list-style: disc;
    line-height: 1.6rem;
    padding-left: 1.5rem;
    font-size: 1.2rem;
  }
`;

function MultiStepForm({ steps, initialData, onSubmit, leftContent }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState(initialData || {});

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  function next() {
    if (!isLastStep) setCurrentStepIndex((prev) => prev + 1);
  }

  function back() {
    if (!isFirstStep) setCurrentStepIndex((prev) => prev - 1);
  }

  function handleSubmit() {
    onSubmit(formData);
  }

  const StepComponent =
    steps[currentStepIndex] || (() => <div>Step Not Found</div>);

  return (
    <PageContainer>
      {/* Left Column */}
      <LeftColumn>
        <LeftTopSection>
          {leftContent && (
            <PlanDetails>
              <Heading style={{ marginBottom: '1rem' }} as="h3">
                {leftContent.name}
              </Heading>
              <p>{leftContent.descriptionLong}</p>
              <p>Cost Per Lead: ${leftContent.costPerLead}</p>
              <p style={{ marginBottom: '1rem' }}>
                <>Minimum Purchase:</>
                {leftContent.minPurchaseRequirement} lead(s)
              </p>
              {leftContent.dataCollected && (
                <>
                  <Heading as="h3">Data Collected:</Heading>
                  <ul>
                    {leftContent.dataCollected.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </PlanDetails>
          )}
        </LeftTopSection>
        <LeftBottomSection>
          <>
            <div style={{ color: 'var(--color-grey-700)' }}>
              TODO: This section will display a collection of statistics
              regarding the performance metrics of this particular plan
            </div>
            <div style={{ color: 'var(--color-grey-700)' }}>
              This could contain a small table maybe, or metrics based on the
              users prior history of success/failure with this plan
            </div>
          </>
        </LeftBottomSection>
      </LeftColumn>

      {/* Right Column */}
      <RightColumn>
        <RightTopSection>
          <StepComponent
            formData={formData}
            updateData={(updatedFields) =>
              setFormData((prev) => ({ ...prev, ...updatedFields }))
            }
          />
        </RightTopSection>
        <RightBottomSection>
          <StepNavigation>
            <ButtonGroup>
              {!isFirstStep && (
                <Button $size="small" $variation="danger" onClick={back}>
                  Back
                </Button>
              )}
              {!isLastStep ? (
                <Button onClick={next} $size="small" $variation="primary">
                  Next
                </Button>
              ) : (
                <Button
                  $size="small"
                  $variation="primary"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              )}
            </ButtonGroup>
          </StepNavigation>
        </RightBottomSection>
      </RightColumn>
    </PageContainer>
  );
}

export default MultiStepForm;
