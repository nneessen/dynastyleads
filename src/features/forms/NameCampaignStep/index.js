'use client';

import styled from 'styled-components';
import Heading from '@/ui/Heading';
import Input from '@/ui/Input';

/**
 * This step updates the "campaign_name" field instead of "campaignName".
 * The server-side route checks "campaign_name".
 */
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
        style={{ display: 'grid' }}
        type="text"
        value={formData.campaign_name || ''}
        onChange={(e) => updateData({ campaign_name: e.target.value })}
        placeholder="Enter campaign name"
        autoFocus
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
