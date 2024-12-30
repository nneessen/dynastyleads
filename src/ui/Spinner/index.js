import styled, { keyframes } from 'styled-components';

// Keyframe animation for the spinner rotation
const rotate = keyframes`
  to {
    transform: rotate(1turn);
  }
`;

/**
 * Spinner Component
 * A circular loading spinner with a rotating animation.
 */
const Spinner = styled.div`
  margin: 4.8rem auto; /* Center the spinner vertically and horizontally */

  width: 6.4rem; /* Set the spinner size */
  aspect-ratio: 1; /* Maintain a circular aspect ratio */
  border-radius: 50%; /* Create a circular shape */

  background:
    radial-gradient(farthest-side, var(--color-brand-600) 94%, transparent)
      top/10px 10px no-repeat,
    conic-gradient(transparent 30%, var(--color-brand-600));

  /* Masking to create a donut-like shape */
  -webkit-mask: radial-gradient(
    farthest-side,
    transparent calc(100% - 10px),
    #000 0
  );

  animation: ${rotate} 1.5s infinite linear; /* Apply the rotation animation */
`;

export default Spinner;
