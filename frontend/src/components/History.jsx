import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const History = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [history, setHistory] = useState([]);

  // ✅ Fetch only cancelled bookings
  const getHistoryBookings = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/bookings`, {
        headers: {
          token,
        },
      });

      if (data.success) {
        const cancelledBookings = data.bookings.filter(
          (booking) => booking.cancelled === true
        );
        setHistory(cancelledBookings.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (token) getHistoryBookings();
  }, [token]);

  return (
    <div className="mt-12">
      <p className="pb-3 font-medium text-zinc-700 border-b">
        Booking History (Cancelled)
      </p>

      {history.length === 0 ? (
        <p className="text-sm text-gray-500 mt-4">
          No cancelled or expired bookings found.
        </p>
      ) : (
        history.map((item, index) => (
          <div key={index} className="grid sm:flex sm:gap-6 py-2 border-b">
            <img
              className="w-32 h-20 object-cover bg-indigo-50 rounded"
              src={item.parkingData.image || '/fallback.jpg'}
              alt="parking"
            />

            <div className="text-sm text-zinc-600 flex-1 mt-2 sm:mt-0">
              <p className="font-semibold text-neutral-800">
                {item.parkingData.location}
              </p>
              <p>{item.parkingData.speciality}</p>

              <p className="text-xs mt-1">Date: {item.startDateTime}</p>
              <p className="text-xs">
                Time: {item.slotTime} | {item.durationInMinutes} min
              </p>

              <p className="text-xs text-red-600 mt-1 font-medium">
                Status: Cancelled
              </p>

              {item.payment && (
                <p className="text-xs text-green-600 mt-1">
                  Paid: ₹{item.totalAmount}
                </p>
              )}

              {item.cancelledAt && (
                <p className="text-xs text-gray-400 mt-1">
                  Cancelled on: {new Date(item.cancelledAt).toLocaleString()}
                </p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default History;
