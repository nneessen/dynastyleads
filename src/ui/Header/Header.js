import HeaderMenu from '../HeaderMenu/HeaderMenu';
// import Logo from './Logo';
import { StyledHeader } from './HeaderStyles';

export default function Header() {
  return (
    <StyledHeader>
      {/* <Logo /> */}
      <HeaderMenu />
    </StyledHeader>
  );
}
