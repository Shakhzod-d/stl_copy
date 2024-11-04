// import { useSelector } from "react-redux";
import { useState } from "react";
import { Map, MapArticle } from "../../components/shared";
import { ArticleMapItem } from "@/track/constants";
import { Wrapper } from "./logs-map-styled";
// import { RootState } from "../../store/store";
const truckData = [
  {
    id: 1,
    name: "Aisyah Clara Riyanti",
    lat: 38.861, // Qarshi
    lng: 65.7847,
    address: "Qarshi, Uzbekistan",
    status: "61 mph",
    destination: "Samarqand, Uzbekistan",
    destLat: 39.6542, // Samarqand
    destLng: 66.9597,
    progress: 20, // 20% of the route completed
  },
  {
    id: 2,
    name: "Matthew Wilson",
    lat: 40.7128, // New York
    lng: -74.006,
    address: "937, Main St, New York",
    status: "0 mph",
    destination: "Los Angeles, CA",
    destLat: 34.0522, // Los Angeles
    destLng: -118.2437,
    progress: 100, // 100% (arrived at destination)
  },
  {
    id: 3,
    name: "Mehdi Kasongo",
    lat: 29.7604, // Houston
    lng: -95.3698,
    address: "311, Pine Rd, Houston",
    status: "SB",
    destination: "San Francisco, CA",
    destLat: 37.7749, // San Francisco
    destLng: -122.4194,
    progress: 50, // 50% of the route completed
  },
  {
    id: 4,
    name: "Kendrik Ababio",
    lat: 25.7617, // Miami
    lng: -80.1918,
    address: "900, Maple Ave, Miami",
    status: "SB",
    destination: "Atlanta, GA",
    destLat: 33.749, // Atlanta
    destLng: -84.388,
    progress: 30, // 30% of the route completed
  },
  {
    id: 5,
    name: "Mohammed Chizimu",
    lat: 41.8781, // Chicago
    lng: -87.6298,
    address: "294, Maple Ave, Chicago",
    status: "SB",
    destination: "Houston, TX",
    destLat: 29.7604, // Houston
    destLng: -95.3698,
    progress: 75, // 75% of the route completed
  },
  {
    id: 6,
    name: "Ronald Kim",
    lat: 39.7392, // Denver
    lng: -104.9903,
    address: "990, Pine Rd, Denver",
    status: "Off",
    destination: "Phoenix, AZ",
    destLat: 33.4484, // Phoenix
    destLng: -112.074,
    progress: 40, // 40% of the route completed
  },
  {
    id: 7,
    name: "Linda Williams",
    lat: 36.1699, // Las Vegas
    lng: -115.1398,
    address: "500, Sunset Blvd, Las Vegas",
    status: "70 mph",
    destination: "San Diego, CA",
    destLat: 32.7157, // San Diego
    destLng: -117.1611,
    progress: 60, // 60% of the route completed
  },
];

export function LogsMap() {
  const [active, setActive] = useState<number>(1);
  return (
    <Wrapper>
      <MapArticle
        data={ArticleMapItem}
        search={true}
        width={"350px !important"}
        active={active}
        setActive={setActive}
      />
      <Map mapData={truckData} activeId={active}  height="calc(100vh - 195px)"/>
    </Wrapper>
  );
}
