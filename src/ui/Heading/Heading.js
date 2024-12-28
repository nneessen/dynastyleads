import styled, { css } from 'styled-components';

const Heading = styled.h1`
  ${(props) =>
    props.as === 'h1' &&
    css`
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 3rem;
      font-weight: 400;
    `}

  ${(props) =>
    props.as === 'h2' &&
    css`
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 2rem;
      font-weight: 500;
    `}

  ${(props) =>
    props.as === 'h3' &&
    css`
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 2rem;
      font-weight: 500;
    `}

  ${(props) =>
    props.as === 'h4' &&
    css`
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 2rem;
      text-align: center;
    `}

  line-height:1.4;
`;

export default Heading;
