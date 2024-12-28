import styled, { css } from 'styled-components';

const Form = styled.form`
  ${(props) =>
    props.type === 'regular' &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === 'modal' &&
    css`
      width: 100%;
      max-width: 80rem; /* Ensure the modal does not exceed 800px */
      margin: 0 auto; /* Center the modal within its container */
    `}

  overflow: hidden;
  font-size: 1.4rem;
  box-sizing: border-box; /* Ensure padding is included in the width */
`;

Form.defaultProps = {
  type: 'regular'
};

export default Form;
