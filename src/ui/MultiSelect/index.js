'use client';
import React, { useState } from 'react';

function MultiSelect({ options, name, onChange, disabled }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const handleSelectOption = (option) => {
    const isSelected = selectedOptions.some((opt) => opt.id === option.value);
    const newSelectedOptions = isSelected
      ? selectedOptions.filter((opt) => opt.id !== option.value)
      : [...selectedOptions, { id: option.value }];

    setSelectedOptions(newSelectedOptions);
    onChange(newSelectedOptions); // Pass transformed data back
  };

  return (
    <div className="multi-select">
      <div
        className={`multi-select__input ${disabled ? 'disabled' : ''}`}
        onClick={!disabled ? toggleDropdown : null}
      >
        {selectedOptions.length > 0
          ? selectedOptions
              .map((opt) => options.find((o) => o.value === opt.id)?.label)
              .join(', ')
          : 'Select options'}
      </div>

      {showDropdown && !disabled && (
        <div className="multi-select__dropdown">
          {options.map((option) => (
            <div key={option.value} className="multi-select__option">
              <label>
                <input
                  type="checkbox"
                  name={name}
                  value={option.value}
                  checked={selectedOptions.some(
                    (opt) => opt.id === option.value
                  )}
                  onChange={() => handleSelectOption(option)}
                />
                {option.label}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MultiSelect;
