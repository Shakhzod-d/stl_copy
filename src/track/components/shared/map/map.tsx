import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
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
  progress: number;
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
      const map = L.map("map");

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

      // Focus map on driver's location
      map.setView([currentLocation.lat, currentLocation.lng], 12);

      const driverIcon = L.icon({
        iconUrl: "/assets/icons/navigation.svg",
        iconSize: [30, 30] as [number, number],
        iconAnchor: [15, 30] as [number, number],
      });

      // Add driver's current location marker
      L.marker([currentLocation.lat, currentLocation.lng], { icon: driverIcon })
        .addTo(map)
        // .bindPopup(
        //   `<strong>${activeTruck.name}</strong><br>Status: ${activeTruck.status}<br>Address: ${activeTruck.address}`
        // )
        .openPopup(); // Automatically open popup on load

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
