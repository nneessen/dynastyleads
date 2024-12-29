import styled from 'styled-components';

const CheckboxContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1.25rem;
  width: 100%;
  max-width: 100%; /* Ensure it matches the parent width */
  box-sizing: border-box; /* Include padding in the total width */
  overflow: hidden; /* Prevent any overflow issues */
  padding: 1rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
  color: var(--color-grey-900);

  input {
    transform: scale(1.2); /* Slightly larger checkboxes */
  }
`;

function CheckboxGroup({
  options = [],
  name,
  onChange,
  selected = [],
  disabled
}) {
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    const updatedSelected = checked
      ? [...selected, value]
      : selected.filter((item) => item !== value);

    onChange(updatedSelected); // Notify parent of the state change
  };

  return (
    <CheckboxContainer>
      {options.map((option) => (
        <CheckboxLabel key={option.value}>
          <input
            type="checkbox"
            name={name}
            value={option.value}
            checked={selected?.includes(option.value) || false} // Ensure selected works
            onChange={handleCheckboxChange}
            disabled={disabled}
          />
          {option.label}
        </CheckboxLabel>
      ))}
    </CheckboxContainer>
  );
}

export default CheckboxGroup;
