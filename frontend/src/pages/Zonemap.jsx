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
