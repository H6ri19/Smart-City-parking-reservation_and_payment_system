// Image Imports
import Booking from './Booking.png';
import header_img from './header_img.png';
import group_profiles from './group_profiles.png';
import profile_pic from './profile_pic.jpg';
import contact_image from './contact_image.jpg';
import about_image from './about_image.jpg';
import logo from './logo.svg';

// Icons & UI Elements
import dropdown_icon from './dropdown_icon.svg';
import menu_icon from './menu_icon.svg';
import cross_icon from './cross_icon.png';
import chats_icon from './chats_icon.svg';
import verified_icon from './verified_icon.svg';
import arrow_icon from './arrow_icon.svg';
import info_icon from './info_icon.svg';
import upload_icon from './upload_icon.png';
import stripe_logo from './stripe_logo.png';
import razorpay_logo from './razorpay_logo.png';

// Location Images
import Anna from './Anna.jpg';
import guindy from './guindy.jpg';
import tris from './tris.jpg';
import st_thomas from './st_thomas.jpg';
import saidap from './saidap.jpeg';
import trice from './trice.jpg';
import nugama from './nugama.jpg';
import velachery from './Velachery.jpg';
import mahabalipuram from './Mahala.jpg';
import tambaram from './tambaram.jpg';
import Indian from './Indian.jpeg';
import STS from './STS.jpg';

// Parking Type Icons
import Car_Parking from './Car_Parking.svg';
import Bike_Parking from './Bike_Parking.svg';
import Truck_Parking from './truck_parking.svg';
import Bus_Parking from './Bus_parking.svg';
import Disable_parking from './Disable_parking.svg';
import EV_ChargingZone from './EV_ChargingZone.svg';


// ✅ Export All Assets
export const assets = {
  // UI & Logos
  logo,
  dropdown_icon,
  menu_icon,
  cross_icon,
  chats_icon,
  verified_icon,
  arrow_icon,
  info_icon,
  upload_icon,
  stripe_logo,
  razorpay_logo,

  // UI Images
  Booking,
  header_img,
  group_profiles,
  profile_pic,
  contact_image,
  about_image,

  // Locations
  Anna,
  guindy,
  tris,
  st_thomas,
  saidap,
  trice,
  nugama,
  velachery,
  mahabalipuram,
  tambaram,
  Indian,
  STS,

  // Parking Types
  Car_Parking,
  Bike_Parking,
  Truck_Parking,
  Bus_Parking,
  Disable_parking,
  EV_ChargingZone
};


// ✅ Parking Types
export const specialityData = [
  { speciality: 'Car Parking', image: Car_Parking },
  { speciality: 'Bike Parking', image: Bike_Parking },
  { speciality: 'Truck Parking', image: Truck_Parking },
  { speciality: 'Bus Parking', image: Bus_Parking },
  { speciality: 'Accessible (Disabled) Parking', image: Disable_parking },
  { speciality: 'EV Charging Zone', image: EV_ChargingZone }
];


