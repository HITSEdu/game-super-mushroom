import {COLS, ROWS, TILE_SIZE} from "../../constants/values.ts";

export const generateRandomDeliveryZones = (count = 10, margin = 2) => {
  const zones = [];
  for (let i = 0; i < count; i++) {
    const col = Math.floor(Math.random() * (COLS - 2 * margin)) + margin;
    const row = Math.floor(Math.random() * (ROWS - 2 * margin)) + margin;
    zones.push({x: col * TILE_SIZE, y: row * TILE_SIZE});
  }
  return zones;
}