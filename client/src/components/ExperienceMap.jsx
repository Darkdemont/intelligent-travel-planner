import React, { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Sparkles, MousePointerClick, Compass } from "lucide-react";
import L from "leaflet";

// import your map image as a URL (adjust filename if needed)
import mapImageUrl from "../assets/image.png?url"; // or image.jpeg?url

const IMG_W = 1300; // image pixel width
const IMG_H = 1400; // image pixel height

const CatPill = ({ color, children }) => (
  <span
    className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full"
    style={{ background: `${color}20`, color }}
  >
    ● {children}
  </span>
);
CatPill.propTypes = { color: PropTypes.string, children: PropTypes.node };

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

const ExperienceMap = ({ darkMode }) => {
  // experiences (left/right)
  const EXPERIENCES = useMemo(
    () => [
      { key: "beaches", title: "Popular Beaches", color: "#ec4899", emoji: "🏖️" },
      { key: "culture", title: "History & Culture", color: "#f59e0b", emoji: "🏛️" },
      { key: "wildlife", title: "Wildlife & Nature", color: "#22c55e", emoji: "🐘" },
      { key: "adventure", title: "Adventure", color: "#3b82f6", emoji: "🧗" },
      { key: "lesser", title: "Lesser Travelled", color: "#a78bfa", emoji: "🗺️" },
      { key: "gastronomy", title: "Gastronomy", color: "#ef4444", emoji: "🍛" },
    ],
    []
  );

  // places across the island (xy are IMAGE PIXELS: [y, x])
  const PLACES = useMemo(
    () => [
      { city: "Unawatuna", title: "Unawatuna Beach", xy: [1880, 860], categories: ["beaches"], desc: "Golden bay." },
      { city: "Galle", title: "Galle Fort", xy: [1790, 820], categories: ["culture", "beaches", "lesser"], desc: "UNESCO old town." },
      { city: "Colombo", title: "Galle Face Green", xy: [1700, 760], categories: ["beaches", "gastronomy"], desc: "Sunset snacks." },

      { city: "Sigiriya", title: "Sigiriya Rock", xy: [1280, 900], categories: ["culture", "adventure"], desc: "Fortress rock." },
      { city: "Dambulla", title: "Dambulla Cave Temple", xy: [1360, 960], categories: ["culture"], desc: "Murals & shrines." },
      { city: "Anuradhapura", title: "Ruwanwelisaya", xy: [1020, 690], categories: ["culture"], desc: "Iconic stupa." },

      { city: "Kandy", title: "Temple of the Tooth", xy: [1450, 940], categories: ["culture"], desc: "Sacred relic." },
      { city: "Ella", title: "Nine Arches Bridge", xy: [1680, 980], categories: ["adventure", "lesser"], desc: "Tea-country viaduct." },
      { city: "Ella", title: "Little Adam's Peak", xy: [1700, 960], categories: ["adventure", "wildlife"], desc: "Short ridge hike." },
      { city: "Nuwara Eliya", title: "Tea Estates", xy: [1580, 1010], categories: ["wildlife", "lesser", "gastronomy"], desc: "Tasting & views." },

      { city: "Jaffna", title: "Jaffna Fort", xy: [640, 800], categories: ["culture", "lesser"], desc: "Coastal stronghold." },
      { city: "Trincomalee", title: "Nilaveli Beach", xy: [1300, 1120], categories: ["beaches", "wildlife"], desc: "Soft sand & snorkel." },
      { city: "Polonnaruwa", title: "Gal Viharaya", xy: [1260, 980], categories: ["culture", "lesser"], desc: "Rock-cut Buddhas." },

      { city: "Colombo", title: "Ministry of Crab", xy: [1680, 740], categories: ["gastronomy"], desc: "Famous seafood." },
    ],
    []
  );

  const [activeExp, setActiveExp] = useState("beaches");
  const [helperOn, setHelperOn] = useState(false);

  // leaflet
  const mapRef = useRef(null);
  const layersRef = useRef({});

  useEffect(() => {
    if (mapRef.current) return;

    const bounds = [
      [0, 0],
      [IMG_H, IMG_W],
    ];
    const map = L.map("exp-map", {
      crs: L.CRS.Simple,
      minZoom: -1.5,
      maxZoom: 2,
      attributionControl: false,
      zoomControl: false, // hide +/- buttons
      scrollWheelZoom: false, // no scroll zoom
      doubleClickZoom: false, // no dblclick zoom
      touchZoom: false, // no pinch zoom
      boxZoom: false, // no drag-zoom
      zoomAnimation: false, // no zoom animation
      fadeAnimation: false, // reduce animation
      markerZoomAnimation: false, // no marker zoom animation
    });
    map.fitBounds(bounds);
    map.setMaxBounds(bounds);

    // the image itself – give it a class to style (and keep panes transparent)
    L.imageOverlay(mapImageUrl, bounds, { className: "free-float-map-img" }).addTo(map);

    // placement helper for grabbing coords
    map.on("click", (e) => {
      if (!helperOn) return;
      const y = Math.round(e.latlng.lat);
      const x = Math.round(e.latlng.lng);
      L.circleMarker([y, x], { radius: 3, color: "#fff", weight: 1, fillOpacity: 1 }).addTo(map);
      // eslint-disable-next-line no-console
      console.log(`[helper] Click at [y:${y}, x:${x}] — add to PLACES.categories`);
    });

    mapRef.current = map;
  }, [helperOn]);

  // build category layers once
  const ensureLayers = () => {
    if (!mapRef.current) return;
    if (Object.keys(layersRef.current).length) return;

    const grouped = {};
    PLACES.forEach((p) =>
      p.categories.forEach((c) => {
        grouped[c] ??= [];
        grouped[c].push(p);
      })
    );

    grouped &&
      Object.entries(grouped).forEach(([cat, places]) => {
        const color = (EXPERIENCES.find((e) => e.key === cat) || {}).color || "#22c55e";
        const group = L.layerGroup();
        places.forEach((p) => {
          const m = L.marker([p.xy[0], p.xy[1]], {
            icon: makeDivIcon(p.title, color),
            riseOnHover: true,
          }).bindPopup(
            `<strong>${p.title}</strong> <span class='pin-tag'>· ${p.city}</span>${
              p.desc ? `<br/><span class='pin-desc'>${p.desc}</span>` : ""
            }`
          );
          group.addLayer(m);
        });
        layersRef.current[cat] = group;
      });
  };

  // show markers for a category WITHOUT zooming/recentering
  const showExperience = (key) => {
    if (!mapRef.current) return;
    ensureLayers();
    const map = mapRef.current;
    Object.values(layersRef.current).forEach((layer) => map.removeLayer(layer)); // clear
    const layer = layersRef.current[key];
    if (layer) layer.addTo(map); // add only this category
    setActiveExp(key);
  };

  useEffect(() => {
    const id = setTimeout(() => showExperience(activeExp), 0);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const expByKey = Object.fromEntries(EXPERIENCES.map((e) => [e.key, e]));

  return (
    <section className={`py-20 ${darkMode ? "bg-gray-900" : "bg-white"}`} id="experiences">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* header */}
        <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1.5 rounded-full mb-3">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">Explore by Experience</span>
            </div>
            <h2 className={`text-3xl md:text-4xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              What would you like to experience?
            </h2>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} mt-2`}>
              Pick an experience to see curated places across Sri Lanka. No zooming—just suggestions.
            </p>
          </div>

          <label
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer ${
              darkMode ? "border-gray-800 bg-gray-800 text-gray-200" : "border-gray-200 bg-white text-gray-700"
            }`}
            title="Click the map to copy pixel coordinates for new pins"
          >
            <input type="checkbox" className="accent-emerald-500" checked={helperOn} onChange={(e) => setHelperOn(e.target.checked)} />
            <MousePointerClick className="w-4 h-4" />
            <span className="text-sm">Placement helper</span>
          </label>
        </div>

        {/* layout: lists on sides, free-floating map center */}
        <div className="grid grid-cols-12 gap-6 items-start">
          {/* left experience buttons */}
          <aside className="col-span-12 lg:col-span-3 space-y-4">
            {EXPERIENCES.slice(0, 3).map((e) => (
              <button
                key={e.key}
                onMouseEnter={() => showExperience(e.key)}
                onClick={() => showExperience(e.key)}
                className={`w-full flex items-center gap-4 rounded-2xl p-3 border text-left transition-all
                  ${activeExp === e.key ? "ring-2 ring-emerald-500/70" : ""}
                  ${darkMode ? "bg-gray-800/60 border-gray-800 hover:bg-gray-800" : "bg-white border-gray-200 hover:bg-gray-50"}`}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl" style={{ border: `3px dotted ${e.color}` }}>
                  <span className="text-2xl">{e.emoji}</span>
                </div>
                <div>
                  <div className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{e.title}</div>
                  <div className="mt-1">
                    <CatPill color={e.color}>{e.title.split(" ")[0]}</CatPill>
                  </div>
                </div>
              </button>
            ))}
          </aside>

          {/* center: FREE-FLOATING MAP (no box) */}
          <div className="col-span-12 lg:col-span-6">
            <div className="relative">
              {/* optional soft vignette behind (subtle) */}
              <div
                className="pointer-events-none absolute inset-0 -z-10 opacity-70"
                style={{
                  background:
                    "radial-gradient(80% 60% at 50% 50%, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.04) 60%, rgba(0,0,0,0) 100%)",
                }}
              />
              {/* the map itself */}
              <div className="h-[620px]">
                <div id="exp-map" className="w-full h-full" />
              </div>

              {/* Styles that make the map container fully transparent + unclipped */}
              <style>{`
                /* --- pins --- */
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
                  position: absolute; left: 12px; bottom: -8px;
                  width: 0; height: 0;
                  border-left: 8px solid transparent;
                  border-right: 8px solid transparent;
                  border-top: 10px solid white;
                  filter: drop-shadow(0 2px 2px rgba(0,0,0,.25));
                }
                .pin-title { font-weight: 700; display:block; }
                .pin-tag { color:#6b7280; font-size:11px; }
                .pin-desc { color:#6b7280; }

                /* --- remove the "box" effect around Leaflet --- */
                #exp-map,
                #exp-map .leaflet-container,
                #exp-map .leaflet-pane,
                #exp-map .leaflet-map-pane,
                #exp-map .leaflet-overlay-pane {
                  background: transparent !important;
                  overflow: visible !important; /* allow the image's soft shadow to extend outside */
                }

                /* the overlay image itself: float with soft shadow */
                #exp-map .free-float-map-img {
                  filter:
                    drop-shadow(0 30px 60px rgba(0,0,0,.18))
                    drop-shadow(0 8px 24px rgba(0,0,0,.10));
                  pointer-events: none; /* markers still interact; image doesn't capture clicks */
                }
              `}</style>
            </div>

            {/* legend */}
            <div className="flex items-center gap-2 mt-3">
              <Compass className="w-4 h-4 text-emerald-500" />
              <div className={`${darkMode ? "text-gray-300" : "text-gray-700"} text-sm`}>
                Showing:{" "}
                <CatPill color={EXPERIENCES.find((e) => e.key === activeExp).color}>
                  {EXPERIENCES.find((e) => e.key === activeExp).title}
                </CatPill>
              </div>
            </div>
          </div>

          {/* right experience buttons */}
          <aside className="col-span-12 lg:col-span-3 space-y-4">
            {EXPERIENCES.slice(3).map((e) => (
              <button
                key={e.key}
                onMouseEnter={() => showExperience(e.key)}
                onClick={() => showExperience(e.key)}
                className={`w-full flex items-center gap-4 rounded-2xl p-3 border text-left transition-all
                  ${activeExp === e.key ? "ring-2 ring-emerald-500/70" : ""}
                  ${darkMode ? "bg-gray-800/60 border-gray-800 hover:bg-gray-800" : "bg-white border-gray-200 hover:bg-gray-50"}`}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl" style={{ border: `3px dotted ${e.color}` }}>
                  <span className="text-2xl">{e.emoji}</span>
                </div>
                <div>
                  <div className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{e.title}</div>
                  <div className="mt-1">
                    <CatPill color={e.color}>{e.title.split(" ")[0]}</CatPill>
                  </div>
                </div>
              </button>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
};

ExperienceMap.propTypes = { darkMode: PropTypes.bool };
export default ExperienceMap;
