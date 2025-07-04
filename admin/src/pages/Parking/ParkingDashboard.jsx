import React from 'react';
import { useContext } from 'react';
import { ParkingContext } from '../../context/ParkingContext';
import { useEffect } from 'react';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const ParkingDashboard = () => {
  const {
    dToken,
    dashData,
    setDashData,
    getDashData,
    cancelbooking,
    completebooking,
  } = useContext(ParkingContext);
  const currency = '₹';
  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);
  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3 ">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all ">
            <img className="w-14" src={assets.earning_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {currency}
                {dashData.earnings}
              </p>
              <p className="text-gray-400">Earning</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all ">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.bookings}
              </p>
              <p className="text-gray-400">Booking Slots</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all ">
            <img className="w-14" src={assets.UsersDash_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.clients}
              </p>
              <p className="text-gray-400">Clients</p>
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Booking</p>
          </div>
          <div className="pt-4 border border-t-0">
            {dashData.latestBooking.map((item, index) => (
              <div
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                key={index}
              >
                <img
                  className="rounded-full w-10"
                  src={
                    item.userData.image
                      ? item.userData.image
                      : assets.upload_area
                  }
                  alt="User"
                />

                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {item.userData.name}
                  </p>
                  <p className="text-gray-600">{item.startDateTime}</p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">
                    Completed
                  </p>
                ) : (
                  <div className="flex items-center gap-2">
                    <img
                      onClick={() => cancelbooking(item._id)}
                      src={assets.cancel_icon}
                      alt="Cancel"
                      className="w-10 cursor-pointer"
                    />
                    <img
                      onClick={() => completebooking(item._id)}
                      src={assets.tick_icon}
                      alt="Confirm"
                      className="w-10 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default ParkingDashboard;
