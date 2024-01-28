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
      <div className="hidden md:flex w-1/5 h-screen bg-[#FFFFFF] px-8 pb-8 pt-36 flex-col gap-8 left-0 fixed overflow-auto">
        {carmakers?.map((maker: any, idx: any) => (
          <div
            key={idx}
            className={`p-5 rounded-lg flex flex-row gap-4 items-center cursor-pointer ${
              selectedMaker === maker ? 'bg-gray-200' : ''
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

      {/* Visible on small screens, hidden on medium and larger screens */}
      <div className="flex md:hidden border-r border-[#e5e5e5] h-screen bg-[#FFFFFF] px-2 pb-8 pt-36 flex-col gap-4 left-0 fixed overflow-auto">
        {carmakers?.map((maker: any, idx: any) => (
          <div
            key={idx}
            className={`p-2 rounded-lg flex flex-row gap-4 items-center cursor-pointer ${
              selectedMaker === maker ? 'bg-gray-200' : ''
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
          </div>
        ))}
      </div>
    </>
  );
};

export default CarSidebar;
