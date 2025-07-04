import mongoose from "mongoose";

const parkingSchema = new mongoose.Schema({
    location: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    image: {type:String, required:true},
    lat: {type:Number, required:true},
    lon: {type:Number, required:true},
    slotsAvailable: {type:Number, required:true},
    totalSlots: {type:Number, required:true},
    ratePerHour: {type:Number, required:true},
    speciality: {type:String, enum: [
      'Car Parking',
      'Bike Parking',
      'Truck Parking',
      'Bus Parking',
      'EV Charging Zone',
      'Accessible (Disabled) Parking',
    ],required:true},
    address: {type:Object, required:true},
    status: {type: String,enum: ['Available', 'Limited'],required: true,},
    about: {type:String, required:true},
    date: {type:Number, required:true},
    slots_booked: {type:Object, default:{}}
},{minimize:false})

const Parking = mongoose.models.Parking || mongoose.model('Parking', parkingSchema);

export default Parking;