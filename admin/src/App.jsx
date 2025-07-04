import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/Login';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/sidebar';

import DashBorad from './pages/Admin/DashBorad';
import AddParking from './pages/Admin/AddParking';
import Booking from './pages/Admin/Booking';
import ParkingList from './pages/Admin/ParkingList';
import { ParkingContext } from './context/ParkingContext';
import ParkingDashboard from './pages/Parking/ParkingDashboard';
import ParkingBooking from './pages/Parking/ParkingBooking';
import ParkingProfile from './pages/Parking/ParkingProfile';

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(ParkingContext);

  return aToken || dToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          {/* Admin routes */}
          <Route path="/" element={<></>} />
          <Route path="/admin-DashBoard" element={<DashBorad />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/add-parking" element={<AddParking />} />
          <Route path="/parking-list" element={<ParkingList />} />
          {/* Parking Routes */}
          <Route path="/parking-dashboard" element={<ParkingDashboard />} />
          <Route path="/parking-Booking" element={<ParkingBooking />} />
          <Route path="/parking-profile" element={<ParkingProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
