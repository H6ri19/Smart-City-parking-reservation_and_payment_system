import React from 'react';
// import { specialityData } from '../assets/specialityData';
import { specialityData } from '../assets/assets';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const specialityMenu = () => {
  return (
    <div
      className="flex flex-col items-center gap-4 py-16 text-gray-800"
      id="speciality"
    >
      <h1 className="text-3xl font-medium">Find Parking by Vehicle Type</h1>
      <p className="sm:w-1/2 text-center text-sm">
        Choose your vehicle type to book a slot at the nearest smart parking
        zone.
      </p>
      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
            key={index}
            to={`/parking/${item.speciality}`}
          >
            <img className="w-16 sm:w-24 mb-2" src={item.image} alt=" " />
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default specialityMenu;
