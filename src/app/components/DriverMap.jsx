"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Loader from "./loader";

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function MapComponent() {
    const [userLocation, setUserLocation] = useState([51.505, -0.09]);
    const [loading, setLoading] = useState(true);

    const carLocations = [
        { id: 1, name: "Car 1", coords: [51.515, -0.1] },
        { id: 2, name: "Car 2", coords: [51.52, -0.12] },
        { id: 3, name: "Car 3", coords: [51.53, -0.08] },
    ];

    useEffect(() => {
        // Fetching the user's geolocation on component mount
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation([latitude, longitude]);
                    setLoading(false);
                },
                (error) => {
                    console.error("Error fetching geolocation:", error);
                    setLoading(false);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
            setLoading(false);
        }
    }, []);

    if (loading) {
        return (
            <Loader />
        );
    }

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <MapContainer center={userLocation} zoom={13} style={{ width: "100%", height: "100%" }} whenCreated={(map) => { map.invalidateSize(); }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                <Marker position={userLocation}>
                    <Popup>
                        موقعك الحالي: [{userLocation[0]}, {userLocation[1]}]
                    </Popup>
                </Marker>

                {carLocations.map((car) => (
                    <React.Fragment key={car.id}>
                        <Marker position={car.coords}>
                            <Popup>
                                {car.name}: [{car.coords[0]}, {car.coords[1]}]
                            </Popup>
                        </Marker>

                        <Polyline positions={[userLocation, car.coords]} color="blue" />
                    </React.Fragment>
                ))}
            </MapContainer>
        </div>
    );
}
