import express from 'express';
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookSlot,
  getUserBookings,
  cancelBookingSlot,
  paymentRazorpay,
  verifyRazorpay,
} from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

userRouter.get('/get-profile', authUser, getProfile);
userRouter.post(
  '/update-profile',
  authUser,
  upload.single('image'),
  updateProfile
);
userRouter.post('/book-slot', authUser, bookSlot);
userRouter.get('/bookings', authUser, getUserBookings);
userRouter.post('/cancel-booking', authUser, cancelBookingSlot);
userRouter.post('/payment-razorpay', authUser, paymentRazorpay);
userRouter.post('/verifyRazorpay', authUser, verifyRazorpay);

export default userRouter;
