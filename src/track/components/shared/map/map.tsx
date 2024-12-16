import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Maps, MapWrapper } from "./map-styled";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface ObjData {
  lat?: number;
  lng?: number;
}

interface Props {
  objData: ObjData;
  height?: string;
}

export function Map({ objData, height }: Props) {
  const sidebarActive = useSelector(
    (state: RootState) => state.booleans.sidebarActive
  );
  useEffect(() => {
    const map = L.map("map");

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // Maxsus iconni belgilash
    const customIcon = L.icon({
      iconUrl: "/assets/icons/navigation.svg", // Ikon URL
      iconSize: [30, 30], // Ikon o'lchami
      iconAnchor: [15, 30], // Ikon markazi
    });

    let marker: L.Marker | null = null; // Markerni boshida null qilib belgilaymiz

    if (objData.lat && objData.lng) {
      // Agar lat va lng mavjud bo‘lsa
      map.setView([objData.lat, objData.lng], 14); // Zoom darajasi 14
      marker = L.marker([objData.lat, objData.lng], { icon: customIcon }).addTo(
        map
      ); // Marker qo‘shish
    } else {
      // Agar lat yoki lng mavjud bo'lmasa
      map.setView([0, 0], 5); // Default ko'rinish
    }

    return () => {
      map.remove(); // Xarita va markerni tozalash
    };
  }, [objData]); // Faqat objData o'zgarganda ishlaydi

  return (
    <MapWrapper $height={height} $active={sidebarActive}>
      <Maps id="map"></Maps>
    </MapWrapper>
  );
}
