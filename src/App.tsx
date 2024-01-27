import { useState } from "react";
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
  const [selectedMaker, setSelectedMaker] = useState(carmakers[0]); // Default to the first maker
  function getRandomEngineSize(): number {
    return Math.random() * 5; // Adjust as needed based on your actual data
  }
  const handleMakerClick = (maker: (typeof carmakers)[number]): void => {
    setSelectedMaker(maker);
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
          engineSize: getRandomEngineSize(), // Add a random engine size for demonstration
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

  return (
    <>
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
          <div className="w-100 h-[80px] mb-5 relative rounded-lg">
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-full pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none"
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
          </div>{" "}
          <div className="flex flex-row gap-8 flex-wrap  justify-between ">
            {" "}
            {restructuredCarsArray
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
        </div>
      </div>
    </>
  );
}

export default App;
