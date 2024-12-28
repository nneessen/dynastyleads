'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '@/ui/Card/Card';
import Row from '@/ui/Row/Row';
import Heading from '@/ui/Heading/Heading';
import Button from '@/ui/Button/Button';

const plansByCampaign = {
  'mortgage-protection': [
    {
      name: 'Prime',
      descriptionShort: 'Highest Intent and 100% exclusive.',
      costPerLead: 50,
      minPurchaseRequirement: 10
    },
    {
      name: 'Elite',
      descriptionShort:
        'Highest Intent leads. Remain yours for 90 days if not sold.',
      costPerLead: 40,
      minPurchaseRequirement: 10
    },
    {
      name: 'Select',
      descriptionShort: 'Cheaper leads with moderate intent.',
      costPerLead: 5,
      minPurchaseRequirement: 1
    },
    {
      name: 'Advantage',
      descriptionShort: 'Cheaper leads with moderate intent.',
      costPerLead: 5,
      minPurchaseRequirement: 1
    },
    {
      name: 'Starter',
      descriptionShort: 'Cheaper leads with moderate intent.',
      costPerLead: 5,
      minPurchaseRequirement: 1
    },
    {
      name: 'Custom',
      descriptionShort: 'Custom lead solutions tailored to your needs.',
      costPerLead: 5,
      minPurchaseRequirement: 1
    }
  ],
  'final-expense': [
    {
      name: 'Platinum',
      descriptionShort: 'Top-tier final expense leads.',
      costPerLead: 15,
      minPurchaseRequirement: 5
    }
  ]
};

export default function PlansPage({ params }) {
  const router = useRouter();
  const [slug, setSlug] = useState(null);

  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params; // Await the promise to resolve
      setSlug(resolvedParams.slug);
    }
    fetchParams();
  }, [params]);

  if (!slug) {
    return <PageContainer>Loading...</PageContainer>;
  }

  const campaignPlans = plansByCampaign[slug] || [];

  if (campaignPlans.length === 0) {
    return (
      <PageContainer>
        <PageTitle>Invalid Campaign Type</PageTitle>
        <Button onClick={() => router.push('/')}>Go Back Home</Button>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Row>
        <CenterText>
          <PageTitle as="h1">{slugToTitle(slug)} Plans</PageTitle>
        </CenterText>
      </Row>

      <PlansGrid>
        {campaignPlans.map((plan) => (
          <PlanCard key={plan.name} plan={plan} router={router} />
        ))}
      </PlansGrid>
    </PageContainer>
  );
}

function PlanCard({ plan, router }) {
  const { name, descriptionShort, costPerLead, minPurchaseRequirement } = plan;

  return (
    <DarkCard>
      <PlanDescription>{descriptionShort}</PlanDescription>
      <Details>
        <strong>Cost Per Lead:</strong> ${costPerLead}
      </Details>
      <Details>
        <strong>Minimum Purchase:</strong> {minPurchaseRequirement} lead(s)
      </Details>
      <ButtonGroup>
        <PlanButton
          $size="small"
          $variation="danger"
          onClick={() => router.push(`/plans/${name.toLowerCase()}`)}
        >
          Learn More
        </PlanButton>
        <PlanButton
          $size="small"
          $variation="secondary"
          onClick={() =>
            router.push(`/create-campaign?plan=${encodeURIComponent(name)}`)
          }
        >
          Choose Plan
        </PlanButton>
      </ButtonGroup>
    </DarkCard>
  );
}

function slugToTitle(slug) {
  return slug
    .split('-')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

const PageContainer = styled.div`
  max-width: 1500px;
  margin: 0 auto;
`;

const PageTitle = styled(Heading)`
  font-size: 3rem;
  text-align: center;
  color: var(--color-grey-100);
`;

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  width: 100%;
  padding: 1rem;
`;

const DarkCard = styled(Card)`
  color: var(--color-grey-100);
  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const ButtonGroup = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
`;

const PlanDescription = styled.div`
  text-align: start;
  margin-bottom: 2rem;
  font-size: 1.25rem;
  font-weight: 300;
  color: var(--color-grey-100);
`;

const Details = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: var(--color-grey-100);
  font-weight: 300;
`;

const PlanButton = styled(Button)`
  margin-top: 1rem;
`;

const CenterText = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 24px;
`;
