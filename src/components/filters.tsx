import React from 'react';

interface FiltersPopupProps {
  showFiltersPopup: boolean;
  handleFiltersSubmit: () => void;
  engineSizeFilter: string;
  setEngineSizeFilter: React.Dispatch<React.SetStateAction<string>>;
  yearFilter: string;
  setYearFilter: React.Dispatch<React.SetStateAction<string>>;
}

const FiltersPopup: React.FC<FiltersPopupProps> = ({
  showFiltersPopup,
  handleFiltersSubmit,
  engineSizeFilter,
  setEngineSizeFilter,
  yearFilter,
  setYearFilter,
}) => {
  return showFiltersPopup ? (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl mb-4">Filters</h2>
        <form onSubmit={handleFiltersSubmit}>
          <div className="mb-4 flex justify-between items-center">
            <label htmlFor="engineSize">Engine Size:</label>
            <select
              id="engineSize"
              value={engineSizeFilter}
              onChange={(e) => setEngineSizeFilter(e.target.value)}
              className="px-5 py-2 rounded ml-2"
            >
              <option value="all">All</option>
              <option value="1.2L">1.2L</option>
              <option value="1.8L">1.8L</option>
              <option value="2.5L">2.5L</option>
              <option value="3.5L">3.5L</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="mb-4 flex justify-between items-center">
            <label htmlFor="year">Year:</label>
            <input
              type="number"
              id="year"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="w-[100px] h-[40px] ml-2 border border-[#e5e5e5]"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Apply Filters
          </button>
        </form>
      </div>
    </div>
  ) : null;
};

export default FiltersPopup;
