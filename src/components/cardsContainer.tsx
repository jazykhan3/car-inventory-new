import React from 'react';
import Card from './carCard';

interface CardContainerProps {
  filteredCars: any[];
}

const CardContainer: React.FC<CardContainerProps> = ({ filteredCars }) => {
  return (
    <span>
      {filteredCars?.length > 0 ? (
  <div className="flex flex-row gap-8 flex-wrap justify-between">
    {filteredCars.map((car) => (
  <Card car={car}/>
    ))}
  </div>
) : (
  <div className="h-screen w-full text-4xl font-bold flex justify-center items-center">
    No Data Found
  </div>
)}

    </span>
  );
};

export default CardContainer;
