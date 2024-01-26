import React, { useState } from 'react';
import './styles/index.css';
import { carmakers } from './data/car-makers';
import { carsData } from './data/carsData';



interface Car {
  image: string;
  title: string;
  maker: string;
  start_production: number;
  class: string;
}

function App(): JSX.Element {
  const [selectedMaker, setSelectedMaker] = useState(carmakers[0]); // Default to the first maker

  const handleMakerClick = (maker: typeof carmakers[number]): void => {
    setSelectedMaker(maker);
  };

  function restructureCarsArray(carsArray: typeof carsData): Car[] {
    return carsArray.map((car: any) => {
      const titleWords = car.title.split(' ');
      const maker = titleWords.shift();
      const title = titleWords.join(' ');

      return {
        image: car.image,
        title: title,
        maker: maker!,
        start_production: car.start_production,
        class: car.class,
      };
    });
  }

  const restructuredCarsArray: Car[] = restructureCarsArray(carsData);

  return (
    <>
      <div className='flex'>
        {/* Sidebar */}
        <div className='w-1/5 h-screen bg-[#FFFFFF] p-8 flex flex-col gap-8 left-0 fixed overflow-auto'>
          {carmakers?.map((maker:any, idx:any) => (
            <div
              key={idx}
              className={`p-5 rounded-lg flex flex-row gap-4 items-center cursor-pointer ${
                selectedMaker === maker ? 'bg-gray-200' : ''
              }`}
              onClick={() => handleMakerClick(maker)}
            >
              <img src={maker?.urlLogo} width={30} height={30} className='rounded-full' alt={maker?.title} />
              <span className='text-xl font-normal'>{maker?.title}</span>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className='w-4/5 p-8 gap-8 max-h-fit  flex justify-between flex-wrap absolute right-0 overflow-auto'>
          {restructuredCarsArray
            .filter((car) => car?.image && car?.maker?.toLowerCase() === selectedMaker?.title.toLowerCase())
            .map((car, idx) => (
              <div key={idx} className='h-max border border-[#e5e5e5] flex flex-col justify-between gap-8 rounded-xl'>
                <img
                  src={car?.image}
                  className='object-contain h-[300px] w-[300px]'
                  alt={car?.title}
                  height={300}
                  width={300}
                />
                <div className='flex items-center justify-between p-4'>
                  <span>{car?.title}</span> <span>{car?.start_production}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
