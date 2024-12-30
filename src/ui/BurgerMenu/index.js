import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';

const Burger = styled.button`
  background: none;
  border: none;
  color: var(--color-grey-100);
  font-size: 2rem;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

export default function BurgerMenu({ isOpen, toggleMenu }) {
  return (
    <Burger onClick={toggleMenu}>{isOpen ? <FaTimes /> : <FaBars />}</Burger>
  );
}
