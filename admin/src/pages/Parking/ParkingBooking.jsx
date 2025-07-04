import React, { useContext, useEffect } from 'react';
import { ParkingContext } from '../../context/ParkingContext';
import { assets } from '../../assets/assets';

const ParkingBooking = () => {
  const { dToken, bookings, getBookings, completebooking, cancelbooking } =
    useContext(ParkingContext);

  useEffect(() => {
    if (dToken) {
      getBookings();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Booking Details</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-[1fr_2fr_2.5fr_2fr_2.5fr_3fr_2fr_1.5fr_1.5fr_1.5fr] py-3 px-6 border-b font-semibold text-gray-700">
          <p>S.No</p>
          <p>User Name</p>
          <p>Phone / Email</p>
          <p>Vehicle Type</p>
          <p>Vehicle No. Plate</p>
          <p>Date & Time</p>
          <p>Duration</p>
          <p>Fees</p>
          <p>Payment</p>
          <p>Action</p>
        </div>

        {/* Table Body */}
        {bookings.reverse().map((item, index) => (
          <div
            key={item._id}
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[1fr_2fr_2.5fr_2fr_2.5fr_3fr_2fr_1.5fr_1.5fr_1.5fr] items-center py-3 px-6 border-b text-gray-600"
          >
            <p>{index + 1}</p>
            <p>{item.userData.name}</p>
            <p>
              {item.userData.phone} / {item.userData.email}
            </p>
            <p>{item.userData.vehicle_type}</p>
            <p>{item.userData.VehicleNo_Plate}</p>
            <p>
              {item.startDateTime} / {item.slotTime}
            </p>
            <p>{item.durationInMinutes} mins</p>
            <p>₹{item.totalAmount}/hr</p>
            <p className="text-xs inline border-primary px-2 rounded-full">
              {item.payment ? 'Online' : 'CASH'}
            </p>
            {item.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-500 text-xs font-medium">Completed</p>
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
  );
};

export default ParkingBooking;
