import express from 'express';
import {
  addparking,
  allParking,
  loginAdmin,
  ManageBooking,
  CancelBooking,
  adminDashboard,
} from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailability } from '../controllers/parkingController.js';

const adminRouter = express.Router();

adminRouter.post('/add-parking', authAdmin, upload.single('image'), addparking);
adminRouter.post('/login', loginAdmin);
adminRouter.post('/all-parking', authAdmin, allParking);
adminRouter.post('/change-availability/', authAdmin, changeAvailability);
adminRouter.get('/manage-booking', authAdmin, ManageBooking);
adminRouter.post('/cancel-booking', authAdmin, CancelBooking);
adminRouter.get('/dashboard', authAdmin, adminDashboard);

export default adminRouter;
