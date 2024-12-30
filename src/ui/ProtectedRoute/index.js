import styled from 'styled-components';
import { useUser } from '@/features/auth/useUser';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// Styled Component for Full-Page Centered Loading Spinner
const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

/**
 * ProtectedRoute Component
 * Wraps around child components to restrict access based on user authentication.
 * Redirects unauthenticated users to the login page or another specified route.
 *
 * @param {Object} props - Component properties.
 * @param {ReactNode} props.children - Child components to render if authenticated.
 * @param {string} [props.redirectPath="/login"] - Path to redirect unauthenticated users.
 */
function ProtectedRoute({ children, redirectPath = '/login' }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();

  // Effect to handle redirection for unauthenticated users
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate(redirectPath);
    }
  }, [navigate, isAuthenticated, isLoading, redirectPath]);

  // Render a loading spinner while authentication status is being determined
  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  // Only render children if the user is authenticated
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
