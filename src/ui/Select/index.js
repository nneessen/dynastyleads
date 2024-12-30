import styled from 'styled-components';

// Styled Component for Select Dropdown
const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === 'white'
        ? 'var(--color-grey-100)'
        : 'var(--color-grey-300)'};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }

  &:disabled {
    background-color: var(--color-grey-200);
    cursor: not-allowed;
  }
`;

/**
 * Select Component
 * A customizable dropdown select component with dynamic options.
 *
 * @param {Array<{value: string, label: string}>} options - Array of option objects for the dropdown.
 * @param {string} value - The currently selected value.
 * @param {Function} onChange - Callback for handling selection changes.
 * @param {'white'|'default'} [type='default'] - Style type for the dropdown.
 * @param {boolean} [disabled=false] - Disables the dropdown when true.
 * @param {Object} props - Additional props for the select element.
 */
function Select({
  options,
  value,
  onChange,
  type = 'default',
  disabled = false,
  ...props
}) {
  return (
    <StyledSelect
      value={value}
      onChange={onChange}
      type={type}
      disabled={disabled}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
