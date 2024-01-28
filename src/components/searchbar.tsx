import React from 'react';

interface SearchBarProps {
  searchInput: string;
  handleSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleFiltersPopup: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchInput, handleSearchInputChange, toggleFiltersPopup }) => {
  return (
    <div className="w-[100%] h-[60px] flex gap-4 mb-5 relative rounded-lg items-center">
      <div className="w-[90%] items-center h-[40px] flex">
        <input
          type="text"
          placeholder="Search..."
          className="w-full h-full pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="absolute left-3 top-[35%] h-5 w-5 text-gray-400"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-5.2-5.2" />
          <circle cx="10" cy="10" r="7" />
        </svg>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer"
        onClick={toggleFiltersPopup}
      >
        Filters
      </button>
    </div>
  );
};

export default SearchBar;
