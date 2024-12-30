import HeaderMenu from '../HeaderMenu/HeaderMenu';
import Logo from '@/ui/Logo';
import styled from 'styled-components';

export const StyledHeader = styled.header`
  background-color: transparent;
  padding: 2.5rem 4.8rem;
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  z-index: 10;

  @media (max-width: 768px) {
    padding: 1.5rem 2rem;
    gap: 1.6rem;
  }
`;

export default function Header() {
  return (
    <StyledHeader>
      <Logo />
      <HeaderMenu />
    </StyledHeader>
  );
}
