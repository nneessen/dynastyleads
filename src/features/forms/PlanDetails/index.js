import styled from 'styled-components';

export default function PlanDetails({ plan }) {
  if (!plan) return null;

  return (
    <DetailsWrapper>
      <h2>{plan.name}</h2>
      <p>{plan.descriptionLong}</p>
      <p>
        <strong>Cost Per Lead:</strong> ${plan.costPerLead}
      </p>
      <p>
        <strong>Minimum Purchase:</strong> {plan.minPurchaseRequirement} lead(s)
      </p>
    </DetailsWrapper>
  );
}

const DetailsWrapper = styled.div`
  text-align: left;
  color: var(--color-grey-100);
  font-size: 1.4rem;
  line-height: 1.6;
  padding: 2rem;

  h2 {
    font-size: 2.4rem;
    margin-bottom: 1rem;
  }

  p {
    margin: 0.5rem 0;
  }
`;
