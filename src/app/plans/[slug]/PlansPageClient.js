'use client';

import Link from 'next/link';
import Row from '@/ui/Row';
import Card from '@/ui/Card';
import Heading from '@/ui/Heading';
import Button from '@/ui/Button';

export default function PlansPageClient({ slug, campaignPlans }) {
  // If invalid slug
  if (!campaignPlans || campaignPlans.length === 0) {
    return (
      <Row
        type="vertical"
        align="center"
        gap="2rem"
        style={{ marginTop: '4rem', width: '100%' }}
      >
        <Heading as="h1">Invalid Campaign Type</Heading>
        <Button onClick={() => (window.location.href = '/')}>
          Go Back Home
        </Button>
      </Row>
    );
  }

  return (
    <Row
      type="vertical"
      align="stretch"
      gap="2rem"
      style={{ marginTop: '4rem', width: '100%' }}
    >
      {/* Page Header */}
      <Row type="vertical" align="center" gap="1rem">
        <Heading as="h1">{slugToTitle(slug)} Plans</Heading>
        <Heading as="h2" style={{ fontWeight: '300', fontSize: '1.6rem' }}>
          Select the plan that fits your budget and growth goals.
        </Heading>
      </Row>

      {/* Cards Grid */}
      <Row
        type="horizontal"
        align="start"
        gap="2rem"
        style={{ flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {campaignPlans.map((plan) => (
          <PlanCard key={plan.name} plan={plan} />
        ))}
      </Row>
    </Row>
  );
}

function PlanCard({ plan }) {
  const { name, descriptionShort, costPerLead, minPurchaseRequirement } = plan;

  return (
    <Card title={name} bgColor="var(--color-grey-800)">
      <Row type="vertical" gap="0.8rem">
        <p style={{ fontSize: '1.4rem', fontWeight: '300', margin: 0 }}>
          {descriptionShort}
        </p>
        <p style={{ fontSize: '1.2rem', margin: 0 }}>
          <strong>Cost/Lead:</strong> ${costPerLead}
        </p>
        <p style={{ fontSize: '1.2rem', margin: 0 }}>
          <strong>Minimum Purchase:</strong> {minPurchaseRequirement} lead(s)
        </p>
      </Row>

      <Row type="horizontal" gap="1rem" style={{ marginTop: '1.2rem' }}>
        <Link href={`/plans/${name.toLowerCase()}`}>
          <Button $size="small" $variation="danger">
            Learn More
          </Button>
        </Link>
        <Link href={`/create-campaign?plan=${encodeURIComponent(name)}`}>
          <Button $size="small" $variation="secondary">
            Choose Plan
          </Button>
        </Link>
      </Row>
    </Card>
  );
}

// Helper to transform slug to Title Case
function slugToTitle(slug) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
