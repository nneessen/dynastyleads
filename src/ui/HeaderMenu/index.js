'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  const pathname = usePathname();

  const isAuthenticated = true;
  // TODO: isAuthenticated is doing nothing and i don't know what to do.
  const menuItems = [
    { href: '/campaigns', label: "Campaign's" },
    { href: '/checkout', label: 'Checkout' }
  ];

  return (
    <StyledHeaderMenu isOpen={isOpen}>
      {menuItems.map(({ href, label }) => (
        <li key={href}>
          <Link href={href} className={href === pathname ? 'active' : ''}>
            {label}
          </Link>
        </li>
      ))}

      <li>
        {!isAuthenticated ? (
          <Link href="/login" className={pathname === '/login' ? 'active' : ''}>
            Login
          </Link>
        ) : (
          <ProfileDropdown
            user={'Nick'}
            onLogout={() => console.log('logout')}
          />
        )}
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
