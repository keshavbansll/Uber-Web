import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

// small helper to select location by click
function ClickSelector({ onChange }) {
  useMapEvents({
    click(e) {
      onChange([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

/**
 * Props:
 *  - coords: [lat, lng] or null
 *  - setCoords: function to set coords
 *  - height: css height (default 350px)
 *  - center: initial center (default Delhi)
 */
export default function MapComponent({
  coords,
  setCoords,
  height = "350px",
  center = [28.6139, 77.209],
}) {
  return (
    <div style={{ width: "100%", height }}>
      <MapContainer
        center={coords || center}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {coords && (
          <Marker position={coords}>
            <Popup>Selected</Popup>
          </Marker>
        )}
        <ClickSelector onChange={setCoords} />
      </MapContainer>
    </div>
  );
}
