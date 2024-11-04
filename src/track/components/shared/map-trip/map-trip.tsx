import React, { useEffect } from "react";
import L from "leaflet";


const customIcon = L.icon({
  iconUrl: "/assets/icons/location.svg", 
  iconSize: [32, 32], 
  iconAnchor: [16, 32], 
  popupAnchor: [0, -32], 
});

const MapTrip: React.FC = () => {
  useEffect(() => {

    const map = L.map("map").setView([41.2995, 69.2401], 10); 

   
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="/assets/icons/location.svg">OpenStreetMap</a> contributors',
    }).addTo(map);

  
    L.marker([41.2995, 69.2401], { icon: customIcon })
      .addTo(map)
      .bindPopup("This is a marker with a custom icon!")
      .openPopup();
  }, []);

  return (
  
    <div id="map" style={{ width: "100%", height: "480px" }}></div>
  );
};

export default MapTrip;

