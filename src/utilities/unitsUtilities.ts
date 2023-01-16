export function tempUnit(unit: 'metric' | 'imperial') {
  return unit === 'metric' ? `°C` : `°F`;
}
