import { useEffect, useState } from "react";
import "./styles/index.css";
import { carmakers } from "./data/car-makers";
import { carsData } from "./data/carsData";

interface Car {
  image: string;
  title: string;
  maker: string;
  start_production: number;
  class: string;
  engineSize: number; // Assume engineSize is a number property
}

function App(): JSX.Element {
  const [selectedMaker, setSelectedMaker] = useState(carmakers[0]);
  const [showFiltersPopup, setShowFiltersPopup] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [engineSizeFilter, setEngineSizeFilter] = useState(1);
  const [yearFilter, setYearFilter] = useState("");
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [searchInput, setSearchInput] = useState("");

  const handleMakerClick = (maker: (typeof carmakers)[number]): void => {
    setSelectedMaker(maker);
    setEngineSizeFilter(1);
    setYearFilter("");
  };
  const applyFilters = (data: Car[]) => {
    // Apply filters based on engine size and year
    const filteredData = data.filter((car) => {
      return (
        (engineSizeFilter === 1 || car.engineSize < engineSizeFilter) &&
        (yearFilter === "" ||
          car.start_production?.toString().includes(yearFilter))
      );
    });

    // Apply search filter
    const searchFilteredData = filteredData.filter((car) =>
      car.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    setFilteredCars(searchFilteredData);
  };
  useEffect(() => {
    console.log("called");
    applyFilters(restructuredCarsArray);
  }, [showResults, showFiltersPopup, searchInput, selectedMaker]);
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    applyFilters(restructuredCarsArray);
  };
  const toggleFiltersPopup = () => {
    setShowFiltersPopup(!showFiltersPopup);
  };
  type EngineSize = "smaller than 2 lit" | "2 to 3 lit" | "greater than 3 lit";

  function restructureCarsArray(
    carsArray: typeof carsData,
    engine: EngineSize
  ): Car[] {
    return carsArray
      .map((car: any) => {
        const titleWords = car.title.split(" ");
        const maker = titleWords.shift();
        const title = titleWords.join(" ");

        return {
          image: car.image,
          title: title,
          maker: maker!,
          start_production: car.start_production,
          class: car.class,
          engineSize: 1, // Add a random engine size for demonstration
        };
      })
      .filter((car: Car) => {
        // Filter cars based on the selected engine size
        switch (engine) {
          case "smaller than 2 lit":
            return car.engineSize < 2;
          case "2 to 3 lit":
            return car.engineSize >= 2 && car.engineSize <= 3;
          case "greater than 3 lit":
            return car.engineSize > 3;
          default:
            return true; // If no specific engine size is selected, include all cars
        }
      });
  }

  const restructuredCarsArray: Car[] = restructureCarsArray(
    carsData,
    "smaller than 2 lit"
  );
  const handleFiltersSubmit = (e: React.FormEvent) => {
    setShowResults(true);

    e.preventDefault();

    const filteredCarsResult = restructureCarsArray(
      carsData,
      "smaller than 2 lit"
    );

    setFilteredCars(filteredCarsResult);

    setShowFiltersPopup(false);
  };
  return (
    <>
      <div className=" flex flex-col justify-between">
        <div className="flex items-center gap-10 p-3 bg-[#e5e5e5]"><img src="/car-inventory.png" className="w-[350px] h-[100px]" /><span className="text-4xl w-[100%] font-bold text-center">Car Inventory</span></div>
        <div className="flex">
        {/* Sidebar */}
        <div className="w-1/5 h-screen bg-[#FFFFFF] p-8 flex flex-col gap-8 left-0 fixed overflow-auto">
          {carmakers?.map((maker: any, idx: any) => (
            <div
              key={idx}
              className={`p-5 rounded-lg flex flex-row gap-4 items-center cursor-pointer ${
                selectedMaker === maker ? "bg-gray-200" : ""
              }`}
              onClick={() => handleMakerClick(maker)}
            >
              <img
                src={maker?.urlLogo}
                width={30}
                height={30}
                className="rounded-full"
                alt={maker?.title}
              />
              <span className="text-xl font-normal">{maker?.title}</span>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="w-4/5 p-8  max-h-fit flex-col  flex absolute right-0 overflow-auto">
          <div className="w-[100%] h-[60px]  flex gap-4 mb-5 relative rounded-lg  items-center">
            <div className="w-[90%] items-center h-[60px]  flex">
              {" "}
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
                className="absolute left-3 top-[37%] h-5 w-5 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-5.2-5.2"
                />
                <circle cx="10" cy="10" r="7" />
              </svg>
            </div>
            <button
              className="  bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer"
              onClick={toggleFiltersPopup}
            >
              Filters
            </button>
          </div>{" "}
          <div className="flex flex-row gap-8 flex-wrap  justify-between ">
            {" "}
            {filteredCars
              .filter(
                (car) =>
                  car?.image &&
                  car?.maker?.toLowerCase() ===
                    selectedMaker?.title.toLowerCase()
              )
              .map((car, idx) => (
                <div
                  key={idx}
                  className="h-max border border-[#e5e5e5] flex flex-col justify-between gap-8 rounded-xl"
                >
                  <img
                    src={car?.image}
                    className="object-contain h-[300px] w-[300px]"
                    alt={car?.title}
                    height={300}
                    width={300}
                  />
                  <div className="flex items-center justify-between p-4">
                    <span>{car?.title}</span>{" "}
                    <span>{car?.start_production}</span>
                  </div>
                </div>
              ))}
          </div>
          {showFiltersPopup && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-8 rounded-lg">
                <h2 className="text-2xl mb-4">Filters</h2>
                <form onSubmit={handleFiltersSubmit}>
                  <div className="mb-4 flex justify-between items-center">
                    <label htmlFor="engineSize">Engine Size:</label>
                    <select
                      id="engineSize"
                      value={engineSizeFilter}
                      onChange={() => setEngineSizeFilter(1)}
                      className="px-5 py-2 rounded ml-2"
                    >
                      <option value="all">All</option>
                      <option value="2">2 Lit</option>
                      <option value="3">3 Lit</option>
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
                      className="w-[100px] h-[40px] ml-2 border border-[#e5e5e5] "
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
          )}
        </div>
      </div>


      </div>
    </>
  );
}

export default App;
