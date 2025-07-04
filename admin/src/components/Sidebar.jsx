import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { ParkingContext } from '../context/ParkingContext';

const sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(ParkingContext);
  return (
    <div className="min-h-screen bg-white border-r">
      {aToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
            to={'/admin-dashboard'}
          >
            <img src={assets.home_icon} alt="" />
            <p>Dashborad</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
            to={'/Booking'}
          >
            <img src={assets.appointment_icon} alt="" />
            <p>Manage Booking</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
            to={'add-Parking'}
          >
            <img src={assets.add_icon} alt="" />
            <p>Add Parking Slots</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
            to={'Parking-list'}
          >
            <img src={assets.users_icon} alt="" />
            <p>Parking List</p>
          </NavLink>
        </ul>
      )}
      {/* Parking List */}
      {dToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
            to={'/parking-dashboard'}
          >
            <img src={assets.home_icon} alt="" />
            <p className="hidden md:block">Dashborad</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
            to={'/parking-Booking'}
          >
            <img src={assets.appointment_icon} alt="" />
            <p className="hidden md:block">Manage Booking</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
            to={'/parking-profile'}
          >
            <img src={assets.users_icon} alt="" />
            <p className="hidden md:block">Profiles</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default sidebar;
