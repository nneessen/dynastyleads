import styled from 'styled-components';

const StyledFormRow = styled.div`
  font-family: 'Plus Jakarta Sans', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
`;

const Label = styled.label`
  font-family: inherit;
  font-weight: 400;
  /* filter: invert(1); // remove unless you specifically want inverted color */
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
  margin: 0.25rem 0 0 0;
`;

function FormRowVertical({ label, error, children, ...props }) {
  if (!props.id) {
    console.error(`FormRowVertical requires an 'id' prop. Received:`, props);
  }
  return (
    <StyledFormRow {...props}>
      {label && <Label htmlFor={props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRowVertical;
