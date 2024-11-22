import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaCar } from "react-icons/fa"; // Import car icon from react-icons
import { renderToString } from "react-dom/server"; // Render React components as strings

const MapComponent = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [pins, setPins] = useState([]);

  useEffect(() => {
    // Get user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition([latitude, longitude]);

        // Add more distant nearby pins
        const nearbyPins = [
          [latitude + 0.05, longitude],      // Further north
          [latitude, longitude + 0.05],      // Further east
          [latitude - 0.05, longitude - 0.05], // Further south-west
        ];
        setPins(nearbyPins);
      },
      (error) => {
        console.error("Error getting location: ", error);
      }
    );
  }, []);

  // Custom car icon as an SVG string using react-dom/server's renderToString
  const carIconSVG = renderToString(<FaCar size={30} color="#ff0000" />); // Render icon to string

  // Create a custom icon using L.DivIcon for the car
  const carIcon = new L.DivIcon({
    html: `<div style="width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; font-size: 30px;">${carIconSVG}</div>`,
    className: "leaflet-car-icon",
    iconSize: [30, 30], // Icon size
    iconAnchor: [50, 50], // Anchor position
  });

  // Default Leaflet icon for user's location
  const userIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {currentPosition && (
        <MapContainer
          center={currentPosition}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* User's Location Marker */}
          <Marker position={currentPosition} icon={userIcon}>
            <Popup>You are here!</Popup>
          </Marker>
       
          {pins.map((pin, index) => (
            <Marker key={index} position={pin} icon={carIcon}>
              <Popup>Driver {index + 1}</Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
};

export default MapComponent;
