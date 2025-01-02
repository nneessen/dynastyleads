import { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { FaUser } from 'react-icons/fa'; // or any other icon
import Button from '../Button';

const ProfileDropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ProfileButton = styled.button`
  background: none;
  border: none;
  color: var(--color-grey-100);
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.4rem;

  &:hover {
    color: var(--color-accent-red);
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  background: var(--color-grey-900);
  padding: 1rem;
  margin: 0;
  list-style: none;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MenuItem = styled.li`
  font-size: 1.4rem;

  a,
  button {
    color: var(--color-grey-100);
    text-decoration: none;
    background: none;
    border: none;
    cursor: pointer;
    font: inherit;
  }

  &:hover a,
  &:hover button {
    color: var(--color-accent-red);
  }
`;

export default function ProfileDropdown({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen((prev) => !prev);
  }

  // Close the dropdown if you click outside (optional):
  // You can implement a useEffect with a click event listener, etc.

  return (
    <ProfileDropdownContainer>
      <ProfileButton onClick={toggleDropdown}>
        <FaUser />
        {user?.user_metadata?.full_name || user?.email || 'Profile'}
      </ProfileButton>
      {isOpen && (
        <DropdownMenu>
          <MenuItem>
            <Link href="/settings">Settings</Link>
          </MenuItem>
          <MenuItem>
            <Link href="/profile">Profile</Link>
          </MenuItem>
          <MenuItem>
            <button onClick={onLogout}>Logout</button>
          </MenuItem>
        </DropdownMenu>
      )}
    </ProfileDropdownContainer>
  );
}
