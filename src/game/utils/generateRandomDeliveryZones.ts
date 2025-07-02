import {COLS, ROWS, TILE_SIZE} from "../../constants/values.ts";
import {useLevelStore} from "../../store/LevelStore.ts";

interface Zone {
  x: number;
  y: number;
}

export const generateRandomDeliveryZones = (count = 10): Zone[] => {
  const usedPositions = new Set<string>();
  const zones: Zone[] = [];

  const marginCols = Math.ceil(COLS * 0.05);
  const marginRows = Math.ceil(ROWS * 0.05);

  const minCol = marginCols;
  const maxCol = COLS - marginCols - 1;
  const minRow = marginRows;
  const maxRow = ROWS - marginRows - 1;

  const {obstacles, items, decorations} = useLevelStore.getState();

  const isOverlapping = (x: number, y: number): boolean => {
    const checkOverlap = (objects: {
      x: number,
      y: number,
      width: number,
      height: number
    }[]) => {
      return objects.some(obj => {
        return (
          x < obj.x + obj.width &&
          x + TILE_SIZE > obj.x &&
          y < obj.y + obj.height &&
          y + TILE_SIZE > obj.y
        );
      });
    };

    return (
      checkOverlap(obstacles) ||
      checkOverlap(items.map(item => ({
        ...item,
        width: item.size.width,
        height: item.size.height
      }))) ||
      checkOverlap(decorations)
    );
  };

  let attempts = 0;
  const maxAttempts = count * 20;

  while (zones.length < count && attempts < maxAttempts) {
    const col = Math.floor(Math.random() * (maxCol - minCol + 1)) + minCol;
    const row = Math.floor(Math.random() * (maxRow - minRow + 1)) + minRow;

    const x = col * TILE_SIZE;
    const y = row * TILE_SIZE;

    const key = `${x},${y}`;
    if (usedPositions.has(key)) {
      attempts++;
      continue;
    }

    if (isOverlapping(x, y)) {
      attempts++;
      continue;
    }

    usedPositions.add(key);
    zones.push({x, y});
  }

  return zones;
};