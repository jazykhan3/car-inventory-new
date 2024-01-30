import React from 'react';

interface CarSidebarProps {
  carmakers: any[];
  selectedMaker: any;
  handleMakerClick: (maker: any) => void;
}

const CarSidebar: React.FC<CarSidebarProps> = ({ carmakers, selectedMaker, handleMakerClick }) => {
  return (
    <>
      {/* Hidden on small screens, visible on medium and larger screens */}
      <div style={{width:'20%',overflow:'auto',paddingTop:140}} className="d-none d-md-flex flex-column  h-100 bg-light px-3 pb-3  gap-3 position-fixed">
        {carmakers?.map((maker: any, idx: any) => (
          <div
            key={idx}
            className={`d-flex p-3 rounded flex-row align-items-center btn ${
              selectedMaker === maker ? 'bg-gray-200' : ''
            }`}
            style={selectedMaker === maker ? {backgroundColor:'rgb(229 231 235)' }:{}}
            onClick={() => handleMakerClick(maker)}
          >
            <img
              src={maker?.urlLogo}
              width={30}
              height={30}
              className="rounded-circle"
              alt={maker?.title}
            />
            <span className="text-lg font-normal ms-2">{maker?.title}</span>
          </div>
        ))}
      </div>

      {/* Visible on small screens, hidden on medium and larger screens */}
      <div className="d-flex d-md-none flex-column border-end border-gray-300 h-100 bg-light px-2 pb-2 pt-5 gap-2 position-fixed">
        {carmakers?.map((maker: any, idx: any) => (
          <div
            key={idx}
            className={`p-2 rounded flex-row align-items-center cursor-pointer ${
              selectedMaker === maker ? 'bg-gray-200' : ''
            }`}
            onClick={() => handleMakerClick(maker)}
          >
            <img
              src={maker?.urlLogo}
              width={30}
              height={30}
              className="rounded-circle"
              alt={maker?.title}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default CarSidebar;
