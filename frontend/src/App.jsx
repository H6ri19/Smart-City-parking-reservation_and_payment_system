import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Pages
import Home from './pages/Home';
import Parking from './pages/Parking';
import Login from './pages/Login';
import Zonemap from './pages/Zonemap';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import MyBooking from './pages/MyBooking';
import Booked from './pages/Booked';
import About from './pages/About';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/parking" element={<Parking />} />
        <Route path="/parking/:speciality" element={<Parking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Zonemap" element={<Zonemap />} />
        <Route path="/About" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/My_Profile" element={<MyProfile />} />
        <Route path="/My_booking" element={<MyBooking />} />
        <Route path="/booked/:parkID" element={<Booked />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
