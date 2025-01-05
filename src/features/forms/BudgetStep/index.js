import styled from 'styled-components';
import Input from '../../../ui/Input/index.js';
import Heading from '../../../ui/Heading/index.js';

function BudgetStep({ formData, updateData }) {
  return (
    <StepContainer>
      <Heading
        as="h1"
        style={{
          color: 'var(--color-grey-900)',
          fontWeight: 500,
          marginBottom: '2rem',
          textAlign: 'center'
        }}
      >
        Set Your Budget
      </Heading>
      <Input
        type="number"
        value={formData.budget || ''}
        onChange={(e) => updateData({ budget: e.target.value })}
        placeholder="Enter your budget"
        autoFocus
      />
    </StepContainer>
  );
}

export default BudgetStep;

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;
