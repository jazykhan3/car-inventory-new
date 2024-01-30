import React, { useEffect, useRef } from 'react';

interface FiltersPopupProps {
  showFiltersPopup: boolean;
  handleFiltersSubmit: () => void;
  engineSizeFilter: string;
  setEngineSizeFilter: React.Dispatch<React.SetStateAction<string>>;
  startYear: number | '';
  setStartYear: React.Dispatch<React.SetStateAction<number | ''>>;
  endYear: number | '';
  setEndYear: React.Dispatch<React.SetStateAction<number | ''>>;
  setShowFiltersPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const FiltersPopup: React.FC<FiltersPopupProps> = ({
  showFiltersPopup,
  handleFiltersSubmit,
  engineSizeFilter,
  setEngineSizeFilter,
  startYear,
  setStartYear,
  endYear,
  setEndYear,
  setShowFiltersPopup,
}) => {
  const popupRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setShowFiltersPopup(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [setShowFiltersPopup]);

  return showFiltersPopup ? (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center">
      <div ref={popupRef} className="bg-white p-4 rounded">
        <h2 className="text-2xl mb-4">Filters</h2>
        <form onSubmit={handleFiltersSubmit}>
          <div className="mb-3 d-flex justify-content-between align-items-center">
            <label htmlFor="engineSize">Engine Size:</label>
            <select
              id="engineSize"
              value={engineSizeFilter}
              onChange={(e) => setEngineSizeFilter(e.target.value)}
              className="form-select px-3 py-2 rounded ms-2"
              style={{width:100}}
              
            >
              <option value="all">All</option>
              <option value="1.2L">1.2L</option>
              <option value="1.8L">1.8L</option>
              <option value="2.5L">2.5L</option>
              <option value="3.5L">3.5L</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="mb-3 d-flex justify-content-between align-items-center">
            <label htmlFor="startYear">Start Year:</label>
            <input
              type="text"
              id="startYear"
              value={startYear}
              onInput={(e) => {
                const inputValue = e.currentTarget.value.replace(/\D/g, '').slice(0, 4);
                setStartYear(inputValue === '' ? '' : parseInt(inputValue, 10));
              }}
              style={{width:100}}
              className="form-control w-[100px] h-40 ms-2 border border-grey"
            />
          </div>
          <div className="mb-3 d-flex justify-content-between align-items-center">
            <label htmlFor="endYear">End Year:</label>
            <input
              type="text"
              id="endYear"
              value={endYear}
              style={{width:100}}

              onInput={(e) => {
                const inputValue = e.currentTarget.value.replace(/\D/g, '').slice(0, 4);
                setEndYear(inputValue === '' ? '' : parseInt(inputValue, 10));
              }}
              className="form-control w-[100px] h-40 ms-2 border border-grey"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary px-4 py-2 rounded-lg"
          >
            Apply Filters
          </button>
        </form>
      </div>
    </div>
  ) : null;
};

export default FiltersPopup;
