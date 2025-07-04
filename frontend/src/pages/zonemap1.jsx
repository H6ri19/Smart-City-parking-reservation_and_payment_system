// // src/pages/zonemap1.jsx
// import React, { useRef, useState } from 'react';
// import { FaLocationArrow, FaTimes } from 'react-icons/fa';
// import {
//   GoogleMap,
//   Marker,
//   Autocomplete,
//   DirectionsRenderer,
//   useJsApiLoader,
// } from '@react-google-maps/api';

// const center = { lat: 22.5937, lng: 78.9629 }; // Center of India

// function Zonemap1() {
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//     libraries: ['places'],
//   });

//   const [map, setMap] = useState(null);
//   const [directionsResponse, setDirectionsResponse] = useState(null);
//   const [distance, setDistance] = useState('');
//   const [duration, setDuration] = useState('');

//   const originRef = useRef();
//   const destinationRef = useRef();

//   if (!isLoaded) return <p>Loading map...</p>;

//   async function calculateRoute() {
//     if (!originRef.current.value || !destinationRef.current.value) return;
//     const directionsService = new google.maps.DirectionsService();
//     const results = await directionsService.route({
//       origin: originRef.current.value,
//       destination: destinationRef.current.value,
//       travelMode: google.maps.TravelMode.DRIVING,
//     });
//     setDirectionsResponse(results);
//     setDistance(results.routes[0].legs[0].distance.text);
//     setDuration(results.routes[0].legs[0].duration.text);
//   }

//   function clearRoute() {
//     setDirectionsResponse(null);
//     setDistance('');
//     setDuration('');
//     originRef.current.value = '';
//     destinationRef.current.value = '';
//   }

//   return (
//     <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
//       <div style={{ height: '100%', width: '100%' }}>
//         <GoogleMap
//           center={center}
//           zoom={5}
//           mapContainerStyle={{ width: '100%', height: '100%' }}
//           options={{
//             zoomControl: false,
//             streetViewControl: false,
//             mapTypeControl: false,
//             fullscreenControl: false,
//           }}
//           onLoad={(map) => setMap(map)}
//         >
//           <Marker position={center} />
//           {directionsResponse && (
//             <DirectionsRenderer directions={directionsResponse} />
//           )}
//         </GoogleMap>
//       </div>
//       <div
//         style={{
//           position: 'absolute',
//           top: '20px',
//           left: '50%',
//           transform: 'translateX(-50%)',
//           background: 'white',
//           padding: '16px',
//           borderRadius: '8px',
//           boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
//           zIndex: 10,
//           minWidth: '400px',
//         }}
//       >
//         <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
//           <Autocomplete>
//             <input
//               type="text"
//               placeholder="Origin"
//               ref={originRef}
//               style={{ flex: 1, padding: '8px' }}
//             />
//           </Autocomplete>
//           <Autocomplete>
//             <input
//               type="text"
//               placeholder="Destination"
//               ref={destinationRef}
//               style={{ flex: 1, padding: '8px' }}
//             />
//           </Autocomplete>
//           <button
//             onClick={calculateRoute}
//             style={{
//               padding: '8px 12px',
//               background: '#ec4899',
//               color: '#fff',
//             }}
//           >
//             Calculate
//           </button>
//           <button
//             onClick={clearRoute}
//             style={{ padding: '8px', background: '#ddd' }}
//           >
//             <FaTimes />
//           </button>
//         </div>
//         <div
//           style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//           }}
//         >
//           <span>Distance: {distance}</span>
//           <span>Duration: {duration}</span>
//           <button
//             style={{ background: 'none', border: 'none' }}
//             onClick={() => {
//               map.panTo(center);
//               map.setZoom(5);
//             }}
//           >
//             <FaLocationArrow />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Zonemap1;

import { useRef, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import './map.css';

const center = [22.5937, 78.9629]; // India center

function Routing({ currentLocation, destinationRef }) {
  const map = useMap();

  useEffect(() => {
    if (!currentLocation || !destinationRef.current?.value) return;

    const destination = destinationRef.current.value;

    const routingControl = L.Routing.control({
      waypoints: [],
      routeWhileDragging: false,
      show: false,
    }).addTo(map);

    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${destination}`
    )
      .then((res) => res.json())
      .then((destData) => {
        if (destData.length === 0) return;
        const destLatLng = L.latLng(destData[0].lat, destData[0].lon);
        const originLatLng = L.latLng(currentLocation.lat, currentLocation.lng);
        routingControl.setWaypoints([originLatLng, destLatLng]);
        map.fitBounds([originLatLng, destLatLng]);
      });

    return () => map.removeControl(routingControl);
  }, [currentLocation, destinationRef.current?.value, map]);

  return null;
}

const ZoneMap = () => {
  const destinationRef = useRef();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [showRoute, setShowRoute] = useState(false);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        alert('Unable to retrieve your location.');
      }
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="px-4 sm:px-10">
      <h1 className="text-2xl font-semibold mb-4 mt-6">Live Zone Map</h1>

      <div className="mb-4">
        <input
          ref={destinationRef}
          className="border px-4 py-2 mr-2 rounded"
          placeholder="Enter Destination"
        />
        <button
          onClick={() => setShowRoute(!showRoute)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {showRoute ? 'Clear Route' : 'Route From Current Location'}
        </button>
      </div>

      <MapContainer
        center={currentLocation || center}
        zoom={13}
        style={{ height: '80vh', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {currentLocation && <Marker position={currentLocation} />}
        {showRoute && currentLocation && (
          <Routing
            currentLocation={currentLocation}
            destinationRef={destinationRef}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default ZoneMap;
