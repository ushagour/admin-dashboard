import React, { useEffect, useState, useRef } from "react";

/*
  LocationBadge
  - Props: lat, lon, listingId (optional), placeholder (optional)
  - Fetches a human-readable place name (city/town/village/state) via OpenStreetMap Nominatim
  - Caches results in-memory to avoid repeated requests
  - Shows a small location icon + text
*/
const cache = new Map();

export default function LocationBadge({ lat, lon, listingId, placeholder = "—", className = "" }) {
  const [label, setLabel] = useState(null);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef();

  useEffect(() => {
    if (!lat || !lon) {
      setLabel(null);
      return;
    }

    const cacheKey = listingId ?? `${lat}:${lon}`;
    if (cache.has(cacheKey)) {
      setLabel(cache.get(cacheKey));
      return;
    }

    let mounted = true;
    setLoading(true);
    abortRef.current = new AbortController();

    const fetchLocation = async () => {
      try {
        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(
          lat
        )}&lon=${encodeURIComponent(lon)}&zoom=10&addressdetails=1`;
        const res = await fetch(url, { signal: abortRef.current.signal, headers: { "User-Agent": "JibobiAdmin/1.0" } });
        if (!res.ok) throw new Error("Geocode failed");
        const json = await res.json();
        const addr = json.address || {};
        const name = addr.city || addr.town || addr.village || addr.county || addr.state || null;
        const final = name || `${lat.toFixed(3)}, ${lon.toFixed(3)}`;
        if (!mounted) return;
        cache.set(cacheKey, final);
        setLabel(final);
      } catch (e) {
        if (e.name !== "AbortError") {
          console.error("LocationBadge error:", e);
          if (mounted) setLabel(`${lat.toFixed(3)}, ${lon.toFixed(3)}`);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchLocation();

    return () => {
      mounted = false;
      if (abortRef.current) abortRef.current.abort();
    };
  }, [lat, lon, listingId]);

  if (!lat || !lon) {
    return <span className={className}>{placeholder}</span>;
  }

  return (
    <span className={`d-inline-flex align-items-center ${className}`}>
      {/* using bootstrap icons if available, fallback to emoji */}
      <i className="fa fa-map-marker-alt me-1 text-muted" aria-hidden></i>
      {loading ? <b className="text-muted">Loading...</b> : <b>{label}</b>}
    </span>
  );
}