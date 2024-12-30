import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { Container } from '../../ui/Container';

const sectionOneVideo = '/public/videos/video1.mp4';

const VideoContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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
    background: rgba(0, 0, 0, 0.4);
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
  font-size: 10rem;
  color: transparent;
  -webkit-text-stroke: 2px white;
  text-transform: uppercase;
  margin: 1rem 0;
`;

const SectionOne = forwardRef((props, ref) => {
  return (
    <div ref={ref} id="section-one">
      <Container>
        <VideoContainer>
          <video autoPlay loop muted>
            <source src={sectionOneVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <SloganContainer>
            <Slogan>Your Strategy</Slogan>
            <Slogan>Your Leads</Slogan>
            <Slogan>Your Success</Slogan>
          </SloganContainer>
        </VideoContainer>
      </Container>
    </div>
  );
});

SectionOne.displayName = 'SectionOne';

export default SectionOne;
