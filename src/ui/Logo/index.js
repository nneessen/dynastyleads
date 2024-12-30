import styled from 'styled-components';
import Image from 'next/image';
import LOGO from '/public/solid_leads_logo.png';

const StyledLogo = styled.div`
  text-align: center;
`;

function Logo() {
  return (
    <StyledLogo>
      <Image src={LOGO} alt="Logo" width={150} height={150} priority />
    </StyledLogo>
  );
}

export default Logo;
