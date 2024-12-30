import styled, { css } from 'styled-components';

/**
 * Row Component
 * A flexible styled div that can render as a horizontal or vertical flex container.
 *
 * @param {Object} props - Component properties.
 * @param {'horizontal'|'vertical'} props.type - The direction of the flex container (default: 'horizontal').
 * @param {string} [props.gap='1.6rem'] - Gap between child elements.
 * @param {string} [props.align='center'] - Align items along the cross axis (default: 'center').
 * @param {string} [props.justify='space-between'] - Justify content along the main axis (default: 'space-between' for horizontal).
 */
const Row = styled.div`
  display: flex;

  /* Horizontal layout styles */
  ${(props) =>
    props.type === 'horizontal' &&
    css`
      flex-direction: row;
      justify-content: ${props.justify || 'space-between'};
      align-items: ${props.align || 'center'};
      gap: ${props.gap || '0'};
    `}

  /* Vertical layout styles */
  ${(props) =>
    props.type === 'vertical' &&
    css`
      flex-direction: column;
      gap: ${props.gap || '1.6rem'};
      align-items: ${props.align || 'stretch'};
    `}
`;

// Default Props
Row.defaultProps = {
  type: 'horizontal', // Default layout is horizontal
  gap: '1.6rem', // Default gap between elements
  align: 'center', // Default alignment for items
  justify: 'space-between' // Default content justification
};

export default Row;
