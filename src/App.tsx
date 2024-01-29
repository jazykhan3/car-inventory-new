import React, { useEffect, useState } from "react";
import "./styles/index.css";
import { carmakers } from "./data/car-makers";
import { carsData } from "./data/carsData";
import CarSidebar from "./components/sidebar";
import SearchBar from "./components/searchbar";
import CardContainer from "./components/cardsContainer";
import FiltersPopup from "./components/filters";

interface Car {
  image: string;
  title: string;
  maker: string;
  start_production: number;
  class: string;
  engineSize: string;
}

function App(): JSX.Element {
  const [selectedMaker, setSelectedMaker] = useState(carmakers[0]);
  const [showFiltersPopup, setShowFiltersPopup] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [engineSizeFilter, setEngineSizeFilter] = useState('');
  const [startYear, setStartYear] = useState<number | ''>('');
  const [endYear, setEndYear] = useState<number | ''>('');
    const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [searchInput, setSearchInput] = useState("");

  const handleMakerClick = (maker: typeof carmakers[number]): void => {
    setSelectedMaker(maker);
    setEngineSizeFilter('');
    setStartYear("");
    setEndYear("")
  };
  const clearFilters = () => {
    setEngineSizeFilter('');
    setStartYear('');
    setSearchInput('');
    setEndYear("")
    setShowResults(false);
    applyFilters(restructuredCarsArray);
  };
  const applyFilters = (data: Car[]) => {
    const filteredData = data?.filter(
      (car) =>
        car?.image &&
        car?.maker?.toLowerCase() === selectedMaker?.title.toLowerCase()
    ).filter((car) => {
      return (
        (engineSizeFilter === '' || car.engineSize === engineSizeFilter) &&
        ((startYear === '' || car.start_production >= startYear) &&
         (endYear === '' || car.start_production <= endYear))
      );
    });

    const searchFilteredData = filteredData.filter((car) =>
      car.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    setFilteredCars(searchFilteredData);
  };

  useEffect(() => {
    applyFilters(restructuredCarsArray);
  }, [showResults, showFiltersPopup, searchInput, selectedMaker]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    applyFilters(restructuredCarsArray);
  };

  const toggleFiltersPopup = () => {
    setShowFiltersPopup(!showFiltersPopup);
  };

  function restructureCarsArray(carsArray: typeof carsData): Car[] {
    return carsArray.map((car: any) => {
      const titleWords = car.title.split(" ");
      const maker = titleWords.shift();
      const title = titleWords.join(" ");

      return {
        image: car.image,
        title: title,
        maker: maker!,
        start_production: car.start_production,
        class: car.class,
        engineSize: car.engine_size,
      };
    });
  }

  const restructuredCarsArray: Car[] = restructureCarsArray(carsData);

  const handleFiltersSubmit = () => 
  {
    
    setShowResults(true);

    const filteredCarsResult = restructureCarsArray(carsData).filter(
      (car) =>
        car?.image &&
        car?.maker?.toLowerCase() === selectedMaker?.title.toLowerCase()
    );

    setFilteredCars(filteredCarsResult);

    setShowFiltersPopup(false);
  };
  
  const filtersApplied = engineSizeFilter !== '' || startYear !== '' || endYear !== ''|| searchInput !== '';

  return (
    <div className="flex flex-col justify-between">
      <div className="flex">
        {/* Sidebar */}
        <CarSidebar carmakers={carmakers} selectedMaker={selectedMaker} handleMakerClick={handleMakerClick} />
        {/* Content */}
        <div className="w-4/5 px-8 pb-8 pt-20 md:pt-36 max-h-fit flex-col flex absolute right-0 overflow-auto">
          <SearchBar filtersApplied={filtersApplied} clearFilters={clearFilters} searchInput={searchInput} handleSearchInputChange={(e) => handleSearchInputChange(e)} toggleFiltersPopup={toggleFiltersPopup} />
          <CardContainer filteredCars={filteredCars} />
          <FiltersPopup
            setShowFiltersPopup={setShowFiltersPopup}
            showFiltersPopup={showFiltersPopup}
            handleFiltersSubmit={handleFiltersSubmit}
            engineSizeFilter={engineSizeFilter}
            setEngineSizeFilter={setEngineSizeFilter}
            startYear={startYear}
            setStartYear={setStartYear}
            endYear={endYear}
            setEndYear={setEndYear}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
