import mapStyles from "./mapStyles";

export const options = {
     disableDefaultUI: true,
     zoomControl: true,
     styles: mapStyles,
     fullscreenControl: true,
     mapTypeControl: false,
     rotateControl: false,
     tilt: 0,
     language: "ar"
}

export const mapContainerStyles = {
     height: "600px",
     width: "100%"
}

export const mapInit = {
     id: "google-maps-script",
     googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY!,
     language: "ru"
}