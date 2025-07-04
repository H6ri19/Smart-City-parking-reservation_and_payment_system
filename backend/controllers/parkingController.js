import parkingModel from '../models/parkingModel.js'; // ✅ fix path
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import BookingModel from '../models/BookingModel.js';

const changeAvailability = async (req, res) => {
  try {
    const { parkId } = req.body;

    const parkingData = await parkingModel.findById(parkId);
    if (!parkingData) {
      return res.json({ success: false, message: 'Parking not found' });
    }

    // Toggle between 'Available' and 'Limited'
    const newStatus =
      parkingData.status === 'Available' ? 'Limited' : 'Available';
    await parkingModel.findByIdAndUpdate(parkId, { status: newStatus });

    res.json({ success: true, message: 'Availability Changed', newStatus });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const parkingList = async (req, res) => {
  try {
    const parking = await parkingModel.find({}).select(['-password', '-email']);

    res.json({ success: true, parking });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for Parking Slot Login
const loginParking = async (req, res) => {
  try {
    const { email, password } = req.body;
    const parking = await parkingModel.findOne({ email });

    if (!parking) {
      return res.json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, parking.password);

    if (isMatch) {
      const token = jwt.sign({ id: parking._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get Parking Booking for Parking Panel
const bookParking = async (req, res) => {
  try {
    const parkId = req.parkId; // Set by authPark middleware

    if (!parkId) {
      return res.status(400).json({
        success: false,
        message: 'Parking ID missing from token',
      });
    }

    const bookings = await BookingModel.find({ parkId }).sort({ bookedAt: -1 });

    return res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error('Get Parking Bookings Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching parking bookings',
    });
  }
};

// API to mark booking completed for parking Panel
// POST /api/parking/booking-complete
const bookingComplete = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const parkId = req.parkId;

    if (!bookingId || !parkId) {
      return res
        .status(400)
        .json({ success: false, message: 'Missing required fields' });
    }

    const bookingData = await BookingModel.findById(bookingId);
    if (!bookingData) {
      return res
        .status(404)
        .json({ success: false, message: 'Booking not found' });
    }

    if (bookingData.parkId.toString() !== parkId.toString()) {
      return res
        .status(403)
        .json({ success: false, message: 'Unauthorized action' });
    }

    bookingData.isCompleted = true;
    await bookingData.save();

    return res.json({ success: true, message: 'Booking marked as completed' });
  } catch (error) {
    console.error('Booking Complete Error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
// API to mark booking cancel for parking Panel
// POST /api/parking/booking-cancel
const bookingCancel = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const parkId = req.parkId;

    if (!bookingId || !parkId) {
      return res
        .status(400)
        .json({ success: false, message: 'Missing required fields' });
    }

    const bookingData = await BookingModel.findById(bookingId);
    if (!bookingData) {
      return res
        .status(404)
        .json({ success: false, message: 'Booking not found' });
    }

    if (bookingData.parkId.toString() !== parkId.toString()) {
      return res
        .status(403)
        .json({ success: false, message: 'Unauthorized action' });
    }

    bookingData.cancelled = true;
    await bookingData.save();

    return res.json({ success: true, message: 'Booking marked as cancelled' });
  } catch (error) {
    console.error('Booking Cancel Error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// API to get dashborad data for Parking Panel
const parkingDashboard = async (req, res) => {
  try {
    const parkId = req.parkId; // ✅ Read from authenticated request (middleware should assign this)

    if (!parkId) {
      return res
        .status(400)
        .json({ success: false, message: 'Missing parkId' });
    }

    const bookings = await BookingModel.find({ parkId });

    let earnings = 0;
    let clients = new Set();

    bookings.forEach((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.totalAmount || 0; // ✅ Fix: use correct field `totalAmount`, not `amount`
      }
      clients.add(item.userId); // ✅ Use Set to avoid duplicates
    });

    const dashData = {
      earnings,
      bookings: bookings.length,
      clients: clients.size,
      latestBooking: bookings.slice().reverse().slice(0, 5), // ✅ Slice a copy before reversing
    };

    return res.json({ success: true, dashData });
  } catch (error) {
    console.error('Parking Dashboard Error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// API to get parking profile for parking Panel
const parkingProfile = async (req, res) => {
  try {
    const parkId = req.parkId; // ✅ fixed: no destructuring

    const profileData = await parkingModel.findById(parkId).select('-password');

    if (!profileData) {
      return res.status(404).json({
        success: false,
        message: 'Parking profile not found',
      });
    }

    res.status(200).json({
      success: true,
      profileData,
    });
  } catch (error) {
    console.error('Error fetching profile:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile',
    });
  }
};

// API to update parking profile data from parking panel
const updateparkingProfile = async (req, res) => {
  try {
    const parkId = req.parkId; // ✅ get parkId from middleware

    const {
      location,
      lat,
      lon,
      address,
      totalSlots,
      ratePerHour,
      speciality,
      status,
      about,
      image,
    } = req.body; // ✅ get update data from request body

    const updated = await parkingModel.findByIdAndUpdate(
      parkId,
      {
        location,
        lat,
        lon,
        address,
        totalSlots,
        ratePerHour,
        speciality,
        status,
        about,
        image,
      },
      { new: true } // ✅ return updated document
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Parking profile not found',
      });
    }

    res.json({
      success: true,
      message: 'Profile Updated',
      profileData: updated, // ✅ return updated data
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  changeAvailability,
  parkingList,
  loginParking,
  bookParking,
  bookingComplete,
  bookingCancel,
  parkingDashboard,
  parkingProfile,
  updateparkingProfile,
};
