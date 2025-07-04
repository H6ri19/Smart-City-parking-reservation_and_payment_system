import React from 'react';
import { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const Booking = () => {
  const { aToken, booking, getAllbooking, cancelBooking } =
    useContext(AdminContext);
  const { calculatePrice } = useContext(AppContext);
  useEffect(() => {
    if (aToken) {
      getAllbooking();
    }
  }, [aToken]);
  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">Manage Booking</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[1fr_2fr_2.5fr_2fr_2.5fr_2fr_3.5fr_2.5fr_2fr_1fr] py-3 px-6 border-b font-semibold text-gray-700">
          <p>S.No</p>
          <p>User Name</p>
          <p>Phone / Email</p>
          <p>Vehicle Type</p>
          <p>Vehicle Number Plate</p>
          <p>Parking Name</p>
          <p>Date & Time</p>
          <p>Duration</p>
          <p>Payment</p>
          <p>Action</p>
        </div>
        {booking.map((item, index) => (
          <div
            key={item._id}
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[1fr_2fr_2.5fr_2fr_2.5fr_2fr_3.5fr_2.5fr_2fr_1fr] items-center py-3 px-6 border-b text-gray-600"
          >
            <p>{index + 1}</p>
            <p>{item.userData.name}</p>
            <p>
              {item.userData.phone} / {item.userData.email}
            </p>
            <p>{item.userData.vehicle_type}</p>
            <p>{item.userData.VehicleNo_Plate}</p>
            <p>{item.parkingData.location}</p>
            <p>
              {item.startDateTime} / {item.slotTime}
            </p>
            <p>{item.durationInMinutes} mins</p>
            <p>₹{item.totalAmount}</p>
            {item.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-400 text-xs font-medium">Completed</p>
            ) : (
              <img
                onClick={() => cancelBooking(item._id)}
                className="w-10 cursor-pointer"
                src={assets.cancel_icon}
                alt=""
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Booking;
