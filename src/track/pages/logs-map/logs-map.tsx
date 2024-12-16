import { useState } from "react";
import { Map, MapArticle } from "../../components/shared";
import { Wrapper } from "./logs-map-styled";
import useApi from "@/hooks/useApi";
import { MapsData } from "@/track/utils/mapData";

export function LogsMap() {
  const [active, setActive] = useState<number>(0);

  const { data, isLoading } = useApi("/map?search=unity");

  const filterData = MapsData(data?.data ? data?.data : []);

  return (
    <Wrapper>
      <MapArticle
        data={filterData}
        search={true}
        width={"350px !important"}
        active={active}
        setActive={setActive}
        loading={isLoading}
      />

      <Map
        objData={
          isLoading
            ? { lat: 0, lng: 0 }
            : { lat: filterData[active].lat, lng: filterData[active].lng }
        }
        height="calc(100vh - 195px)"
      />
    </Wrapper>
  );
}
