'use client';
import { useState } from 'react';
import { PageWrapper, LayoutContainer, Footer } from './AppLayoutStyles';
import Header from '../Header/Header';

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
