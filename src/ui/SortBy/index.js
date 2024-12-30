import { useState } from 'react';
import Select from './Select';
import { useSearchParams } from 'react-router-dom';

/**
 * SortBy Component
 * A dropdown for sorting items, integrated with URL search parameters.
 *
 * @param {Array<{value: string, label: string}>} options - Array of sorting options for the dropdown.
 */
function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || ''; // Retrieve the current sortBy value from URL parameters

  /**
   * Handles changes in the dropdown and updates the URL search parameters.
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} e - The change event from the dropdown.
   */
  function handleChange(e) {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      onChange={handleChange}
      type="white"
      options={options}
      value={sortBy}
    />
  );
}

export default SortBy;
