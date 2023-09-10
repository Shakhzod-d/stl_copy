import React, { useState } from "react";
import { GoogleMap, Marker, InfoWindow, InfoBox } from "@react-google-maps/api";
import { mapContainerStyles, useDashboarMap } from "@/components/map";
import { IDashboardMap } from "@/types/dashbord.type";
import moment from "moment-timezone";
import { Link } from "react-router-dom";

interface Props {
     mapType: string;
     data: IDashboardMap[];
}

const MapContainer: React.FC<Props> = ({ mapType, data }) => {
     const { isLoaded, onLoad, unMound, mapRef } = useDashboarMap(
          data,
          mapType
     );

     const [hoverId, setHoverId] = useState<any>(null);
     // console.log(hoverId);

     return (
          <div className="map-container">
               {isLoaded && (
                    <GoogleMap
                         mapContainerStyle={mapContainerStyles}
                         onLoad={onLoad}
                         onUnmount={unMound}
                         zoom={22}
                    >
                         {data.map((el: IDashboardMap) => {
                              if (el.device?.location) {
                                   const { lat, lng }: any = el.device?.location
                                   return (
                                        <Marker
                                             key={el._id}
                                             onMouseOver={() => setHoverId(el)}
                                             onMouseOut={() => setHoverId(null)}
                                             // icon={{
                                             //      url: "/assets/icons/location.svg",
                                             //      scaledSize: new google.maps.Size(
                                             //           35,
                                             //           35
                                             //      ),
                                             // }}
                                             position={{ lng, lat }}
                                        />
                                   )
                              }
                         })}
                         {data.map((el: IDashboardMap) => {
                              if (el.device?.location) {
                                   const { lat, lng }: any = el.device?.location
                                   return (
                                        <InfoBox
                                             key={el._id + "adadadas"}
                                             options={{
                                                  enableEventPropagation: true,
                                                  pixelOffset: new google.maps.Size(
                                                       -90,
                                                       0
                                                  ),
                                                  boxClass: "dashboard-info-box",
                                                  closeBoxURL: "",
                                                  position: new google.maps.LatLng({ lng, lat }),
                                                  disableAutoPan: true,
                                             }}
                                        >
                                             <div className="dashboard-marker-info">
                                                  <span className="head">{el.firstName} {el.lastName}</span>
                                                  <span>Track Unit: {el.vehicleUnit}</span>
                                                  <span>Odometr: {el.device?.odometer}</span>
                                                  <span>Location: {el.device?.state}</span>
                                                  <span>Time: {moment(el.device?.location.time as number * 1000).fromNow()}</span>
                                                  <Link to="">View tranckings -&gt;</Link>
                                             </div>
                                        </InfoBox>
                                   )
                              }

                         })}
                         {/* {hoverId && (
                              <InfoWindow
                                   position={hoverId.position}
                                   options={{
                                        pixelOffset: new google.maps.Size(
                                             0,
                                             -50
                                        ),
                                        zIndex: 1,
                                   }}
                              >
                                   <ul className="dashboard-marker-desc">
                                        <li>
                                             <span>Driver:</span>
                                             {hoverId?.driver}
                                        </li>
                                        <li>
                                             <span>Status:</span>
                                             <span className="uppercase">
                                                  {hoverId?.currentStatus}
                                             </span>
                                        </li>
                                        <li>
                                             <span>Address:</span>
                                             {hoverId?.device?.locationName}
                                        </li>
                                        <li>
                                             <span>Odometer:</span>
                                             {hoverId?.odometer}
                                        </li>
                                        <li>
                                             <span>Speed:</span>
                                             {hoverId?.speed}
                                        </li>
                                        <li>
                                             <span>Date:</span>
                                             {hoverId?.date}
                                        </li>
                                   </ul>
                              </InfoWindow>
                         )} */}
                    </GoogleMap>
               )}
          </div>
     );
};

export default MapContainer;