// ✅ Parking Slot Data
export const parking = [
  {
    _id: 'park01',
    location: 'Anna Nagar',
    image: Anna,
    lat: 13.0878,
    lon: 80.2108,
    slotsAvailable: 10,
    totalSlots: 50,
    ratePerHour: 40,
    speciality: 'Car Parking',
    address: {
      line1: 'Anna Nagar West',
      line2: 'Chennai',
    },
    status: 'Available',
    about:
      'Secure car parking with 24/7 surveillance in Anna Nagar West, ideal for shopping and residential areas.',
  },
  {
    _id: 'park02',
    location: 'Guindy',
    image: guindy,
    lat: 13.0067,
    lon: 80.2206,
    slotsAvailable: 2,
    totalSlots: 40,
    ratePerHour: 35,
    speciality: 'Car Parking',
    address: {
      line1: 'Near Metro Station',
      line2: 'Guindy, Chennai',
    },
    status: 'Limited',
    about:
      'Close to the metro station, this car parking offers quick access to public transport and busy markets.',
  },
  {
    _id: 'park03',
    location: 'Tirusulam',
    image: tris,
    lat: 12.9803,
    lon: 80.1630,
    slotsAvailable: 0,
    totalSlots: 42,
    ratePerHour: 45,
    speciality: 'Car Parking',
    address: {
      line1: 'Thirupati Nagar, Moovarasanpet, Yashodha Nagar',
      line2: 'Tirusulam, Chennai',
    },
    status: 'Available',
    about:
      ' ',
  },
  {
    _id: 'park04',
    location: 'St. Thomas Mount',
    image: st_thomas,
    lat: 13.0086,
    lon: 80.1996,
    slotsAvailable: 0,
    totalSlots: 42,
    ratePerHour: 45,
    speciality: 'Bike Parking',
    address: {
      line1: 'Ramapuram, Collectors Nagar, Alandur',
      line2: 'St. Thomas Mount, Chennai',
    },
    status: 'Limited',
    about:
      'Dedicated bike parking in a well-connected residential neighborhood.',
  },
  {
    _id: 'park05',
    location: 'Saidapet',
    image: saidap,
    lat: 13.0292,
    lon: 80.2215,
    slotsAvailable: 0,
    totalSlots: 42,
    ratePerHour: 45,
    speciality: 'Bike Parking',
    address: {
      line1: 'Nagapattinam Hwy, Venkta Puram',
      line2: 'Saidapet, Chennai',
    },
    status: 'Available',
    about:
      'Safe and accessible bike parking near highway junctions and market areas.',
  },
  {
    _id: 'park06',
    location: 'Tiruvallikeni',
    image: trice,
    lat: 13.0583,
    lon: 80.2786,
    slotsAvailable: 0,
    totalSlots: 42,
    ratePerHour: 45,
    speciality: 'Truck Parking',
    address: {
      line1: 'Venkatrangam Pillai St, Narayana Krishnaraja Puram',
      line2: 'Triplicane, Chennai',
    },
    status: 'Available',
    about:
      'Heavy vehicle truck parking with wide entry and secure environment.',
  },
  {
    _id: 'park07',
    location: 'Nungambakkam',
    image: nugama,
    lat: 13.0606,
    lon: 80.2409,
    slotsAvailable: 0,
    totalSlots: 42,
    ratePerHour: 45,
    speciality: 'Bus Parking',
    address: {
      line1: 'LIBA Entrance - Loyola College',
      line2: 'Nungambakkam, Chennai',
    },
    status: 'Available',
    about:
      'Bus parking zone near college area with easy approach roads.',
  },
  {
    _id: 'park08',
    location: 'Velachery',
    image: velachery,
    lat: 12.9801,
    lon: 80.2180,
    slotsAvailable: 3,
    totalSlots: 30,
    ratePerHour: 30,
    speciality: 'EV Charging Zone',
    address: {
      line1: 'Phoenix MarketCity',
      line2: 'Velachery, Chennai',
    },
    status: 'Available',
    about:
      'Electric vehicle charging zone at Velachery mall. Fast charging available.',
  },
  {
    _id: 'park09',
    location: 'Mahabalipuram',
    image: mahabalipuram,
    lat: 12.6228,
    lon: 80.1931,
    slotsAvailable: 0,
    totalSlots: 30,
    ratePerHour: 30,
    speciality: 'EV Charging Zone',
    address: {
      line1: 'Othavadai St, Fisherman Colony',
      line2: 'Mahabalipuram, Tamil Nadu',
    },
    status: 'Limited',
    about:
      'EV-friendly zone for tourists visiting beachside attractions in Mahabalipuram.',
  },
  {
    _id: 'park10',
    location: 'Tambaram',
    image: tambaram,
    lat: 12.9249,
    lon: 80.1272,
    slotsAvailable: 0,
    totalSlots: 30,
    ratePerHour: 50,
    speciality: 'EV Charging Zone',
    address: {
      line1: 'Chitlapakkam 2nd Main Rd, Iyappa Nagar',
      line2: 'Tambaram Sanatorium, Chennai',
    },
    status: 'Limited',
    about:
      'Charging zone near residential colonies, ideal for EV commuters.',
  },
  {
    _id: 'park11',
    location: 'Indira Gandhi INA',
    image: Indian,
    lat: 28.5597,
    lon: 77.0857,
    slotsAvailable: 0,
    totalSlots: 30,
    ratePerHour: 50,
    speciality: 'Accessible (Disabled) Parking',
    address: {
      line1: 'Service Rd, Sector 21, Dwarka,',
      line2: 'New Delhi',
    },
    status: 'Available',
    about:
      'Reserved accessible parking with ramps and marked slots near hospitals and offices.',
  },
  {
    _id: 'park12',
    location: 'Tiranga Memorial',
    image: STS,
    lat: 11.6581,
    lon: 92.7400,
    slotsAvailable: 0,
    totalSlots: 30,
    ratePerHour: 50,
    speciality: 'Bus Parking',
    address: {
      line1: 'MQ84+G3F, Corbyns Cove Rd, South Point, Shadipur',
      line2: 'Andaman and Nicobar Islands',
    },
    status: 'Limited',
    about:
      'Large bus parking area for tourist buses near coastal attractions.',
  },
];

