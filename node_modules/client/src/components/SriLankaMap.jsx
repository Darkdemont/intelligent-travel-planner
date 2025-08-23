import React, { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { MapPin, Compass, MousePointerClick, Sparkles } from "lucide-react";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';

// Use your pretty Sri Lanka image here (replace if needed)
import mapImage from "../assets/image.png"; // or "../assets/sri-lanka-map.jpg"

const SriLankaMap = ({ darkMode }) => {
  // ------- CONFIG -------
  // Enter your image dimensions (pixels) for accurate positioning/zoom.
  // If you replace the map image, update these to match the new image size.
  const IMG_W = 600; // image width in pixels
  const IMG_H = 7400; // image height in pixels

  // Curated cities + highlights. Coordinates are IMAGE PIXELS: [y, x].
  const DATA = useMemo(
    () => ({
      Anuradhapura: {
        color: "#60a5fa",
        pins: [
          { xy: [980, 710], title: "Sri Maha Bodhi", tag: "Sacred fig", desc: "Oldest human-planted tree (historically documented)." },
          { xy: [1020, 690], title: "Ruwanwelisaya", tag: "Stupa" },
          { xy: [1060, 745], title: "Jethawanaramaya", tag: "Monastic city" },
        ],
      },
      Galle: {
        color: "#22c55e",
        pins: [
          { xy: [1790, 820], title: "Galle Fort", tag: "UNESCO", desc: "Ramparts, lighthouse, cobbled lanes." },
          { xy: [1830, 860], title: "Lighthouse", tag: "Viewpoint" },
        ],
      },
      Kandy: {
        color: "#f59e0b",
        pins: [
          { xy: [1450, 940], title: "Temple of the Tooth", tag: "Dalada Maligawa" },
          { xy: [1470, 960], title: "Kandy Lake", tag: "City walk" },
        ],
      },
      Sigiriya: {
        color: "#a78bfa",
        pins: [
          { xy: [1280, 900], title: "Sigiriya Rock", tag: "UNESCO" },
          { xy: [1305, 930], title: "Pidurangala", tag: "Sunrise" },
        ],
      },
      "Nuwara Eliya": {
        color: "#ef4444",
        pins: [
          { xy: [1600, 1040], title: "Gregory Lake", tag: "Boating" },
          { xy: [1580, 1010], title: "Tea Estates", tag: "Scenery" },
        ],
      },
      Ella: {
        color: "#10b981",
        pins: [
          { xy: [1680, 980], title: "Nine Arches", tag: "Bridge" },
          { xy: [1700, 960], title: "Little Adam's Peak", tag: "Hike" },
        ],
      },
      Colombo: {
        color: "#38bdf8",
        pins: [
          { xy: [1700, 760], title: "Galle Face", tag: "Green" },
          { xy: [1680, 740], title: "Lotus Tower", tag: "View" },
        ],
      },
      Jaffna: {
        color: "#fb7185",
        pins: [
          { xy: [700, 820], title: "Nallur Kandaswamy", tag: "Temple" },
          { xy: [640, 800], title: "Jaffna Fort", tag: "History" },
        ],
      },
    }),
    []
  );

  // ------- LEAFLET SETUP -------
  const mapRef = useRef(null);
  const imgLayerRef = useRef(null);
  const cityLayersRef = useRef(new Map());
  const [activeCity, setActiveCity] = useState("Anuradhapura");
  const [helperOn, setHelperOn] = useState(false);

  useEffect(() => {
    if (mapRef.current) return; // init once

    const bounds = [[0, 0], [IMG_H, IMG_W]];
    const map = L.map("sl-map", {
      crs: L.CRS.Simple,
      minZoom: -1.5,
      maxZoom: 2,
      zoomControl: true,
      attributionControl: false,
    });
    map.fitBounds(bounds);
    map.setMaxBounds(bounds);

    const imageLayer = L.imageOverlay(mapImage, bounds).addTo(map);
    imgLayerRef.current = imageLayer;
    mapRef.current = map;

    // Placement helper
    map.on("click", (e) => {
      if (!helperOn) return;
      const y = Math.round(e.latlng.lat);
      const x = Math.round(e.latlng.lng);
      // Show a tiny dot where you clicked
      L.circleMarker([y, x], { radius: 3, color: "#fff", weight: 1, fillOpacity: 1 }).addTo(map);
      // Log coordinates to console for copy/paste
      // eslint-disable-next-line no-console
      console.log(`[helper] Click at pixels [y:${y}, x:${x}] — add under "${activeCity}"`);
    });

    imageLayer.on("load", () => map.invalidateSize());
  }, [IMG_H, IMG_W, helperOn, activeCity, mapImage]);

  // Build a fancy DivIcon
  const makeDivIcon = (label, color) =>
    L.divIcon({
      html: `
      <div class="pin" style="border:1px solid ${color}">
        <span class="pin-title">${label}</span>
      </div>`,
      className: "",
      iconSize: [120, 36],
      iconAnchor: [20, 36],
      popupAnchor: [0, -28],
    });

  // Create LayerGroup for each city
  const ensureCityLayers = () => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    if (cityLayersRef.current.size === 0) {
      Object.entries(DATA).forEach(([city, spec]) => {
        const group = L.layerGroup();
        spec.pins.forEach((p) => {
          const marker = L.marker([p.xy[0], p.xy[1]], {
            icon: makeDivIcon(p.title, spec.color),
            riseOnHover: true,
          }).bindPopup(
            `<strong>${p.title}</strong>${p.tag ? ` <span class='pin-tag'>· ${p.tag}</span>` : ""}${
              p.desc ? `<br/><span class='pin-desc'>${p.desc}</span>` : ""
            }`
          );
          group.addLayer(marker);
        });
        cityLayersRef.current.set(city, group);
      });
    }
  };

  // Show only selected city
  const showOnly = (city) => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    ensureCityLayers();
    // remove all
    cityLayersRef.current.forEach((layer) => map.removeLayer(layer));
    // add chosen
    const layer = cityLayersRef.current.get(city);
    if (layer) {
      layer.addTo(map);
      setActiveCity(city);
      // focus
      const fg = L.featureGroup(layer.getLayers());
      const b = fg.getBounds();
      if (b.isValid()) map.flyToBounds(b.pad(0.3), { duration: 0.6 });
    }
  };

  // Initialize first city once the map is ready
  useEffect(() => {
    const id = setTimeout(() => showOnly(activeCity), 0);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DATA]);

  // ------- UI -------
  const cityKeys = Object.keys(DATA);

  return (
    <section
      className={`py-20 ${darkMode ? "bg-gray-900" : "bg-white"}`}
      id="map"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1.5 rounded-full mb-3">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                Interactive Highlights
              </span>
            </div>
            <h2
              className={`text-3xl md:text-4xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Sri Lanka Travel Map
            </h2>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} mt-2`}>
              Click a city to spotlight its must-see places on the custom map image.
            </p>
          </div>

          {/* Helper toggle */}
          <label
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer ${
              darkMode
                ? "border-gray-800 bg-gray-800 text-gray-200"
                : "border-gray-200 bg-white text-gray-700"
            }`}
            title="Click the map to copy pixel coordinates for new pins"
          >
            <input
              type="checkbox"
              className="accent-emerald-500"
              checked={helperOn}
              onChange={(e) => setHelperOn(e.target.checked)}
            />
            <MousePointerClick className="w-4 h-4" />
            <span className="text-sm">Placement helper</span>
          </label>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* Sidebar */}
          <aside
            className={`lg:col-span-4 p-4 rounded-2xl border ${
              darkMode ? "border-gray-800 bg-gray-800/60" : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <Compass className="w-5 h-5 text-emerald-600" />
              <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                Cities
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {cityKeys.map((city) => (
                <button
                  key={city}
                  onMouseEnter={() => showOnly(city)}
                  onClick={() => showOnly(city)}
                  className={`w-full flex items-center justify-between rounded-xl px-3 py-2 transition-all
                    ${activeCity === city
                      ? "ring-2 ring-emerald-500/70"
                      : ""
                    } ${darkMode
                      ? "bg-gray-900/40 hover:bg-gray-900/60 text-gray-200 border border-gray-800"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200"
                    }`}
                >
                  <span className="font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {city}
                  </span>
                  <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {DATA[city].pins.length} places
                  </span>
                </button>
              ))}
            </div>

            <p className={`text-xs mt-4 ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
              Tip: enable the helper and click anywhere on the map to log pixel coordinates in the console
              for adding new pins.
            </p>
          </aside>

          {/* Map */}
          <div className="lg:col-span-8">
            <div
              className={`relative rounded-2xl overflow-hidden shadow-2xl border ${
                darkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"
              }`}
            >
              {/* Height container */}
              <div className="h-[640px] md:h-[720px]">
                <div id="sl-map" className="w-full h-full" />
              </div>

              {/* tiny in-component CSS for the custom pin */}
              <style>{`
                .pin {
                  position: relative;
                  background: white;
                  color: #0f172a;
                  padding: 6px 10px;
                  border-radius: 10px;
                  font-size: 12px;
                  box-shadow: 0 6px 16px rgba(0,0,0,.35);
                  line-height: 1.1;
                }
                .pin:after {
                  content: "";
                  position: absolute;
                  left: 12px;
                  bottom: -8px;
                  width: 0; height: 0;
                  border-left: 8px solid transparent;
                  border-right: 8px solid transparent;
                  border-top: 10px solid white;
                  filter: drop-shadow(0 2px 2px rgba(0,0,0,.25));
                }
                .pin-title { font-weight: 700; display: block; }
                .pin-tag { color: #6b7280; font-size: 11px; }
                .pin-desc { color: #6b7280; }
                .leaflet-container { background: ${darkMode ? "#0b0f14" : "#eef6f3"}; }
              `}</style>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

SriLankaMap.propTypes = {
  darkMode: PropTypes.bool,
};

export default SriLankaMap;
