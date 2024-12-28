'use client';
import styled from 'styled-components';
import { useState } from 'react';
import SignupForm from '@/features/auth/SignupForm.js';
import Heading from '../../../ui/Heading/Heading.js';
import LoginForm from '../../../features/auth/LoginForm.js';

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
    color: var(--color-primary-dark);
  }
`;

function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);

  const toggleMode = () => setIsSignup((prev) => !prev);

  return (
    <LoginLayout>
      <Heading as="h4">
        {isSignup ? 'Sign up for an account' : 'Log in to your account'}
      </Heading>
      {isSignup ? <SignupForm /> : <LoginForm />}
      <ToggleButton onClick={toggleMode}>
        {isSignup ? 'Already have an account? Log in' : 'New here? Sign up'}
      </ToggleButton>
    </LoginLayout>
  );
}

export default LoginPage;
