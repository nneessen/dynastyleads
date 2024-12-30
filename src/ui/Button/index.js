import styled, { css } from 'styled-components';

const sizes = {
  small: css`
    font-size: 1rem;
    padding: 1rem 1.2rem;
    border-radius: var(--border-radius-sm);
    text-transform: uppercase;
    font-weight: 400;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `
};

const baseStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-weight: 500;
  background-color: transparent;
`;

const variations = {
  primary: css`
    ${baseStyle};
    background-color: var(--color-accent-blue);
    color: var(--color-grey-100);

    &:hover {
      color: var(--color-grey-100);
      font-weight: 600;
      background-color: var(--color-grey-900);
    }
  `,
  secondary: css`
    ${baseStyle};
    background-color: var(--color-grey-300);
    color: var(--color-grey-900);

    &:hover {
      backrgound-color: var(--color-grey-800);
      color: var(--color-grey-0);
    }
  `,
  danger: css`
    ${baseStyle};
    color: var(--color-accent-red);
    border: 1px solid var(--color-accent-red);
    box-shadow: var(--color-accent-red) var(--shadow-sm);

    &:hover {
      color: var(--color-accent-red);
    }
  `,
  green: css`
    ${baseStyle};
    color: var(--color-accent-blue);
  `,
  glow: css`
    ${baseStyle};
    background-color: transparent;
    color: ${({ $glowColor }) => $glowColor || 'var(--color-grey-100)'};
    &:hover {
      box-shadow: 0 0 10px
        ${({ $glowColor }) => $glowColor || 'var(--color-accent-blue)'};
    }
  `
};

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: var(--border-radius-md);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  ${({ $size }) => sizes[$size]}
  ${({ $variation }) => variations[$variation]}

  &:hover {
    transform: scale(1.05); /* Slight scaling on hover */
  }

  &:active {
    transform: scale(0.95); /* Slight shrinking on click */
    box-shadow: var(--shadow-sm); /* Shadow reduces on click */
  }
`;

Button.defaultProps = {
  $variation: 'primary',
  $size: 'medium'
};

export default Button;
