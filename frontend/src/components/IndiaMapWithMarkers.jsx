// src/components/IndiaMapWithMarkers.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';

// Fix marker icon path issue in Leaflet
const DefaultIcon = L.icon({
  iconUrl: markerIconPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const IndiaMapWithMarkers = ({ lat, lon, location, image }) => {
  if (!lat || !lon) return null;

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={15}
      scrollWheelZoom={false}
      style={{ height: '400px', width: '100%', borderRadius: '10px' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[lat, lon]}>
        <Popup>
          <div style={{ textAlign: 'center' }}>
            <strong>{location}</strong>
            <br />
            {image && (
              <img
                src={image}
                alt={location}
                style={{
                  width: '150px',
                  marginTop: '5px',
                  borderRadius: '5px',
                }}
              />
            )}
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default IndiaMapWithMarkers;
