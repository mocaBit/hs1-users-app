import { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import './SearchInput.css';

interface SearchInputProps {
  onSearch: (searchTerm: string) => void;
  onClear: () => void;
  hasActiveFilter: boolean;
}

export const SearchInput = ({
  onSearch,
  onClear,
  hasActiveFilter
}: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onClear();
  };

  return (
    <div className="search-input-container">
      <div className="search-wrapper">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search by name, email or company..."
          className="search-field"
        />
        {hasActiveFilter && (
          <button onClick={handleClear} className="clear-button">
            ✕
          </button>
        )}
      </div>
    </div>
  );
};
