'use client';
import Link from 'next/link';
import { useUser } from '@/features/auth/useUser';
import { useLogout } from '@/features/auth/useLogout';
import Spinner from '../Spinner';
import styled from 'styled-components';
import ProfileDropdown from '../ProfileDropdown';

export const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 4rem;
  color: var(--color-grey-100);
  list-style: none;

  @media (max-width: 768px) {
    /* mobile dropdown logic */
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

function HeaderMenu({ isOpen }) {
  const { user, isAuthenticated, isLoading } = useUser();
  const { logout } = useLogout();

  const menuItems = [
    { href: '/campaigns', label: "Campaign's" },
    { href: '/checkout', label: 'Checkout' }
  ];

  if (isLoading) return <Spinner />;

  return (
    <StyledHeaderMenu isOpen={isOpen}>
      {menuItems.map(({ href, label }) => (
        <li key={href}>
          <Link
            href={href}
            // window.location.pathname might not always be reliable in Next 13
            // But if it works for you, you can keep this logic
            className={href === window.location.pathname ? 'active' : ''}
          >
            {label}
          </Link>
        </li>
      ))}

      <li>
        {!isAuthenticated ? (
          <Link
            href="/login"
            className={window.location.pathname === '/login' ? 'active' : ''}
          >
            Login
          </Link>
        ) : (
          <ProfileDropdown user={user} onLogout={logout} />
        )}
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
