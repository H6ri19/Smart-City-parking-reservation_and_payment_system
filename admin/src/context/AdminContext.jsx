import { createContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem('aToken') ? localStorage.getItem('aToken') : ''
  );
  const [parking, setParking] = useState([]);
  const [booking, setBooking] = useState([]);
  const [dashData, setDashData] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const getAllParking = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/all-parking`,
        {},
        { headers: { aToken } }
      );
      if (data.success) {
        setParking(data.parking);
        console.log(data.parking);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeAvailability = async (parkId) => {
    try {
      const updatedList = parking.map((p) => {
        if (p._id === parkId) {
          return {
            ...p,
            status: p.status === 'Available' ? 'Limited' : 'Available',
          };
        }
        return p;
      });

      setParking(updatedList); // Optimistic UI update

      const { data } = await axios.post(
        `${backendUrl}/api/admin/change-availability`,
        { parkId },
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
        getAllParking(); // fallback in case of failure
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllbooking = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/admin/manage-booking`,
        { headers: { aToken } }
      );
      if (data.success) {
        setBooking(data.booking);
        console.log(data.booking);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/cancel-booking`,
        { bookingId },
        {
          headers: {
            atoken: aToken,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getAllbooking(); // Refresh after cancel
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Admin Cancel Error:', error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, {
        headers: { aToken },
      });
      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const value = {
    aToken,
    setAToken,
    backendUrl,
    parking,
    getAllParking,
    changeAvailability,
    booking,
    setBooking,
    getAllbooking,
    cancelBooking,
    dashData,
    getDashData,
  };
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
