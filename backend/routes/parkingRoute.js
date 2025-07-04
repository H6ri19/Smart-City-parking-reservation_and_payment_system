import express from 'express';
import {
  parkingList,
  loginParking,
  bookParking,
  bookingComplete,
  bookingCancel,
  parkingDashboard,
  parkingProfile,
  updateparkingProfile,
} from '../controllers/parkingController.js'; // <-- Add .js
import authPark from '../middlewares/authPark.js';
const parkingRouter = express.Router();
parkingRouter.get('/list', parkingList);
parkingRouter.post('/login', loginParking);
parkingRouter.get('/booking', authPark, bookParking);
parkingRouter.post('/booking-complete', authPark, bookingComplete);
parkingRouter.post('/booking-cancel', authPark, bookingCancel);
parkingRouter.get('/dashboard', authPark, parkingDashboard);
parkingRouter.get('/profile', authPark, parkingProfile);
parkingRouter.post('/update-profile', authPark, updateparkingProfile);

export default parkingRouter;
