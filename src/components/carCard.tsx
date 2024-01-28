import React from 'react';

interface CardProps {
  car: any;
}

const Card: React.FC<CardProps> = ({ car }) => {
  return (
    <div className="h-max border border-[#e5e5e5] flex flex-col justify-between gap-8 rounded-xl">
      <img
        src={car?.image}
        className="object-contain h-[300px] w-[300px]"
        alt={car?.title}
        height={300}
        width={300}
      />
      <div className="flex items-center justify-between p-4">
        <span>{car?.title}</span>
        <span>{car?.start_production}</span>
      </div>
      <div className="flex items-center justify-between px-4">
        <span>{car?.engineSize}</span>
      </div>
    </div>
  );
};

export default Card;
