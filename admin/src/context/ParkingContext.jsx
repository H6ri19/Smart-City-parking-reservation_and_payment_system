import { useState } from 'react';
import { createContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const ParkingContext = createContext();

const ParkingContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [dToken, setDToken] = useState(
    localStorage.getItem('dToken') ? localStorage.getItem('dToken') : ''
  );
  const [bookings, setBookings] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [profileData, setProfileData] = useState(false);

  const getBookings = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/parking/booking`, {
        headers: { dToken },
      });
      if (data.success) {
        setBookings(data.bookings);
        console.log(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // ✅ Mark Booking as Completed
  const completebooking = async (bookingId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/parking/booking-complete`,
        { bookingId },
        {
          headers: { dToken },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getBookings(); // refresh updated bookings
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Complete Booking Error:', error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // ✅ Cancel Booking
  const cancelbooking = async (bookingId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/parking/booking-cancel`,
        { bookingId },
        {
          headers: { dToken },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getBookings(); // refresh updated bookings
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Cancel Booking Error:', error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/parking/dashboard`, {
        headers: { dToken },
      });
      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Cancel Booking Error:', error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/parking/profile`, {
        headers: {
          Authorization: `Bearer ${dToken}`, // ✅ standard format
        },
      });

      if (data.success) {
        setProfileData(data.profileData);
        console.log('Parking Profile:', data.profileData);
      }
    } catch (error) {
      console.error('Fetch Profile Error:', error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const value = {
    dToken,
    setDToken,
    backendUrl,
    bookings,
    setBookings,
    getBookings,
    completebooking,
    cancelbooking,
    dashData,
    setDashData,
    getDashData,
    profileData,
    setProfileData,
    getProfileData,
  };
  return (
    <ParkingContext.Provider value={value}>
      {props.children}
    </ParkingContext.Provider>
  );
};

export default ParkingContextProvider;
