'use client';
import { useState } from 'react';
import Header from '../Header/Header';
import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  margin: 0;
  overflow: hidden;
`;

export const LayoutContainer = styled.div`
  flex: 1;
  max-width: 1500px; /* Keeps the content centered */
  width: 100%; /* Ensures full grid width */
  margin: 0 auto;
  padding: 0 2rem;
`;

export const Footer = styled.footer`
  background-color: transparent;
  color: white;
  text-align: center;
  padding: 20px;
  margin-top: 10px;
`;

const AppLayout = ({ children, ref }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <PageWrapper>
      <Header menuOpen={menuOpen} landingPageRef={ref} />
      <LayoutContainer>{children}</LayoutContainer>
      <Footer>
        <p>&copy; 2024 Solid Leads</p>
      </Footer>
    </PageWrapper>
  );
};

export default AppLayout;
