import React, { useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const libraries = ["places"];

function MapTunisie () {
  const [center, setCenter] = useState({ lat: 34.8322219, lng: 9.7840123 });
  const [zoom, setZoom] = useState(7);

  const handlePlaceSelect = (place) => {
    setCenter(place.geometry.location);
    setZoom(15);
  };

  return (
    <LoadScript
      libraries={libraries}
      googleMapsApiKey="AIzaSyDD1mF4a_HWYTdpYNKGagFgnJ2CBdNbDJg"
    >
      <GoogleMap
        mapContainerStyle={{ height: "400px", width: "100%" }}
        center={center}
        zoom={zoom}
        options={{ language: "fr" }}
      />
    </LoadScript>
  );
};

export default MapTunisie;
