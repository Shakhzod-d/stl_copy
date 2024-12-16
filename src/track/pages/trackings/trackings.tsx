import { useState, useRef } from "react";
import { CustomTable, Map } from "../../components/shared";
import { trackingData, trackingHeader } from "../../utils/constants";
import { Div, Wrapper } from "./trackings-styled";

const truckData = [
  {
    id: 1,
    name: "Aisyah Clara Riyanti",
    lat: 34.0522, // Los Angeles
    lng: -118.2437,
    address: "459, Cedar Ln, Los Angeles",
    status: "61 mph",
    destination: "New York, NY",
    destLat: 40.7128, // New York
    destLng: -74.006,
    progress: 20, // 20% of the route completed
  },
];

export function Trackings() {
  const [active, setActive] = useState<boolean>(false);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = () => {
    setActive(true);
    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); // Delay to allow the map to render
  };

  return (
    <Wrapper>
      <CustomTable
        data={trackingData}
        columns={trackingHeader}
        // pagination={true}
        pTotal={50}
        onClick={handleButtonClick}
      />

      {active && (
        <Div ref={mapRef} style={{ overflowX: "auto" }}>
          <Map objData={{ lat: 34.0522, lng: -118.2437 }} height="700px" />
        </Div>
      )}
    </Wrapper>
  );
}
