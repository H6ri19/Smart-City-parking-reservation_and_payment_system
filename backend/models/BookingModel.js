import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  parkId: { type: String, required: true },
  slotTime: { type: String, required: true },
  startDateTime: { type: String, required: true },
  durationInMinutes: { type: Number, required: true },
  slotsAvailable: { type: Number, required: true },
  totalSlots: { type: Number, required: true },
  ratePerHour: { type: Number, required: true },
  userData: { type: Object, required: true },
  parkingData: { type: Object, required: true },
  cancelled: { type: Boolean, default: false },
  payment: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
  bookedAt: { type: Date, default: Date.now },
  totalAmount: { type: Number, required: true },
});

const BookingModel =
  mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default BookingModel;
