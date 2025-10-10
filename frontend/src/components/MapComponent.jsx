import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

function LocationMarker({ setCoords }) {
  useMapEvents({
    click(e) {
      setCoords([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

const MapComponent = ({ coords, setCoords }) => {
  return (
    <MapContainer
      center={coords || [28.6139, 77.209]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {coords && (
        <Marker position={coords}>
          <Popup>Selected location</Popup>
        </Marker>
      )}
      <LocationMarker setCoords={setCoords} />
    </MapContainer>
  );
};

export default MapComponent;
