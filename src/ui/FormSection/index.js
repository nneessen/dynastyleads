import styled from 'styled-components';

const StyledFormSection = styled.div`
  display: flex;
  flex-direction: column; /* Ensure children stack vertically */
  gap: 1.6rem;
  width: 100%;
  max-width: 750px; /* Enforce the maximum width */
  margin: 0 auto; /* Center the section */
  padding: 1.2rem 0;
  box-sizing: border-box; /* Include padding in total width calculation */
`;

const SectionLabel = styled.label`
  font-weight: 500;
  font-size: 1.5rem;
`;

function FormSection({ label, children }) {
  return (
    <StyledFormSection>
      {label && <SectionLabel>{label}</SectionLabel>}
      {children}
    </StyledFormSection>
  );
}

export default FormSection;
