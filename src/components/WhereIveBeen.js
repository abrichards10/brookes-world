import React, { useEffect, useMemo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import worldTopo from "world-atlas/countries-110m.json";
import usTopo from "us-atlas/states-10m.json";
import "./App.css";

/*
  ┌─────────────────────────────────────────────────────────────┐
  │  ADD A PLACE: append to PLACES.                              │
  │  coords are [longitude, latitude].                          │
  │  `maps` lists which map(s) the pin shows on: 'world' / 'us'.│
  │  ADD PHOTOS: push { src: importedImage, caption } onto a    │
  │  place's `photos` array (import the image up top). Empty =  │
  │  placeholder tiles.                                          │
  └─────────────────────────────────────────────────────────────┘
*/
const PLACES = [
  {
    id: "spain",
    name: "Spain",
    coords: [-3.7, 40.4],
    maps: ["world"],
    country: "Spain",
    blurb: "Wandering Madrid, Andalucía, and everything in between.",
    photos: [],
  },
  {
    id: "california",
    name: "California",
    coords: [-119.6, 37.0],
    maps: ["us", "world"],
    country: "United States of America",
    blurb: "Home base — the Bay Area and beyond.",
    photos: [],
  },
  {
    id: "new-york",
    name: "New York",
    coords: [-74.5, 42.8],
    maps: ["us", "world"],
    country: "United States of America",
    blurb: "City trips and East Coast adventures.",
    photos: [],
  },
  {
    id: "oklahoma",
    name: "Oklahoma",
    coords: [-97.5, 35.5],
    maps: ["us"],
    blurb: "Where some of my roots are.",
    photos: [],
  },
  {
    id: "wyoming",
    name: "Wyoming",
    coords: [-107.5, 43.0],
    maps: ["us"],
    blurb: "Big skies and national parks.",
    photos: [],
  },
];

const MAPS = {
  world: {
    geo: worldTopo,
    projection: "geoEqualEarth",
    config: { scale: 150, center: [0, 10] },
  },
  us: {
    geo: usTopo,
    projection: "geoAlbersUsa",
    config: { scale: 1000 },
  },
};

const PlacePin = ({ place, onSelect }) => (
  <Marker
    coordinates={place.coords}
    onClick={() => onSelect(place)}
    className="map-pin"
    tabIndex={0}
    role="button"
    aria-label={`${place.name} — view photos`}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect(place);
      }
    }}
  >
    <circle className="map-pin-halo" r={9} />
    <circle className="map-pin-dot" r={4} />
    <text className="map-pin-label" y={-14} textAnchor="middle">
      {place.name}
    </text>
  </Marker>
);

const WhereIveBeen = () => {
  const [activeMap, setActiveMap] = useState("world");
  const [selected, setSelected] = useState(null);

  const pins = useMemo(
    () => PLACES.filter((p) => p.maps.includes(activeMap)),
    [activeMap]
  );

  // Which geographies (countries on world, states on US) to colour in
  const highlightNames = useMemo(() => {
    if (activeMap === "us") {
      return new Set(
        PLACES.filter((p) => p.maps.includes("us")).map((p) => p.name)
      );
    }
    return new Set(
      PLACES.filter((p) => p.maps.includes("world") && p.country).map(
        (p) => p.country
      )
    );
  }, [activeMap]);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  const map = MAPS[activeMap];

  return (
    <section id="travels" className="section travels-section">
      <div className="section-header">
        <span className="section-eyebrow">Around the World</span>
        <h2 className="section-title">Where I've Been</h2>
        <p className="section-lead">
          A few of the places I've spent time. Click a pin to peek at photos.
        </p>
      </div>

      <div className="map-toggle" role="tablist" aria-label="Choose map">
        <button
          role="tab"
          aria-selected={activeMap === "world"}
          className={`map-toggle-btn ${activeMap === "world" ? "is-active" : ""}`}
          onClick={() => setActiveMap("world")}
        >
          🌍 World
        </button>
        <button
          role="tab"
          aria-selected={activeMap === "us"}
          className={`map-toggle-btn ${activeMap === "us" ? "is-active" : ""}`}
          onClick={() => setActiveMap("us")}
        >
          🇺🇸 United States
        </button>
      </div>

      <div className="map-canvas">
        <ComposableMap
          projection={map.projection}
          projectionConfig={map.config}
          width={800}
          height={450}
          style={{ width: "100%", height: "auto" }}
        >
          <Geographies geography={map.geo}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  className={`rsm-geography ${
                    highlightNames.has(geo.properties.name) ? "is-visited" : ""
                  }`}
                />
              ))
            }
          </Geographies>
          {pins.map((place) => (
            <PlacePin key={place.id} place={place} onSelect={setSelected} />
          ))}
        </ComposableMap>
      </div>

      {selected && (
        <div
          className="place-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.name} photos`}
          onClick={() => setSelected(null)}
        >
          <div className="place-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="place-close"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              ✕
            </button>
            <span className="section-eyebrow">📍 {selected.name}</span>
            <h3 className="place-title">{selected.name}</h3>
            <p className="place-blurb">{selected.blurb}</p>
            <div className="place-gallery">
              {(selected.photos.length ? selected.photos : [0, 1, 2, 3]).map(
                (photo, i) =>
                  photo && photo.src ? (
                    <figure key={i} className="place-photo">
                      <img src={photo.src} alt={photo.caption || selected.name} />
                      {photo.caption && <figcaption>{photo.caption}</figcaption>}
                    </figure>
                  ) : (
                    <div key={i} className="place-photo placeholder">
                      <span aria-hidden="true">📷</span>
                      <small>Photo coming soon</small>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WhereIveBeen;
