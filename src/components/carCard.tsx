import React from 'react';

interface CardProps {
  car: any;
}

const Card: React.FC<CardProps> = ({ car }) => {
  return (
    <div className="card border border-grey d-flex flex-column justify-content-between gap-3 rounded btn">
      <img
        src={car?.image}
        className="card-img-top object-fit-contain"
        alt={car?.title}
        height={300}
        width={300}
        style={{width:300,height:300}}
      />
      <div className="card-body d-flex justify-content-between p-3">
        <span className="card-title">{car?.title}</span>
        <span className="card-subtitle">{car?.start_production}</span>
      </div>
      <div className="card-body d-flex justify-content-between px-3">
        <span>{car?.engineSize}</span>
      </div>
    </div>
  );
};

export default Card;
