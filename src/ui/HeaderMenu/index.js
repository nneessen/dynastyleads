'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styled from 'styled-components';
import ProfileDropdown from '../ProfileDropdown';

export const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 4rem;
  color: var(--color-grey-100);
  list-style: none;
  /* ... */
`;

export default function HeaderMenu({ isOpen }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (!res.ok) throw new Error('Logout failed');
      router.push('/login');
    } catch (err) {
      console.error(err);
    }
  }
  const menuItems = [
    { href: '/campaigns', label: "Campaign's" },
    { href: '/checkout', label: 'Checkout' }
  ];

  return (
    <StyledHeaderMenu isOpen={isOpen}>
      {menuItems.map(({ href, label }) => (
        <li key={href}>
          <Link href={href} className={pathname === href ? 'active' : ''}>
            {label}
          </Link>
        </li>
      ))}

      <li>
        <ProfileDropdown user="Nick" onLogout={handleLogout} />
      </li>
    </StyledHeaderMenu>
  );
}
