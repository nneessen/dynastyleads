'use client';
import styled from 'styled-components';
import LoginForm from '@/features/auth/LoginForm';
import Heading from '@/ui/Heading';

const LoginPageWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 2rem;
  background-color: transparent;
  min-height: 100vh;
  gap: 2rem;
`;

export default function LoginPage() {
  return (
    <LoginPageWrapper>
      <Heading as="h1">Login</Heading>
      <LoginForm />
    </LoginPageWrapper>
  );
}
