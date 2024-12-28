import { StyledHeaderMenu, StyledLogoutButton } from './HeaderMenuStyles';
import Link from 'next/link';
import { useUser } from '@/features/auth/useUser';
import { useLogout } from '@/features/auth/useLogout';
import Spinner from '../Spinner/Spinner';

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
            href="/auth/login"
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
