import React from 'react';
import { assets } from '../assets/assets'; // Make sure 'about_image' exists in this file

const About = () => {
  return (
    <div className="px-6 md:px-16 py-10">
      {/* Heading */}
      <div className="text-center text-2xl text-gray-500 font-medium mb-10">
        ABOUT <span className="text-gray-800 font-semibold">US</span>
      </div>

      {/* About Content */}
      <div className="flex flex-col md:flex-row gap-10 mb-16 items-center">
        <img
          className="w-full md:max-w-[360px] rounded-lg shadow-md"
          src={assets.about_image}
          alt="About CitySpot"
        />
        <div className="flex flex-col justify-center gap-5 text-sm text-gray-600 md:w-2/3">
          <p>
            <strong>CitySpot</strong> is a next-generation smart city initiative
            focused on revolutionizing the way citizens find and reserve parking
            in urban environments. We solve one of the most frustrating urban
            problems—finding an available parking spot—through intelligent
            automation and real-time updates.
          </p>
          <p>
            Our platform offers a seamless way to discover, book, navigate to,
            and pay for parking spaces in just a few clicks. It not only saves
            time but also helps reduce traffic congestion and emissions,
            contributing to a greener, more efficient city.
          </p>
          <p className="font-semibold text-gray-800 text-base">Our Vision</p>
          <p>
            To build a connected urban mobility ecosystem that makes parking
            faster, smarter, and sustainable—empowering future-ready cities with
            smart solutions.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-center text-xl font-semibold mb-6 text-gray-700">
        WHY <span className="text-primary">CHOOSE US</span>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-gray-600">
        {[
          {
            title: 'Real-Time Slot Availability',
            desc: 'Live updates help you find open parking before arriving.',
          },
          {
            title: 'Seamless Digital Payments',
            desc: 'Supports UPI, cards, and wallets. No cash, no tickets.',
          },
          {
            title: 'Navigation to Parking',
            desc: 'Integrated maps lead you straight to your reserved spot.',
          },
          {
            title: 'Reduces Traffic & Pollution',
            desc: 'Smart allocation cuts idle driving and emissions.',
          },
          {
            title: 'Inclusive Parking Options',
            desc: 'EV charging, accessible parking, and more included.',
          },
          {
            title: 'Smart City Integration',
            desc: 'Compatible with municipal systems for future growth.',
          },
        ].map((item, index) => (
          <div
            key={index}
            className="border p-6 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer"
          >
            <b className="block mb-2">{item.title}</b>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
