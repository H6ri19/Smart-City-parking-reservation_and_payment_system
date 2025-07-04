import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import History from '../components/History';

const Booking = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [booked, setBooked] = useState([]);
  const navigate = useNavigate();

  const getUserBooked = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/bookings`, {
        headers: { token },
      });
      if (data.success) {
        setBooked(data.bookings.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/user/cancel-booking`,
        { bookingId },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getUserBooked();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Parking Booking',
      description: 'Payment for parking slot booking',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/user/verifyRazorpay`,
            response,
            { headers: { token } }
          );
          if (data.success) {
            toast.success('Payment Successful');
            getUserBooked();
            navigate('/My_Booking');
          }
        } catch (error) {
          toast.error(error.response?.data?.message || error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const BookingRazorpay = async (bookingId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-razorpay`,
        { bookingId },
        { headers: { token } }
      );
      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (token) getUserBooked();
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Booking Slots
      </p>
      <div>
        {booked
          .filter((b) => !b.cancelled)
          .map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            >
              <div>
                <img
                  className="w-32 bg-indigo-50"
                  src={item.parkingData.image}
                  alt=""
                />
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="font-semibold text-neutral-800">
                  {item.parkingData.location}
                </p>
                <p>{item.parkingData.speciality}</p>
                <p className="text-zinc-700 font-medium mt-1">Address:</p>
                <p className="text-xs">{item.parkingData.address.line1}</p>
                <p className="text-xs">{item.parkingData.address.line2}</p>
                <p className="text-xs mt-1">
                  <span className="text-sm text-neutral-700 font-medium">
                    Date & Time:
                  </span>{' '}
                  {item.startDateTime} | {item.slotTime} |{' '}
                  {item.durationInMinutes} min
                </p>
              </div>
              <div className="flex flex-col gap-2 justify-end">
                {!item.cancelled && item.payment && !item.isCompleted && (
                  <button className="sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50">
                    Paid
                  </button>
                )}
                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <button
                    onClick={() => BookingRazorpay(item._id)}
                    className="text-sm sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white"
                  >
                    Pay Online
                  </button>
                )}
                {!item.cancelled && !item.isCompleted && (
                  <button
                    onClick={() => cancelBooking(item._id)}
                    className="text-sm sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white"
                  >
                    Cancel Slot
                  </button>
                )}
                {item.isCompleted && (
                  <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
                    Completed
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>

      <History />
    </div>
  );
};

export default Booking;
