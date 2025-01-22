'use client';
import { useState } from 'react';
import styled from 'styled-components';
import { FaUser } from 'react-icons/fa';

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
  list-style: none;
  border-radius: 8px;
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

  return (
    <ProfileDropdownContainer>
      <ProfileButton onClick={toggleDropdown}>
        <FaUser />
        {user || 'Profile'}
      </ProfileButton>
      {isOpen && (
        <DropdownMenu>
          <MenuItem>
            <button onClick={onLogout}>Logout</button>
          </MenuItem>
        </DropdownMenu>
      )}
    </ProfileDropdownContainer>
  );
}
