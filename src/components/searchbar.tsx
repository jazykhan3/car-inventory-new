import React from 'react';

interface SearchBarProps {
  searchInput: string;
  handleSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleFiltersPopup: () => void;
  clearFilters: () => void;
  filtersApplied: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchInput, filtersApplied, handleSearchInputChange, toggleFiltersPopup, clearFilters }) => {
  return (
    <div style={{width:'100%',height:60}} className=" d-flex gap-4 mb-5 position-relative rounded-lg align-items-center">
      <div style={{width:'80%',height:40}} className="d-flex align-items-center">
        <input
        style={{height:'100%',
      width:'100%',paddingLeft:40}}
          type="text"
          placeholder="Search..."
          className=" pr-4 rounded-lg border border-gray-300 focus-outline-none"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <svg
        style={{top:'35%',left:'1%',height:20,width:20}}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="position-absolute h-5 w-5 text-gray-400"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-5.2-5.2" />
          <circle cx="10" cy="10" r="7" />
        </svg>
      </div>
      <button
        className="btn btn-primary px-4 py-2 rounded cursor-pointer me-4"
        onClick={toggleFiltersPopup}
      >
        Filters
      </button>
      {filtersApplied && (
        <button
          className="btn btn-danger px-4 py-2 rounded cursor-pointer"
          onClick={clearFilters}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default SearchBar;
