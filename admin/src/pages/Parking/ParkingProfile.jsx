import React, { useContext, useEffect, useState } from 'react';
import { ParkingContext } from '../../context/ParkingContext';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { assets } from '../../../../frontend/src/assets/assets';

// Fix Leaflet default icon issue in some builds
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const ParkingProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
    useContext(ParkingContext);
  const { currrency } = useContext(AppContext);
  const [image, setImage] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateProfile = async () => {
    setIsLoading(true);
    try {
      const updateData = {
        location: profileData.location,
        lat: profileData.lat,
        lon: profileData.lon,
        address: profileData.address,
        ratePerHour: profileData.ratePerHour,
        totalSlots: profileData.totalSlots,
        status: profileData.status,
        about: profileData.about,
        image: profileData.image,
      };

      const { data } = await axios.post(
        `${backendUrl}/api/parking/update-profile`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${dToken}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message || 'Update failed');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  if (!profileData) return null;

  return (
    <div>
      <div className="flex flex-col gap-4 m-5">
        <div>
          <div className="flex items-center gap-6">
            {isEdit ? (
              <label htmlFor="image">
                <div className="inline-block relative cursor-pointer">
                  <img
                    className="w-64 h-40 object-cover rounded-lg opacity-90 border border-gray-300"
                    src={image ? URL.createObjectURL(image) : profileData.image}
                    alt="Parking"
                  />
                  <div className="absolute bottom-2 right-2">
                    <img
                      className="w-8"
                      src={assets.upload_icon} // ✅ Use your asset icon
                      alt="Upload"
                    />
                  </div>
                </div>
                <input
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setImage(file);
                  }}
                  type="file"
                  id="image"
                  hidden
                />
              </label>
            ) : (
              <img
                className="w-64 h-40 object-cover rounded-lg border border-gray-300"
                src={profileData.image}
                alt="Parking"
              />
            )}
          </div>
        </div>

        <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
          <div className="mb-2">
            <label className="font-medium text-gray-700">Location</label>
            {isEdit ? (
              <input
                type="text"
                value={profileData.location}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
                className="block border border-gray-300 rounded px-2 py-1 mt-1"
              />
            ) : (
              <p className="text-2xl font-medium text-gray-700">
                {profileData.location}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <div>
              <p className="text-sm font-medium text-neutral-800">Latitude</p>
              {isEdit ? (
                <input
                  type="number"
                  value={profileData.lat}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      lat: parseFloat(e.target.value),
                    }))
                  }
                  className="border border-gray-300 rounded px-2 py-1 mt-1"
                />
              ) : (
                <p>{profileData.lat}</p>
              )}
            </div>

            <div>
              <p className="text-sm font-medium text-neutral-800">Longitude</p>
              {isEdit ? (
                <input
                  type="number"
                  value={profileData.lon}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      lon: parseFloat(e.target.value),
                    }))
                  }
                  className="border border-gray-300 rounded px-2 py-1 mt-1"
                />
              ) : (
                <p>{profileData.lon}</p>
              )}
            </div>
          </div>

          <div className="mt-3">
            <p className="text-sm font-medium text-neutral-800">Total Slots</p>
            {isEdit ? (
              <input
                type="number"
                value={profileData.totalSlots}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    totalSlots: Number(e.target.value),
                  }))
                }
                className="border border-gray-300 rounded px-2 py-1 mt-1 w-24"
              />
            ) : (
              <p>{profileData.totalSlots}</p>
            )}
          </div>

          <div className="mt-3">
            <p className="text-sm font-medium text-neutral-800">About</p>
            {isEdit ? (
              <textarea
                value={profileData.about}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    about: e.target.value,
                  }))
                }
                rows={3}
                className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
              />
            ) : (
              <p className="text-sm text-gray-600 mt-1">{profileData.about}</p>
            )}
          </div>

          <p className="text-gray-600 font-medium mt-4">
            Booking Fee : ₹
            <span className="text-gray-800">
              {isEdit ? (
                <input
                  type="number"
                  value={profileData.ratePerHour}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      ratePerHour: Number(e.target.value),
                    }))
                  }
                  className="border border-gray-300 rounded px-2 py-1 ml-2 w-20"
                />
              ) : (
                profileData.ratePerHour
              )}
            </span>
            /hr
          </p>

          <div className="flex gap-2 py-2 mt-3">
            <p className="font-medium">Address:</p>
            <div className="text-sm">
              {isEdit ? (
                <>
                  <input
                    type="text"
                    value={profileData.address.line1}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          line1: e.target.value,
                        },
                      }))
                    }
                    className="block mb-1 border border-gray-300 rounded px-2 py-1"
                  />
                  <input
                    type="text"
                    value={profileData.address.line2}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          line2: e.target.value,
                        },
                      }))
                    }
                    className="block border border-gray-300 rounded px-2 py-1"
                  />
                </>
              ) : (
                <>
                  <p>{profileData.address.line1}</p>
                  <p>{profileData.address.line2}</p>
                </>
              )}
            </div>
          </div>

          <div className="flex gap-2 pt-2 items-center">
            <input
              type="checkbox"
              checked={profileData.status === 'Available'}
              onChange={() =>
                isEdit &&
                setProfileData((prev) => ({
                  ...prev,
                  status: prev.status === 'Available' ? 'Limited' : 'Available',
                }))
              }
            />
            <label className="text-sm">
              {profileData.status === 'Available' ? 'Available' : 'Limited'}
            </label>
          </div>

          {isEdit ? (
            <div className="flex gap-3 mt-6">
              <button
                onClick={updateProfile}
                disabled={isLoading}
                className="px-4 py-1 border border-green-600 text-sm rounded-full hover:bg-green-600 hover:text-white transition-all"
              >
                {isLoading ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={() => setIsEdit(false)}
                className="px-4 py-1 border border-gray-400 text-sm rounded-full hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-4 py-1 border border-blue-600 text-sm rounded-full mt-5 hover:bg-blue-600 hover:text-white transition-all"
            >
              Edit
            </button>
          )}
        </div>

        {/* ====== Map based on lat/lon ====== */}
        {profileData.lat && profileData.lon && (
          <MapContainer
            center={[profileData.lat, profileData.lon]}
            zoom={16}
            scrollWheelZoom={false}
            style={{ height: '350px', width: '100%', marginTop: '1rem' }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[profileData.lat, profileData.lon]}>
              <Popup>{profileData.location}</Popup>
            </Marker>
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default ParkingProfile;
