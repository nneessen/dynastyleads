import Link from 'next/link';
import { useUser } from '@/features/auth/useUser';
import { useLogout } from '@/features/auth/useLogout';
import Spinner from '../Spinner';
import styled from 'styled-components';
import Button from '../Button';

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

export const StyledLogoutButton = styled(Button)`
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

function HeaderMenu({ isOpen }) {
  const { user, isAuthenticated, isLoading } = useUser();
  const { logout } = useLogout();

  const menuItems = [
    { href: '/products', label: 'Products' },
    { href: '/campaigns', label: "Campaign's" },
    { href: '/how-it-works', label: 'How it works?' },
    { href: '/checkout', label: 'Checkout' }
  ];

  if (isLoading) return <Spinner />;

  return (
    <StyledHeaderMenu isOpen={isOpen}>
      {menuItems.map(({ href, label }) => (
        <li key={href}>
          <Link
            href={href}
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
          <StyledLogoutButton onClick={logout}>Logout</StyledLogoutButton>
        )}
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
