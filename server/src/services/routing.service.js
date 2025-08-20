// For now, just return the given order & fake durations.
// Later: implement real graph/A* with distance matrix from Maps API.
export function optimizeRoute(stops) {
  if (!Array.isArray(stops) || stops.length === 0) return { order: [], totalMinutes: 0 };
  const order = stops.map((s, i) => ({ ...s, order: i })); // no-op
  const totalMinutes = (stops.length - 1) * 30;
  return { order, totalMinutes };
}
