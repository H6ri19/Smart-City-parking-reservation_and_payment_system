import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20">
      {/* -------------left side----------- */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-3xl md:text-5xl lg:text-4xl text-white font-semibold leading-tight">
          Reserve Parking Instantly <br /> & Hassle-Free
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <img className="w-28" src={assets.group_profiles} alt="Group" />
          <p>
            Find nearby parking slots, reserve in advance, and pay securely
            <br />- A smarter way to park in your city.
          </p>
        </div>
        <a
          href="#speciality"
          className="flex items-center gap-2 bg-gray-700 text-white px-8 py-3 rounded-full text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
        >
          Book Parking Now
          <img className="w-3" src={assets.arrow_icon} alt="Arrow Icon" />
        </a>
      </div>

      {/* -------------right side----------- */}
      <div className="md:w-1/2 relative">
        <img
          className="w-full md:absolute bottom-0 h-auto object-contain rounded-lg"
          src={assets.header_img}
          alt="Header Illustration"
        />
      </div>
    </div>
  );
};

export default Header;
