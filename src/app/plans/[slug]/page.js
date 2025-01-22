// app/plans/[slug]/page.js (Server Component)
import PlansPageClient from './PlansPageClient';

// Example static data
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

export default async function PlansPage({ params: paramsPromise }) {
  // Unwrap the params promise in Next.js 15
  const { slug } = await paramsPromise;

  // Retrieve the plans for this slug
  const campaignPlans = plansByCampaign[slug] || [];

  // Return a client component to actually render the UI
  return <PlansPageClient slug={slug} campaignPlans={campaignPlans} />;
}
