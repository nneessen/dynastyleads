'use client';

import styled from 'styled-components';
import { useRouter } from 'next/navigation';

const CampaignContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const GlowButton = styled.button`
  width: 200px;
  height: 40px;
  background-color: transparent;
  color: #fff;
  text-transform: uppercase;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 0 5px var(--color-grey-100);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0 15px var(--color-accent-red);
  }
`;

export default function ChooseCampaign({ campaignType }) {
  const router = useRouter();

  function handleClick() {
    const slug = campaignType.toLowerCase().replace(/\s+/g, '-');
    router.push(`/plans/${slug}`);
  }

  return (
    <CampaignContainer>
      <GlowButton onClick={handleClick}>{campaignType}</GlowButton>
    </CampaignContainer>
  );
}
