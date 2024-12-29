'use client';
import styled from 'styled-components';
import Heading from '../../../ui/Heading/Heading.js';
import Input from '../../../ui/Input/Input.js';

function NameCampaignStep({ formData, updateData }) {
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
        Name Your Campaign
      </Heading>
      <Input
        style={{
          display: 'grid'
        }}
        type="text"
        value={formData.campaignName || ''}
        onChange={(e) => updateData({ campaignName: e.target.value })}
        placeholder="Enter campaign name"
      />
    </StepContainer>
  );
}

export default NameCampaignStep;

const StepContainer = styled.div`
  display: block;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;
