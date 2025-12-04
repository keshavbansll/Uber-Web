import React from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

// small helper to select location by click
function ClickSelector({ onChange, onCenterChange }) {
  const map = useMapEvents({
    click(e) {
      const coords = [e.latlng.lat, e.latlng.lng];
      onChange(coords);
      
      // Automatically center map on clicked location
      if (onCenterChange) {
        map.flyTo(coords, map.getZoom(), {
          animate: true,
          duration: 0.5,
        });
      }
    },
  });
  return null;
}

const createIcon = (variant = "default") => {
  if (variant === "pickup") {
    // simple red teardrop pin
    const svg = encodeURIComponent(
      `<svg width="28" height="40" viewBox="0 0 24 36" xmlns="http://www.w3.org/2000/svg"><path fill="#e74c3c" d="M12 0C7.029 0 3 4.06 3 9.06 3 16.81 12 36 12 36s9-19.19 9-26.94C21 4.06 16.971 0 12 0zm0 13.5A4.5 4.5 0 1 1 12 4.5a4.5 4.5 0 0 1 0 9z"/></svg>`
    );
    return L.divIcon({
      html: `<img src="data:image/svg+xml;utf8,${svg}" style="display:block; width:28px; height:40px;" />`,
      className: "",
      iconSize: [28, 40],
      iconAnchor: [14, 40],
    });
  }

  if (variant === "dropoff") {
    // blue location-ish marker
    const svg = encodeURIComponent(
      `<svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="10" r="6" fill="#1E90FF"/><path d="M12 22s6-5.536 6-12a6 6 0 1 0-12 0c0 6.464 6 12 6 12z" fill="#1E90FF"/></svg>`
    );
    return L.divIcon({
      html: `<img src="data:image/svg+xml;utf8,${svg}" style="display:block; width:32px; height:32px;" />`,
      className: "",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });
  }

  // default simple marker (fall back to Leaflet default look via divIcon)
  return L.divIcon({ className: "", iconSize: [25, 41], iconAnchor: [12, 41] });
};

/**
 * Props:
 *  - coords: [lat, lng] or null
 *  - setCoords: function to set coords
 *  - height: css height (default "100%")
 *  - center: initial center (default Delhi)
 *  - variant: "default" | "pickup" | "dropoff" (used when single coords provided)
 *  - markers: optional array [{ coords: [lat,lng], variant: 'pickup'|'dropoff'|'default', popup?: string }]
 */
export default function MapComponent({
  coords,
  setCoords,
  height = "100%",
  center = [28.6139, 77.209],
  variant = "default",
  markers = null, // array [{ coords: [lat,lng], variant: 'pickup'|'dropoff'|'default', popup }]
}) {
  return (
    <div style={{ width: "100%", height }}>
      <MapContainer
        center={(markers && markers[0]?.coords) || coords || center}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers && markers.length > 0
          ? markers.map((m, i) =>
              m?.coords ? (
                <Marker
                  key={i}
                  position={m.coords}
                  icon={createIcon(m.variant || "default")}
                >
                  <Popup>
                    {m.popup || (m.variant === "pickup" ? "Pickup" : "Dropoff")}
                  </Popup>
                </Marker>
              ) : null
            )
          : coords && (
              <Marker position={coords} icon={createIcon(variant)}>
                <Popup>Selected</Popup>
              </Marker>
            )}
        <ClickSelector onChange={setCoords} onCenterChange />
      </MapContainer>
    </div>
  );
}
