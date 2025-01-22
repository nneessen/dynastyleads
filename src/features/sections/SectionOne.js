'use client';
import React, { forwardRef } from 'react';
import styled from 'styled-components';

// Use a relative path for videos in the public folder
const VIDEO_PATH = '/videos/video1.mp4';

// Styled Components
const FullWidthVideoContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100%; /* Ensure it spans the full width of the viewport */
  margin: 0; /* Remove any potential margins */
  padding: 0; /* Remove padding */

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw; /* Force the video to span the viewport width */
    height: 100vh; /* Force the video to span the viewport height */
    object-fit: cover;
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(
      0,
      0,
      0,
      0.4
    ); /* Add an overlay for better text visibility */
    z-index: 0;
  }
`;

const SloganContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 1;
`;

const Slogan = styled.div`
  font-family: 'Bebas Neue', sans-serif;
  font-weight: normal;
  font-size: 7rem;
  color: transparent;
  -webkit-text-stroke: 2px white;
  text-transform: uppercase;
  margin: 1rem 0;

  @media (max-width: 768px) {
    font-size: 4rem; /* Adjust for smaller screens */
  }
`;

// SectionOne Component
const SectionOne = forwardRef((props, ref) => {
  return (
    <div ref={ref} id="section-one">
      <FullWidthVideoContainer>
        <video autoPlay loop muted playsInline>
          <source src={VIDEO_PATH} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <SloganContainer>
          <Slogan>Your Strategy</Slogan>
          <Slogan>Your Leads</Slogan>
          <Slogan>Your Success</Slogan>
        </SloganContainer>
      </FullWidthVideoContainer>
    </div>
  );
});

SectionOne.displayName = 'SectionOne';

export default SectionOne;
