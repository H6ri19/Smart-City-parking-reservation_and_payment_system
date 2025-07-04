import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const ParkingList = () => {
  const { parking, aToken, getAllParking, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllParking();
    }
  }, [aToken]);

  return (
    <div className="p-6">
      <h1 className="text-lg font-medium mb-4">ALL PARKING LOCATION</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {parking.map((item, index) => (
          <div
            key={index}
            className="border rounded shadow-md p-4 flex flex-col items-start bg-white"
          >
            <img
              src={item.image}
              alt={item.location}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h2 className="text-neutral-800 text-lg font-medium">
              {item.location}
            </h2>
            <p className="text-sm text-zinc-600"> {item.speciality}</p>
            <p className="text-sm text-zinc-600"> {item.status}</p>
            <div className="mt-2 flex items-center gap-1 text-sm">
              <label htmlFor={`active-${index}`} className="text-sm">
                Active
              </label>
              <input
                onChange={() => changeAvailability(item._id)}
                id={`active-${index}`}
                type="checkbox"
                checked={item.status === 'Available'}
              />
            </div>

            {/* Mini Map */}
            <div className="mt-4 w-full h-40 rounded overflow-hidden">
              <MapContainer
                center={[item.lat, item.lon]}
                zoom={15}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[item.lat, item.lon]}>
                  <Popup>{item.location}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParkingList;
