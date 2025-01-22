// 'use client';
// import styled from 'styled-components';
// import LoginForm from '@/features/auth/LoginForm';
// import Heading from '@/ui/Heading';
//
// const LoginPageWrapper = styled.main`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 4rem 2rem;
//   background-color: transparent;
//   min-height: 100vh;
//   gap: 2rem;
// `;
//
// export default function LoginPage() {
//   return (
//     <LoginPageWrapper>
//       <Heading as="h1">Login</Heading>
//       <LoginForm />
//     </LoginPageWrapper>
//   );
// }
//
//

// app/(auth)/login/page.js (Server Component)
import React from 'react';

export default function LoginPage() {
  return (
    <main style={{ padding: '2rem', color: 'white' }}>
      <h1>Login (Server-Side Only)</h1>
      <form method="POST" action="/api/auth/login">
        <div>
          <label htmlFor="email">Email: </label>
          <input id="email" name="email" type="email" required />
        </div>

        <div>
          <label htmlFor="password">Password: </label>
          <input id="password" name="password" type="password" required />
        </div>

        <button type="submit">Login</button>
      </form>
    </main>
  );
}
