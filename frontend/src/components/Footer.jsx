import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_3fr] gap-14 my-10 mt-40 text-sm">
        {/* --- left side --- */}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6 ">
            SmartPark helps you find and reserve parking hassle-free using
            real-time availability and smart detection.
          </p>
        </div>
        {/* --- center side --- */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Pricing</li>
            <li>FAQs, Contact Us</li>
          </ul>
        </div>
        {/* --- Right side --- */}
        <div>
          <p className="text-xl font-medium mb-5 text-right">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600 text-right">
            <li>+91-9876543210</li>
            <li>support@smartpark.in</li>
          </ul>
        </div>
      </div>
      {/* --- CopyRight --- */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright © 2025 CitySpot - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;

//
//
