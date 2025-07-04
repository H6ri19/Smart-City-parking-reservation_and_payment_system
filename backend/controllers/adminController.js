import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import parkingModel from '../models/parkingModel.js';
import jwt from 'jsonwebtoken';
import bookingModel from '../models/bookingModel.js';
import BookingModel from '../models/bookingModel.js';
import userModel from '../models/userModel.js';
// API for adding Parking
const addparking = async (req, res) => {
  try {
    const {
      location,
      email,
      password,
      speciality,
      lat,
      lon,
      slotsAvailable,
      totalSlots,
      ratePerHour,
      address,
      about,
      status,
    } = req.body;
    const imageFile = req.file;

    // console.log({ location, email, password, speciality, lat, lon, slotsAvailable, totalSlots, ratePerHour, address, about},imageFile);

    if (
      !location ||
      !email ||
      !password ||
      !speciality ||
      !lat ||
      !lon ||
      !slotsAvailable ||
      !totalSlots ||
      !ratePerHour ||
      !address ||
      !about ||
      !status
    ) {
      return res.json({ success: false, message: 'Missing Details' });
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Please enter Valid Email' });
    }

    // vaildating strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: 'Please enter Strong password',
      });
    }

    // hashing parking password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: 'image',
    });
    const imageUrl = imageUpload.secure_url;

    const parkingData = {
      location,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      lat,
      lon,
      slotsAvailable,
      totalSlots,
      ratePerHour,
      address: JSON.parse(address),
      about,
      status,
      date: Date.now(),
    };

    const newparking = new parkingModel(parkingData);
    await newparking.save();

    res.json({ success: true, message: 'Parking Added' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for Admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// API to get All parking list for Admin panel
// const allParking = async (req,res) => {
//     try {
//         const parking = await parkingModel.find({}).select('-password')
//         res.json({success:true,parking})
//     } catch(error) {
//         console.log(error);
//         res.json({success:false, message:error.message})
//     }
// }
const allParking = async (req, res) => {
  try {
    const parking = await parkingModel.find({}).select('-password');
    res.json({ success: true, parking });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all parking list
const ManageBooking = async (req, res) => {
  try {
    const booking = await BookingModel.find({});
    res.json({ success: true, booking });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for Booking cancellation
const CancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.body;

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: 'Booking ID is required',
      });
    }

    const booking = await bookingModel.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    // ✅ Mark booking as cancelled instead of deleting
    booking.cancelled = true;
    booking.cancelledAt = new Date();
    await booking.save();

    // ✅ Free up slot from parking
    const parking = await parkingModel.findById(booking.parkId);
    if (parking && parking.slots_booked) {
      const dateKey = booking.startDateTime;
      const slotArray = parking.slots_booked[dateKey];

      if (slotArray?.includes(booking.slotTime)) {
        parking.slots_booked[dateKey] = slotArray.filter(
          (slot) => slot !== booking.slotTime
        );

        if (parking.slots_booked[dateKey].length === 0) {
          delete parking.slots_booked[dateKey];
        }

        await parking.save();
      }
    }

    return res.json({
      success: true,
      message: 'Booking cancelled by admin successfully',
    });
  } catch (error) {
    console.error('Admin Cancel Booking Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while cancelling booking',
    });
  }
};

// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
  try {
    const parkings = await parkingModel.find({});
    const users = await userModel.find({});
    const bookings = await bookingModel.find({});

    const dashData = {
      parkings: parkings.length,
      bookings: bookings.length,
      clients: users.length,
      latestBookings: bookings.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export {
  addparking,
  loginAdmin,
  allParking,
  ManageBooking,
  CancelBooking,
  adminDashboard,
};
