import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddParking = () => {
  const [parkImg, setParkImg] = useState(false);
  const [location, setLocatiion] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [speciality, setSpeciality] = useState('Car Parking');
  const [totalSlots, setTotalSlots] = useState('');
  const [slotsAvailable, setSlotsAvailable] = useState('');
  const [ratePerHour, setRatePerHour] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [status, setStatus] = useState('Available');
  const [about, setAbout] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!parkImg) {
        return toast.error('Image not Selected');
      }

      const formData = new FormData();
      formData.append('image', parkImg);
      formData.append('location', location);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('lat', latitude);
      formData.append('lon', longitude);
      formData.append('speciality', speciality);
      formData.append('totalSlots', Number(totalSlots));
      formData.append('slotsAvailable', Number(slotsAvailable));
      formData.append('ratePerHour', Number(ratePerHour));
      formData.append(
        'address',
        JSON.stringify({ line1: addressLine1, line2: addressLine2 })
      );
      formData.append('status', status);
      formData.append('about', about);

      // console log formdata
      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-parking`,
        formData,
        { headers: { aToken } }
      );

      if (data.success) {
        // toast.success(data.message);
        if (data.success) {
          toast.success(data.message || 'Parking Add');
          // Clear form
          setLocatiion('');
          setEmail('');
          setPassword('');
          setLatitude('');
          setLongitude('');
          setSpeciality('Car Parking');
          setTotalSlots('');
          setSlotsAvailable('');
          setRatePerHour('');
          setAddressLine1('');
          setAddressLine2('');
          setStatus('Available');
          setAbout('');
          setParkImg(false);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">ADD PARKING</p>
      <div className="bg-white px-8 py-8 border rounded w-full max:w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-♦ mb-8 text-gray-500">
          <label htmlFor="park-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={parkImg ? URL.createObjectURL(parkImg) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setParkImg(e.target.files[0])}
            type="file"
            id="park-img"
            hidden
          />
          <p>
            Upload Parking <br /> Picture
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4 ">
            <div className="flex-1 flex flex-col gap-1">
              <p>Location name</p>
              <input
                onChange={(e) => setLocatiion(e.target.value)}
                value={location}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="loaction"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Owner Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border rounded px-3 py-2"
                type="Email"
                placeholder="Mail"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Owner Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border rounded px-3 py-2"
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Latitude</p>
              <input
                onChange={(e) => setLatitude(e.target.value)}
                value={latitude}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="lat"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Longitude</p>
              <input
                onChange={(e) => setLongitude(e.target.value)}
                value={longitude}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="lon"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="border rounded px-3 py-2"
                name=""
                id=""
              >
                <option value="Car Parking">Car Parking</option>
                <option value="Bike Parking">Bike Parking</option>
                <option value="Bus Parking">Bus Parking</option>
                <option value="Truck Parking">Truck Parking</option>
                <option value="Accessible (Disabled) Parking">
                  Accessible Parking
                </option>
                <option value="EV Charging Zone">EV Charging Zone</option>
              </select>
            </div>
          </div>
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Totals Slots </p>
              <input
                onChange={(e) => setTotalSlots(e.target.value)}
                value={totalSlots}
                className="border rounded px-3 py-2"
                type="number"
                placeholder=" Total Slots"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>slotsAvailable</p>
              <input
                onChange={(e) => setSlotsAvailable(e.target.value)}
                value={slotsAvailable}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Avaliable"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>ratePerHour</p>
              <input
                onChange={(e) => setRatePerHour(e.target.value)}
                value={ratePerHour}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Avaliable"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                onChange={(e) => setAddressLine1(e.target.value)}
                value={addressLine1}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="address 1"
                required
              />
              <input
                onChange={(e) => setAddressLine2(e.target.value)}
                value={addressLine2}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="address 2"
                required
              />
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <p>status</p>
          <select
            onChange={(e) => setStatus(e.target.value)}
            value={status}
            className="border rounded px-3 py-2"
            name=""
            id=" "
          >
            <option value="Available">Available</option>
            <option value="Limited">Limited</option>
          </select>
        </div>
        <div>
          <p className="mt-4 mb-2">About Parking</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className="w-full px-4 pt-2 border rounded"
            type="text"
            placeholder="write about parking"
            row={5}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-primary px-10 py-3 mt-4 text-white rounded-full "
        >
          Add Parking
        </button>
      </div>
    </form>
  );
};

export default AddParking;
