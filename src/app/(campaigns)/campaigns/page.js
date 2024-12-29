'use client';

import React from 'react';
import styled from 'styled-components';
import {
  FaShieldAlt,
  FaHandHoldingUsd,
  FaChartLine,
  FaUsers
} from 'react-icons/fa';
import ChooseCampaign from '@/features/campaigns/ChooseCampaign';
import Heading from '@/ui/Heading/Heading';

export default function CampaignsPage() {
  const campaigns = [
    {
      type: 'Mortgage Protection',
      icon: <FaShieldAlt />,
      description:
        'High-intent leads tailored for mortgage protection policies.'
    },
    {
      type: 'Final Expense',
      icon: <FaHandHoldingUsd />,
      description: 'Leads focused on final expense coverage opportunities.'
    },
    {
      type: 'IUL',
      icon: <FaChartLine />,
      description:
        'Leads interested in Indexed Universal Life insurance products.'
    },
    {
      type: 'Veterans',
      icon: <FaUsers />,
      description: 'Targeted leads from veterans seeking specialized plans.'
    }
  ];

  return (
    <PageContainer>
      <PageTitle as="h1">Choose Your Campaign</PageTitle>
      <CampaignGrid>
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.type}>
            <CardContent>
              <InfoCard>
                <SmallIconWrapper>{campaign.icon}</SmallIconWrapper>
                <Description>{campaign.description}</Description>
              </InfoCard>
            </CardContent>
            <BottomButtonWrapper>
              <ChooseCampaign campaignType={campaign.type} />
            </BottomButtonWrapper>
          </CampaignCard>
        ))}
      </CampaignGrid>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PageTitle = styled(Heading)`
  font-weight: 400;
  margin-bottom: 2rem;
  text-align: center;
  color: var(--color-grey-100);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const CampaignGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  width: 100%;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const CampaignCard = styled.div`
  position: relative;
  background-color: var(--color-grey-900);
  border-radius: 12px;
  min-height: 220px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

const CardContent = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoCard = styled.div`
  background-color: var(--color-grey-50);
  border-radius: 12px;
  padding: 1rem;
  width: 90%;
  max-width: 300px;
  text-align: center;
  margin: 1rem auto;
  color: #333;
`;

const SmallIconWrapper = styled.div`
  font-size: 3rem;
  color: var(--color-primary);
  margin-bottom: 0.75rem;
`;

const Description = styled.p`
  font-size: 1rem;
  color: var(--color-grey-300);
  line-height: 1.4;
  margin: 0.5rem 0;
`;

const BottomButtonWrapper = styled.div`
  padding-bottom: 1rem;
`;
