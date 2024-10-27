import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

import "leaflet-routing-machine/dist/leaflet-routing-machine.css"; // Routing CSS
import { useSelector } from "react-redux";
import { Maps, MapWrapper } from "./map-styled";
import { RootState } from "@/store";

interface Truck {
  id: number;
  name: string;
  lat: number;
  lng: number;
  status: string;
  address: string;
  destination: string;
  destLat: number;
  destLng: number;
  progress: number; // 0 to 100 for progress
}

interface Props {
  mapData: Truck[];
  activeId: number;
  height?: string;
}

export function Map({ mapData, activeId, height }: Props) {
  const [activeTruck, setActiveTruck] = useState<Truck | undefined>(
    mapData.find((truck) => truck.id === activeId)
  );

  const sidebarActive = useSelector(
    (state: RootState) => state.booleans.sidebarActive
  );

  useEffect(() => {
    const selectedTruck = mapData.find((truck) => truck.id === activeId);
    setActiveTruck(selectedTruck);
  }, [activeId, mapData]);

  useEffect(() => {
    if (activeTruck) {
      const map = L.map("map").setView([activeTruck.lat, activeTruck.lng], 8);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      const getInterpolatedPosition = (
        startLat: number,
        startLng: number,
        endLat: number,
        endLng: number,
        progress: number
      ) => {
        const lat = startLat + (endLat - startLat) * (progress / 100);
        const lng = startLng + (endLng - startLng) * (progress / 100);
        return { lat, lng };
      };

      const currentLocation = getInterpolatedPosition(
        activeTruck.lat,
        activeTruck.lng,
        activeTruck.destLat,
        activeTruck.destLng,
        activeTruck.progress
      );

      L.Routing.control({
        waypoints: [
          L.latLng(activeTruck.lat, activeTruck.lng),
          L.latLng(activeTruck.destLat, activeTruck.destLng),
        ],
        routeWhileDragging: true,
        lineOptions: {
          styles: [{ color: "black", weight: 2 }],
          extendToWaypoints: true,
          missingRouteTolerance: 0.1,
        },
      }).addTo(map);

      const startIcon = new L.Icon({
        iconUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Green_Dot.svg/2048px-Green_Dot.svg.png",
        iconSize: [25, 25],
        iconAnchor: [12, 25],
      });

      const endIcon = new L.Icon({
        iconUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Red_Dot.svg/2048px-Red_Dot.svg.png",
        iconSize: [25, 25],
        iconAnchor: [12, 25],
      });

      const driverIcon = new L.Icon({
        iconUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Yellow_Dot.svg/2048px-Yellow_Dot.svg.png",
        iconSize: [25, 25],
        iconAnchor: [12, 25],
      });

      L.marker([activeTruck.lat, activeTruck.lng], { icon: startIcon })
        .addTo(map)
        .bindPopup(
          `<strong>Start Point</strong><br>Truck: ${activeTruck.name}`
        );

      L.marker([activeTruck.destLat, activeTruck.destLng], { icon: endIcon })
        .addTo(map)
        .bindPopup(
          `<strong>End Point</strong><br>Destination: ${activeTruck.destination}`
        );

      L.marker([currentLocation.lat, currentLocation.lng], { icon: driverIcon })
        .addTo(map)
        .bindPopup(
          `<strong>${activeTruck.name}</strong><br>Status: ${activeTruck.status}<br>Address: ${activeTruck.address}`
        );

      return () => {
        map.remove();
      };
    }
  }, [activeTruck]);

  return (
    <MapWrapper $active={sidebarActive} $height={height}>
      <Maps id="map"></Maps>
    </MapWrapper>
  );
}
