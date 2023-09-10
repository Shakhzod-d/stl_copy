import React from "react";
import { GoogleMap, Polyline } from "@react-google-maps/api";
import {
     mapContainerStyles,
     options,
     useTrackingMap,
} from "@/components/map";
import mapStyles from "@/components/map/mapStyles";

interface Props {
     data: any;
}

const MapContainer: React.FC<Props> = ({ data }) => {

     const { isLoaded, onLoad, unMound } = useTrackingMap(data);

     return (
          <div className="map-container">
               {isLoaded && (
                    <GoogleMap
                         mapContainerStyle={mapContainerStyles}
                         onLoad={onLoad}
                         onUnmount={unMound}
                         options={{
                              ...options,
                              styles: mapStyles,
                              mapTypeId: google.maps.MapTypeId.ROADMAP,
                         }}
                    >
                         <Polyline
                              path={data?.map((el: any) => {
                                   return {
                                        lng: el.lng,
                                        lat: el.lat,
                                   }
                              })}
                              options={{
                                   geodesic: true,
                                   strokeColor: "#ee5e52",
                                   strokeOpacity: 1.0,
                                   strokeWeight: 2,
                                   icons: [
                                        {
                                             offset: "0%",
                                             fixedRotation: true,
                                             icon: {
                                                  path: "m24 4c-7.74 0-14 6.26-14 14 0 8.34 8.84 19.84 12.48 24.22.8.96 2.26.96 3.06 0 3.62-4.38 12.46-15.88 12.46-24.22 0-7.74-6.26-14-14-14zm0 19c-2.76 0-5-2.24-5-5 0-2.76 2.24-5 5-5 2.76 0 5 2.24 5 5 0 2.76-2.24 5-5 5z",
                                                  strokeColor: "#ee5e52",
                                                  fillColor: "#ee5e52",
                                                  fillOpacity: 1,
                                                  scale: 0.7,
                                                  anchor: new google.maps.Point(
                                                       22,
                                                       42
                                                  ),
                                             },
                                        },
                                        {
                                             offset: "100%",
                                             icon: {
                                                  path: "m12.9299 4.26 6.15 14.99c.34.83-.51 1.66-1.33 1.29l-5.34-2.36c-.26-.11-.55-.11-.81 0l-5.34 2.36c-.82.36-1.67-.46-1.33-1.29l6.15-14.99c.33-.83 1.51-.83 1.85 0z",
                                                  strokeColor: "#ee5e52",
                                                  fillColor: "#ee5e52",
                                                  fillOpacity: 1,
                                                  scale: 1,
                                                  anchor: new google.maps.Point(
                                                       12,
                                                       20
                                                  ),
                                             },
                                        },
                                   ],
                              }}
                         />
                    </GoogleMap>
               )}
          </div>
     );
};

export default MapContainer;
