'use client';

import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import SectionOne with no SSR
const SectionOne = dynamic(() => import('../features/sections/SectionOne'), {
  ssr: false
});

const LandingPage = forwardRef((props, ref) => {
  const homeRef = useRef(null);

  // Handle scrolling safely on the client side
  const scrollToSection = (ref) => {
    if (typeof window !== 'undefined' && ref.current) {
      const topPosition =
        ref.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: topPosition, behavior: 'smooth' });
    }
  };

  useImperativeHandle(ref, () => ({
    scrollToHome: () => scrollToSection(homeRef)
  }));

  return (
    <>
      <div ref={homeRef}>
        <SectionOne />
      </div>
    </>
  );
});

LandingPage.displayName = 'LandingPage';

export default LandingPage;
