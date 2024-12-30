import Heading from '@/ui/Heading';
import CheckboxGroup from '../../../ui/CheckboxGroup/index.js';
import styled from 'styled-components';
import statesJson from '../../../data/states.json';

function StatesStep({ formData, updateData }) {
  const handleStateChange = (selectedStates) => {
    updateData({ states: selectedStates });
  };

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
        {' '}
        Pick Your States
      </Heading>
      <CheckboxGroup
        options={statesJson}
        name="states"
        selected={formData.states || []}
        onChange={handleStateChange}
      />
    </StepContainer>
  );
}

export default StatesStep;

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;
