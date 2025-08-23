import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Route, Star, Camera, Mountain, Waves, TreePine, Building, Eye } from "lucide-react";

/**
 * Coordinates are normalized percentages (0–100) for the container.
 * The SVG viewBox is 400x600, so x% => x*4, y% => y*6 for the path.
 */
const InteractiveMap = ({ darkMode, selectedDestinations = [], onDestinationToggle }) => {
  const [showRoute, setShowRoute] = useState(false);
  const [optimizedRoute, setOptimizedRoute] = useState([]);

  // Re-positioned so they sit inside the island outline
  const destinations = useMemo(
    () => [
      { id: "colombo", name: "Colombo", type: "city", x: 46, y: 78, icon: Building, color: "bg-blue-500",
        hiddenGems: ["Gangaramaya Temple", "Red Mosque", "Dutch Hospital"] },
      { id: "kandy", name: "Kandy", type: "cultural", x: 56, y: 58, icon: Building, color: "bg-purple-500",
        hiddenGems: ["Udawattakele Forest", "Bahirawakanda Temple", "Kandy Lake"] },
      { id: "sigiriya", name: "Sigiriya", type: "heritage", x: 58, y: 45, icon: Mountain, color: "bg-orange-500",
        hiddenGems: ["Pidurangala Rock", "Sigiriya Museum", "Cobra Hood Cave"] },
      { id: "galle", name: "Galle", type: "coastal", x: 47, y: 88, icon: Waves, color: "bg-cyan-500",
        hiddenGems: ["Japanese Peace Pagoda", "Snake Island", "Jungle Beach"] },
      { id: "ella", name: "Ella", type: "nature", x: 61, y: 70, icon: Mountain, color: "bg-green-500",
        hiddenGems: ["Little Adams Peak", "Ravana Falls", "Demodara Loop"] },
      { id: "nuwara-eliya", name: "Nuwara Eliya", type: "hill-country", x: 59, y: 63, icon: TreePine, color: "bg-emerald-500",
        hiddenGems: ["Seetha Amman Temple", "Lovers Leap Falls", "Moon Plains"] },
      { id: "kurunegala", name: "Kurunegala", type: "city", x: 52, y: 52, icon: Building, color: "bg-indigo-500",
        hiddenGems: ["Elephant Rock", "Athugala Rock", "Kurunegala Lake"] },
      { id: "kadawatha", name: "Kadawatha", type: "suburb", x: 47, y: 73, icon: Building, color: "bg-gray-500",
        hiddenGems: ["Kelaniya Temple", "Muthurajawela Wetlands", "Bellanwila Temple"] },
    ],
    []
  );

  // Hidden gems positioned near their parent spots
  const hiddenGems = useMemo(
    () => [
      // Colombo
      { id: "gangaramaya", name: "Gangaramaya Temple", parentDestination: "colombo", x: 46.8, y: 77.2, type: "temple" },
      { id: "red-mosque", name: "Red Mosque", parentDestination: "colombo", x: 45.4, y: 79.0, type: "heritage" },
      { id: "dutch-hospital", name: "Dutch Hospital", parentDestination: "colombo", x: 46.0, y: 80.2, type: "heritage" },
      // Kandy
      { id: "udawattakele", name: "Udawattakele Forest", parentDestination: "kandy", x: 56.6, y: 57.2, type: "nature" },
      { id: "bahirawakanda", name: "Bahirawakanda Temple", parentDestination: "kandy", x: 55.3, y: 59.3, type: "temple" },
      // Kurunegala
      { id: "elephant-rock", name: "Elephant Rock", parentDestination: "kurunegala", x: 52.8, y: 50.9, type: "nature" },
      { id: "athugala-rock", name: "Athugala Rock", parentDestination: "kurunegala", x: 51.2, y: 53.0, type: "nature" },
      // Kadawatha
      { id: "kelaniya-temple", name: "Kelaniya Temple", parentDestination: "kadawatha", x: 47.8, y: 72.2, type: "temple" },
      { id: "muthurajawela", name: "Muthurajawela Wetlands", parentDestination: "kadawatha", x: 46.2, y: 74.2, type: "nature" },
    ],
    []
  );

  // Nearest-neighbor route (simple heuristic)
  const optimizeRoute = (selected) => {
    if (!selected || selected.length <= 1) return selected || [];
    const start = selected.includes("colombo") ? "colombo" : selected[0];
    const ordered = [start];
    const remaining = selected.filter((s) => s !== start);

    const getPoint = (id) => destinations.find((d) => d.id === id);

    while (remaining.length) {
      const current = getPoint(ordered[ordered.length - 1]);
      let nearest = remaining[0];
      let best = Infinity;
      remaining.forEach((id) => {
        const d = getPoint(id);
        const dx = d.x - current.x;
        const dy = d.y - current.y;
        const dist = Math.hypot(dx, dy);
        if (dist < best) {
          best = dist;
          nearest = id;
        }
      });
      ordered.push(nearest);
      remaining.splice(remaining.indexOf(nearest), 1);
    }
    return ordered;
  };

  useEffect(() => {
    if (selectedDestinations.length > 1) {
      const route = optimizeRoute(selectedDestinations);
      setOptimizedRoute(route);
      setShowRoute(true);
    } else {
      setOptimizedRoute([]);
      setShowRoute(false);
    }
  }, [selectedDestinations]);

  // Build SVG path from normalized percentages
  const getRoutePathData = () => {
    if (optimizedRoute.length < 2) return "";
    const viewW = 400;
    const viewH = 600;
    const points = optimizedRoute
      .map((id) => destinations.find((d) => d.id === id))
      .filter(Boolean)
      .map((d) => `${(d.x / 100) * viewW},${(d.y / 100) * viewH}`);
    return `M ${points.join(" L ")}`;
  };

  return (
    <div className={`p-6 rounded-2xl ${darkMode ? "bg-gray-900 border border-gray-700" : "bg-white border border-gray-100"} shadow-lg`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Interactive Sri Lanka Map</h3>
        {selectedDestinations.length > 1 && (
          <div className="flex items-center space-x-2 text-sm">
            <Route className="w-4 h-4 text-emerald-600" />
            <span className={darkMode ? "text-emerald-400" : "text-emerald-600"}>
              Optimized Route: {optimizedRoute.join(" → ")}
            </span>
          </div>
        )}
      </div>

      <div className="relative w-full h-96 rounded-xl overflow-hidden bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-gray-700 dark:to-gray-600">
        {/* Map outline + route */}
        <svg viewBox="0 0 400 600" className="w-full h-full absolute inset-0 pointer-events-none">
          <path
            d="M200 50 C250 60, 300 100, 320 150 C340 200, 350 250, 340 300 C330 350, 310 400, 280 450 C250 500, 200 550, 150 520 C100 490, 80 440, 70 390 C60 340, 70 290, 90 240 C110 190, 140 140, 170 100 C180 80, 190 60, 200 50 Z"
            className="fill-emerald-200 dark:fill-gray-500 opacity-30"
            stroke="currentColor"
            strokeWidth="2"
          />
          {showRoute && optimizedRoute.length > 1 && (
            <path d={getRoutePathData()} stroke="#059669" strokeWidth="3" fill="none" strokeDasharray="5,5" className="animate-pulse" />
          )}
        </svg>

        {/* Pins & gems */}
        {destinations.map((d) => {
          const isSelected = selectedDestinations.includes(d.id);
          const routeIndex = optimizedRoute.indexOf(d.id);
          const Icon = d.icon;
          return (
            <div key={d.id}>
              <button
                type="button"
                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
                style={{ left: `${d.x}%`, top: `${d.y}%` }}
                onClick={() => onDestinationToggle(d.id)}
                aria-label={d.name}
              >
                <div
                  className={`w-12 h-12 ${isSelected ? d.color : "bg-gray-400"} rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                    isSelected ? "scale-125 ring-4 ring-emerald-300 animate-pulse" : "hover:scale-110"
                  }`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {isSelected && routeIndex >= 0 && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {routeIndex + 1}
                  </div>
                )}

                <div
                  className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                  } shadow-lg whitespace-nowrap z-20`}
                >
                  <div className="font-semibold">{d.name}</div>
                  <div className="text-xs opacity-75">Click to {isSelected ? "remove" : "add"}</div>
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
                      darkMode ? "border-t-gray-800" : "border-t-white"
                    }`}
                  />
                </div>
              </button>

              {isSelected &&
                hiddenGems
                  .filter((g) => g.parentDestination === d.id)
                  .map((g) => (
                    <div
                      key={g.id}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
                      style={{ left: `${g.x}%`, top: `${g.y}%` }}
                    >
                      <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center shadow-md hover:scale-125 transition-all duration-300">
                        <Star className="w-3 h-3 text-white" />
                      </div>
                      <div
                        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                          darkMode ? "bg-yellow-800 text-yellow-100" : "bg-yellow-100 text-yellow-800"
                        } shadow-lg whitespace-nowrap z-20`}
                      >
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{g.name}</span>
                        </div>
                        <div
                          className={`absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent ${
                            darkMode ? "border-t-yellow-800" : "border-t-yellow-100"
                          }`}
                        />
                      </div>
                    </div>
                  ))}
            </div>
          );
        })}
      </div>

      {/* Selected summary */}
      {selectedDestinations.length > 0 && (
        <div className="mt-4">
          <h4 className={`text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            Selected Destinations ({selectedDestinations.length}):
          </h4>
          <div className="flex flex-wrap gap-2">
            {(optimizedRoute.length > 0 ? optimizedRoute : selectedDestinations).map((id) => {
              const d = destinations.find((x) => x.id === id);
              if (!d) return null;
              return (
                <span
                  key={id}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    darkMode ? "bg-emerald-900/30 text-emerald-300" : "bg-emerald-100 text-emerald-700"
                  } flex items-center space-x-1`}
                >
                  {optimizedRoute.length > 0 && <span className="text-emerald-600 font-bold">{optimizedRoute.indexOf(id) + 1}.</span>}
                  <span>{d.name}</span>
                </span>
              );
            })}
          </div>
          {selectedDestinations.length > 1 && (
            <div className={`mt-2 text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              💡 Route optimized using a nearest-neighbor heuristic for minimal travel time
            </div>
          )}
        </div>
      )}
    </div>
  );
};

InteractiveMap.propTypes = {
  darkMode: PropTypes.bool,
  selectedDestinations: PropTypes.arrayOf(PropTypes.string),
  onDestinationToggle: PropTypes.func.isRequired,
};

export default InteractiveMap;
