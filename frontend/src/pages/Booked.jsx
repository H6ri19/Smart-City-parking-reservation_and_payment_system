import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import relatedpark from '../components/relatedpark';
import IndiaMapWithMarkers from '../components/IndiaMapWithMarkers';
import { toast } from 'react-toastify';
import axios from 'axios';

const Booked = () => {
  const { parkID } = useParams();
  const { parking, currrencySymbol, backendUrl, token, getParkingData } =
    useContext(AppContext);

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const navigate = useNavigate();
  const [parkInfo, setparkInfo] = useState(null);
  const [parkSlots, setparkSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setslotTime] = useState('');
  const [startDateTime, setStartDateTime] = useState(null);
  const [durationInMinutes, setDurationInMinutes] = useState(30);
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchParkInfo = () => {
    const park = parking.find((p) => p._id === parkID);
    setparkInfo(park);
  };

  const getAvailableSlots = () => {
    setparkSlots([]);
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        currentDate.setHours(currentDate.getHours() + 1);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      const timeSlots = [];
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;

        const slotTime = formattedTime;

        const isSlotBooked =
          parkInfo?.slots_booked?.[formattedDate]?.includes(slotTime);

        if (!isSlotBooked) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setparkSlots((prev) => [...prev, timeSlots]);
    }
  };

  const handleSlotSelect = (item) => {
    setslotTime(item.time);
    setStartDateTime(item.datetime);
  };

  const formatDateTime = (date) =>
    date?.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const getEndDateTime = () => {
    if (!startDateTime) return null;
    const end = new Date(startDateTime);
    end.setMinutes(end.getMinutes() + durationInMinutes);
    return end;
  };

  const calculateTotalAmount = () => {
    if (!durationInMinutes || !parkInfo) return 0;
    const hours = durationInMinutes / 60;
    return Math.ceil(hours * parkInfo.ratePerHour);
  };

  const bookSlot = async () => {
    if (!token) {
      toast.warn('Login to book a slot');
      return navigate('/login');
    }

    const selectedSlot = parkSlots[slotIndex]?.[0]?.datetime;
    if (!selectedSlot) return toast.error('No slot selected');

    const day = String(selectedSlot.getDate()).padStart(2, '0');
    const month = String(selectedSlot.getMonth() + 1).padStart(2, '0');
    const year = selectedSlot.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    const totalAmount = calculateTotalAmount();

    if (
      !parkID ||
      !slotTime ||
      !formattedDate ||
      !durationInMinutes ||
      !totalAmount
    ) {
      return toast.error(
        'Missing required fields. Please select a slot and duration.'
      );
    }

    try {
      const payload = {
        parkId: parkID,
        startDateTime: formattedDate,
        slotTime,
        durationInMinutes,
        totalAmount,
      };

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-slot`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getParkingData();
        navigate('/My_booking');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Booking Error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchParkInfo();
  }, [parking, parkID]);

  useEffect(() => {
    if (parkInfo) getAvailableSlots();
  }, [parkInfo]);

  useEffect(() => {
    if (parkInfo) {
      setTotalAmount(calculateTotalAmount());
    }
  }, [durationInMinutes, parkInfo]);

  return (
    parkInfo && (
      <div className="px-4 sm:px-10">
        {/* Park Info Section */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <img
            className="bg-primary w-full sm:max-w-72 rounded-lg"
            src={parkInfo.image}
            alt="parking"
          />

          <div className="mt-5">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">
              User Ratings
            </h4>
            <div className="space-y-2 text-sm text-gray-700">
              {[
                { label: 'Price', value: 4 },
                { label: 'Quality', value: 5 },
                { label: 'Place', value: 3 },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="w-20">{item.label}</span>
                  <span className="text-yellow-500">
                    {'⭐'.repeat(item.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 bg-white">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {parkInfo.location}
              <img className="w-5" src={assets.verified_icon} alt="verified" />
            </p>
            <p className="text-sm text-gray-600">
              {parkInfo.speciality} • {parkInfo.status} • ₹
              {parkInfo.ratePerHour}/hr
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Address: {parkInfo.address.line1}, {parkInfo.address.line2}
            </p>
            <div className="mt-3">
              <div className="flex items-center gap-1 text-sm font-medium text-gray-900">
                About <img src={assets.info_icon} alt="info" />
              </div>
              <p className="text-sm text-gray-500 mt-1 max-w-[700px]">
                {parkInfo.about}
              </p>
            </div>
            <p className="mt-2">
              Parking Slot Fee:{' '}
              <strong>
                {currrencySymbol}
                {parkInfo.ratePerHour}
              </strong>
            </p>
          </div>
        </div>

        {/* Slot Selection */}
        <div className="sm:ml-72 sm:pl-4 mt-6 font-medium text-gray-700">
          <p className="text-lg mb-2">Booking Slots</p>

          <div className="flex gap-3 overflow-x-auto mt-2">
            {parkSlots.map((item, index) => (
              <div
                key={index}
                onClick={() => setSlotIndex(index)}
                className={`text-center py-4 px-2 min-w-16 w-16 rounded-full cursor-pointer ${
                  slotIndex === index
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                }`}
              >
                <p className="text-sm font-semibold">
                  {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                </p>
                <p className="text-base">
                  {item[0] && item[0].datetime.getDate()}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 overflow-x-auto mt-4">
            {parkSlots[slotIndex]?.map((item, index) => (
              <p
                key={index}
                onClick={() => handleSlotSelect(item)}
                className={`text-sm px-5 py-2 rounded-full cursor-pointer ${
                  item.time === slotTime
                    ? 'bg-primary text-white'
                    : 'text-gray-400 border border-gray-300'
                }`}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
          </div>

          {/* Duration & Summary */}
          <div className="mt-4">
            <label className="block mb-1 font-medium text-sm text-gray-700">
              Enter Duration (minutes)
            </label>
            <input
              type="number"
              value={durationInMinutes}
              onChange={(e) => setDurationInMinutes(Number(e.target.value))}
              min="15"
              step="15"
              className="border border-gray-300 rounded-md p-2 text-sm w-32"
            />
          </div>

          {startDateTime && (
            <div className="mt-4 text-sm bg-gray-50 border border-gray-200 p-4 rounded-xl shadow-sm space-y-2 max-w-sm">
              <div>
                <strong>Booking Start:</strong>{' '}
                <span className="text-gray-800">
                  {formatDateTime(startDateTime)}
                </span>
              </div>
              <div>
                <strong>Booking End:</strong>{' '}
                <span className="text-gray-800">
                  {formatDateTime(getEndDateTime())}
                </span>
              </div>
              <div>
                <strong>Duration:</strong>{' '}
                <span className="text-gray-800">
                  {durationInMinutes} minutes
                </span>
              </div>
              <div>
                <strong>Total Amount:</strong>{' '}
                <span className="text-gray-800">
                  {currrencySymbol}
                  {totalAmount}
                </span>
              </div>
            </div>
          )}

          <button
            onClick={bookSlot}
            className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6"
          >
            Book Now
          </button>
        </div>

        {/* Map & Related */}
        {parkInfo.lat && parkInfo.lon && (
          <div className="mt-10">
            <h3 className="text-lg font-semibold mb-4">
              Parking Location on Map
            </h3>
            <IndiaMapWithMarkers
              lat={parkInfo.lat}
              lon={parkInfo.lon}
              location={parkInfo.location}
              image={parkInfo.image}
            />
          </div>
        )}

        <relatedpark parkID={parkID} speciality={parkInfo.speciality} />
      </div>
    )
  );
};

export default Booked;
