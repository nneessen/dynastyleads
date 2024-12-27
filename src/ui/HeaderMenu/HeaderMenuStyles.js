import styled from 'styled-components';
import Button from '../Button/Button';

export const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 4rem;
  color: var(--color-grey-100);
  list-style: none;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    background: var(--color-grey-900);
    padding: 1rem;
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 100;
    border-radius: 8px;
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  }

  li {
    font-size: 1.6rem;
  }

  a {
    text-decoration: none;
    color: var(--color-grey-100);
    transition: color 0.3s;

    &:hover {
      color: var(--color-accent-red);
    }

    &.active {
      font-weight: bold;
      color: var(--color-accent-blue);
    }
  }
`;

const StyledLogoutButton = styled(Button)`
  background: none;
  border: none;
  color: var(--color-grey-100);
  font-size: 1.6rem;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: var(--color-accent-red);
  }
`;
