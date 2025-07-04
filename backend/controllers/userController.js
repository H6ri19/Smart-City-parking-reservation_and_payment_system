import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import parkingModel from '../models/parkingModel.js';
import BookingModel from '../models/BookingModel.js';
// import razorpay from 'razorpay';
import razorpayInstance from '../config/razorpay.js';

// API to register user
const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      dob,
      vehicle_type,
      vehicle_Brand,
      VehicleNo_Plate,
    } = req.body;

    // Check for missing fields
    if (
      !name ||
      !email ||
      !password ||
      !dob ||
      !vehicle_type ||
      !vehicle_Brand ||
      !VehicleNo_Plate
    ) {
      return res.json({ success: false, message: 'Missing Details' });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Enter a valid email' });
    }

    // Validate password length
    if (password.length < 8) {
      return res.json({ success: false, message: 'Enter a strong password' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Build user object
    const userData = {
      name,
      email,
      password: hashedPassword,
      dob,
      vehicle_type,
      vehicle_Brand,
      VehicleNo_Plate,
    };

    // Save to DB
    const newUser = new userModel(userData);
    const user = await newUser.save();

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'User does not exist' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: 'Invalid Credentials' });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API TO get user profite data
const getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const userData = await userModel.findById(userId).select('-password');
    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to post update profile data
const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      name,
      phone,
      address,
      gender,
      dob,
      vehicle_type,
      vehicle_Brand,
      VehicleNo_Plate,
    } = req.body;

    const imageFile = req.file;
    console.log('req.file:', req.file);

    if (
      !name ||
      !phone ||
      !gender ||
      !dob ||
      !vehicle_type ||
      !vehicle_Brand ||
      !VehicleNo_Plate
    ) {
      return res.json({ success: false, message: 'Data Missing' });
    }

    const updateData = {
      name,
      phone,
      gender,
      dob,
      vehicle_type,
      vehicle_Brand,
      VehicleNo_Plate,
    };

    if (address) {
      updateData.address = JSON.parse(address);
    }

    if (imageFile && imageFile.path) {
      console.log('Uploading image to Cloudinary from path:', imageFile.path);
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: 'image',
      });
      updateData.image = imageUpload.secure_url;
    }

    await userModel.findByIdAndUpdate(userId, updateData);

    res.json({ success: true, message: 'Profile Updated' });
  } catch (error) {
    console.log('Update Profile Error:', error);
    res.json({ success: false, message: error.message });
  }
};

// API to book parking Slot
const bookSlot = async (req, res) => {
  try {
    const { parkId, slotTime, startDateTime, durationInMinutes, totalAmount } =
      req.body;

    const userId = req.userId; // From auth middleware

    // 🔍 Basic Validation
    if (
      !parkId ||
      !slotTime ||
      !startDateTime ||
      !durationInMinutes ||
      !totalAmount
    ) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    // ✅ Fetch User & Parking Info
    const user = await userModel.findById(userId).select('-password');
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    const parking = await parkingModel.findById(parkId);
    if (!parking) {
      return res
        .status(404)
        .json({ success: false, message: 'Parking not found' });
    }

    // ✅ Calculate Total Amount
    const expectedAmount = Math.ceil(
      (durationInMinutes / 60) * parking.ratePerHour
    );
    if (expectedAmount !== totalAmount) {
      return res.status(400).json({
        success: false,
        message: 'Total amount mismatch. Please try again.',
      });
    }

    // ✅ Check & Reserve Slot Time
    let slotsBooked = parking.slots_booked || {};

    // Check if this date is already in the map
    if (slotsBooked[startDateTime]) {
      if (slotsBooked[startDateTime].includes(slotTime)) {
        return res.json({
          success: false,
          message: 'Slot not available. Try a different time.',
        });
      } else {
        slotsBooked[startDateTime].push(slotTime);
      }
    } else {
      slotsBooked[startDateTime] = [slotTime];
    }

    // ✅ Update slots_booked in DB
    parking.slots_booked = slotsBooked;
    await parking.save();

    // 🧹 Optional: remove slots_booked from bookingData
    const { slots_booked, ...cleanedParking } = parking.toObject();

    // ✅ Create Booking
    const newBooking = new BookingModel({
      userId,
      parkId,
      slotTime,
      startDateTime,
      durationInMinutes,
      slotsAvailable: parking.slotsAvailable,
      totalSlots: parking.totalSlots,
      ratePerHour: parking.ratePerHour,
      totalAmount: expectedAmount,
      userData: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        image: user.image,
        vehicle_type: user.vehicle_type,
        vehicle_Brand: user.vehicle_Brand,
        VehicleNo_Plate: user.VehicleNo_Plate,
      },
      parkingData: {
        location: cleanedParking.location,
        address: cleanedParking.address,
        speciality: cleanedParking.speciality,
        status: cleanedParking.status,
        image: cleanedParking.image,
        lat: cleanedParking.lat,
        lon: cleanedParking.lon,
      },
    });

    await newBooking.save();

    return res.status(201).json({
      success: true,
      message: 'Booking successful',
      booking: newBooking,
    });
  } catch (err) {
    console.error('Booking error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error while booking slot',
    });
  }
};

// API to get user booked slots frontend  My-Booking page
const getUserBookings = async (req, res) => {
  try {
    const userId = req.userId; // set by authUser middleware

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const bookings = await BookingModel.find({ userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error('Error fetching bookings:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching bookings',
    });
  }
};
// API to cancel booking
// controller in userControllers.js
const cancelBookingSlot = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const userId = req.userId;

    if (!bookingId) {
      return res
        .status(400)
        .json({ success: false, message: 'Booking ID required' });
    }

    const booking = await BookingModel.findOne({ _id: bookingId, userId });

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: 'Booking not found' });
    }

    // ✅ Update to mark booking as cancelled
    booking.cancelled = true;
    booking.cancelledAt = new Date();

    await booking.save();

    // ✅ Remove booked slot from parking
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
      message: 'Booking cancelled successfully',
    });
  } catch (error) {
    console.error('Cancel Booking Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while cancelling booking',
    });
  }
};

// const razorpayInstance = new razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });
// API to handle Razorpay payment
const paymentRazorpay = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const bookingData = await BookingModel.findById(bookingId);
    if (!bookingData) {
      return res
        .status(404)
        .json({ success: false, message: 'Booking not found' });
    }

    const options = {
      amount: bookingData.totalAmount * 100, // paise
      currency: process.env.CURRENCY || 'INR',
      receipt: bookingId,
      payment_capture: 1,
    };

    const order = await razorpayInstance.orders.create(options); // ✅ Correct
    res.json({ success: true, order });
  } catch (error) {
    console.log('Razorpay Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to verify Razorpay payment
const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    console.log('Order Info:', orderInfo);
    if (orderInfo.status === 'paid') {
      await BookingModel.findByIdAndUpdate(orderInfo.receipt, {
        payment: true,
      });
      res.json({ success: true, message: 'Payment successful' });
    } else {
      res.json({ success: false, message: 'Payment failed' });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookSlot,
  getUserBookings,
  cancelBookingSlot,
  paymentRazorpay,
  verifyRazorpay,
};
