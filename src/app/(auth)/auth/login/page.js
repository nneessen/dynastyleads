'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { createClient } from '../../../../utils/supabase/client.js';
import LoginForm from '@/features/auth/LoginForm';
import SignupForm from '@/features/auth/SignupForm';
import Heading from '../../../../ui/Heading/Heading.js';

const LoginLayout = styled.main`
  min-height: 75vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: var(--color-grey-100);
  font-size: 1rem;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: var(--color-accent-blue);
  }
`;

function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const toggleMode = () => setIsSignup((prev) => !prev);

  const handleAuthSuccess = () => {
    router.push('/dashboard'); // Replace with your authenticated route
  };

  return (
    <LoginLayout>
      <Heading as="h4">
        {isSignup ? 'Sign up for an account' : 'Log in to your account'}
      </Heading>
      {isSignup ? (
        <SignupForm supabase={supabase} onSuccess={handleAuthSuccess} />
      ) : (
        <LoginForm supabase={supabase} onSuccess={handleAuthSuccess} />
      )}
      <ToggleButton onClick={toggleMode}>
        {isSignup ? 'Already have an account? Log in' : 'New here? Sign up'}
      </ToggleButton>
    </LoginLayout>
  );
}

export default LoginPage;
