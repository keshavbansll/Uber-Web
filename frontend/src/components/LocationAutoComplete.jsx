import React, { useState, useEffect, useRef } from "react";
import "./LocationAutocomplete.css";

// Uses Vite env var: VITE_GEOAPIFY_API_KEY
const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

export default function LocationAutocomplete({
  value,
  onChange,
  onSelect, // (label, coords) => void
  placeholder = "Search location",
  limit = 6,
}) {
  const [query, setQuery] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const debounceRef = useRef();

  useEffect(() => {
    setQuery(value || "");
  }, [value]);

  useEffect(() => {
    function handleDocClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("click", handleDocClick);
    return () => document.removeEventListener("click", handleDocClick);
  }, []);

  useEffect(() => {
    if (!query || query.trim().length < 1) {
      setSuggestions([]);
      return;
    }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
          query
        )}&limit=${limit}&apiKey=${API_KEY}`;
        const res = await fetch(url);
        const json = await res.json();
        const list = (json.features || []).map((f) => {
          const label =
            f.properties?.formatted ||
            f.properties?.name ||
            f.properties?.address_line ||
            f.properties?.display_name ||
            f.properties?.city ||
            "";
          const coords =
            f.properties && f.properties.lat && f.properties.lon
              ? [f.properties.lat, f.properties.lon]
              : f.geometry && f.geometry.coordinates
              ? [f.geometry.coordinates[1], f.geometry.coordinates[0]]
              : null;
          return {
            id: f.properties?.place_id || f.properties?.osm_id || label,
            label,
            coords,
          };
        });
        setSuggestions(list);
        setOpen(true);
      } catch (e) {
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [query, limit]);

  const handleSelect = (item) => {
    setQuery(item.label);
    setOpen(false);
    setSuggestions([]);
    if (onChange) onChange(item.label);
    if (onSelect) onSelect(item.label, item.coords);
  };

  const handleInput = (e) => {
    setQuery(e.target.value);
    if (onChange) onChange(e.target.value);
    setOpen(true);
  };

  return (
    <div ref={ref} className="location-autocomplete">
      <input
        type="text"
        value={query}
        onChange={handleInput}
        placeholder={placeholder}
        className="location-autocomplete-input"
        aria-label={placeholder}
        onFocus={() => setOpen(suggestions.length > 0)}
      />

      {open && suggestions.length > 0 && (
        <ul className="location-autocomplete-list" role="listbox">
          {suggestions.map((s) => (
            <li
              key={s.id || s.label}
              role="option"
              className="location-autocomplete-item"
              onClick={() => handleSelect(s)}
            >
              <div className="autocomplete-label">{s.label}</div>
              {s.coords && (
                <div className="autocomplete-sub">
                  {s.coords[0].toFixed(5)}, {s.coords[1].toFixed(5)}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
