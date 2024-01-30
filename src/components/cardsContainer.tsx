import React from 'react';
import Card from './carCard';

interface CardContainerProps {
  filteredCars: any[];
}

const CardContainer: React.FC<CardContainerProps> = ({ filteredCars }) => {
  return (
    <div>
      {filteredCars?.length > 0 ? (
        <div className="d-flex flex-row gap-3 flex-wrap justify-content-between">
          {filteredCars.map((car, index) => (
            <Card key={index} car={car} />
          ))}
        </div>
      ) : (
        <div className="h-100 w-100 text-lg font-weight-bold d-flex justify-content-center align-items-center">
          No Data Found
        </div>
      )}
    </div>
  );
};

export default CardContainer;
