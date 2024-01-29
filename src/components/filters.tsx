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
    <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center">
      <div ref={popupRef} className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl mb-4">Filters</h2>
        <form onSubmit={()=>handleFiltersSubmit()}>
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
            <label htmlFor="startYear">Start Year:</label>
            <input
              type="text"
              id="startYear"
              value={startYear}
              onInput={(e) => {
                const inputValue = e.currentTarget.value.replace(/\D/g, '').slice(0, 4);
                setStartYear(inputValue === '' ? '' : parseInt(inputValue, 10));
              }}
              className="w-[100px] h-[40px] ml-2 border border-[#e5e5e5]"
            />
          </div>
          <div className="mb-4 flex justify-between items-center">
            <label htmlFor="endYear">End Year:</label>
            <input
              type="text"
              id="endYear"
              value={endYear}
              onInput={(e) => {
                const inputValue = e.currentTarget.value.replace(/\D/g, '').slice(0, 4);
                setEndYear(inputValue === '' ? '' : parseInt(inputValue, 10));
              }}
              className="w-[100px] h-[40px] ml-2 border border-[#e5e5e5]"
            />
            {/* {error?.length > 0 && <p className='text-xs text-[#ef4744]'>{error}</p>} */}
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