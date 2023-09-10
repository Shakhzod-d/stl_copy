import { useRef, useEffect } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { mapInit, options } from ".";
import mapStyles from "./mapStyles";
import { IDashboardMap } from "@/types/dashbord.type";
import { MapOptions } from "google-map-react";

export const useDashboarMap = (data: IDashboardMap[], mapType: string) => {
    const mapRef = useRef<google.maps.Map | null>(null);

    const { isLoaded } = useJsApiLoader(mapInit);

    useEffect(() => {
        if (mapRef?.current) {
            const map = mapRef.current;
            fitBounds(map);
        }
    }, [data]);

    useEffect(() => {
        if (mapRef?.current) {
            const map = mapRef.current;
            setMapOptions(map);
        }
    }, [mapType, mapRef]);

    const setMapOptions = (map: google.maps.Map) => {
        let mapOptions: MapOptions = {
            ...options,
            mapTypeId: mapType,
            styles: undefined,
            backgroundColor: "red",
        };
        if (mapType === "roadmap") mapOptions.styles = mapStyles;
        map.setOptions(mapOptions);
    };

    const fitBounds = (map: google.maps.Map) => {
        if (data?.length) {
            const bounds = new window.google.maps.LatLngBounds();
            data.forEach((el: any) => {
                if (el?.device?.location) {
                    const { lng, lat } = el?.device?.location;
                    const pos = new google.maps.LatLng({ lat, lng });
                    bounds.extend(pos);
                }
            });
            map.fitBounds(bounds);
            map.setCenter(bounds.getCenter());
            const zoom = map.getZoom() || 0;
            if (zoom >= 18) {
                map.setZoom(18);
            }
        } else {
            map.setCenter({
                lat: 41.364115,
                lng: 69.282064,
            });
            map.setZoom(15);
        }
    };

    const onLoad = (map: google.maps.Map): void => {
        fitBounds(map);
        setMapOptions(map);
        mapRef.current = map;
    };

    const unMound = () => {
        mapRef.current = null;
    };

    return { isLoaded, onLoad, unMound, mapRef };
};

export const useTrackingMap = (data: any) => {
    const mapRef = useRef<google.maps.Map | null>(null);

    const { isLoaded } = useJsApiLoader(mapInit);

    const onLoad = (map: google.maps.Map): void => {
        fitBounds(map);
        mapRef.current = map;
    };

    const unMound = () => {
        mapRef.current = null;
    };

    const fitBounds = (map: google.maps.Map) => {
        const bounds = new window.google.maps.LatLngBounds();
        data.forEach((el: any) => {
            bounds.extend({ lng: el.lng, lat: el.lat });
        });
        map.fitBounds(bounds);
    };

    return { isLoaded, onLoad, unMound };
};
