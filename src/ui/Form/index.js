// ui/Form/index.js
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 2rem;
  background-color: var(--color-grey-100);
  border-radius: var(--border-radius-md);
  width: 100%;
  max-width: 32rem; /* limit width */
`;

export default Form;
