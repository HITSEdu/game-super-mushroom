import {type PointData} from "pixi.js";
import {
  COLS,
  DEFAULT_ENEMY_MINI_GAME_SIZE,
  ROWS,
  TILE_SIZE
} from "../../constants/values";
import {
  type ItemData, type ObstacleData,
  useLevelStore
} from "../../store/LevelStore.ts";

type Cell = 0 | 1;

interface WallEdge {
  x: number;
  y: number;
  px: number;
  py: number;
}

export function generateMazePrims(cols: number = COLS, rows: number = ROWS): Cell[][] {
  const maze: Cell[][] = Array.from({length: rows}, () => Array(cols).fill(0)) as Cell[][];
  const startX = 1;
  const startY = 1;
  maze[startY][startX] = 1;

  const walls: WallEdge[] = [];
  for (const [dx, dy] of [[-2, 0], [2, 0], [0, -2], [0, 2]] as [number, number][]) {
    const nx = startX + dx;
    const ny = startY + dy;
    if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
      walls.push({x: nx, y: ny, px: startX, py: startY});
    }
  }

  while (walls.length) {
    const idx = Math.floor(Math.random() * walls.length);
    const {x: wx, y: wy, px, py} = walls.splice(idx, 1)[0];
    if (maze[wy][wx] === 0) {
      maze[wy][wx] = 1;
      maze[(wy + py) >> 1][(wx + px) >> 1] = 1;
      for (const [dx, dy] of [[-2, 0], [2, 0], [0, -2], [0, 2]] as [number, number][]) {
        const nx = wx + dx;
        const ny = wy + dy;
        if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && maze[ny][nx] === 0) {
          walls.push({x: nx, y: ny, px: wx, py: wy});
        }
      }
    }
  }

  return maze;
}

export function findFarthestPoint(
  maze: Cell[][],
  start: PointData
): PointData {
  const startCol = Math.floor(start.x / TILE_SIZE);
  const startRow = Math.floor(start.y / TILE_SIZE);

  const visited = Array.from({length: ROWS}, () => Array(COLS).fill(false));
  const queue: Array<[number, number, number]> = [[startCol, startRow, 0]];
  visited[startRow][startCol] = true;

  let farthest: [number, number, number] = [startCol, startRow, 0];

  while (queue.length) {
    const [col, row, dist] = queue.shift()!;
    if (dist > farthest[2]) farthest = [col, row, dist];

    for (const [dCol, dRow] of [[-1, 0], [1, 0], [0, -1], [0, 1]] as [number, number][]) {
      const nc = col + dCol;
      const nr = row + dRow;
      if (
        nc >= 0 && nc < COLS &&
        nr >= 0 && nr < ROWS &&
        !visited[nr][nc] &&
        maze[nr][nc] === 1
      ) {
        visited[nr][nc] = true;
        queue.push([nc, nr, dist + 1]);
      }
    }
  }

  return {
    x: farthest[0] * TILE_SIZE,
    y: farthest[1] * TILE_SIZE
  } as PointData;
}

export function generateSummerMaze(): void {
  const maze = generateMazePrims();
  const start: PointData = useLevelStore.getState().playerStart;
  const finish = findFarthestPoint(maze, start);

  const obstacles: ObstacleData[] = [];

  useLevelStore.getState().removeEnemies();

  const items: ItemData[] = [];

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (row === 20 && col === 1) continue;
      const cell = maze[row][col];
      const x = col * TILE_SIZE;
      const y = row * TILE_SIZE;

      if (cell === 0) {
        obstacles.push({
          x,
          y,
          width: TILE_SIZE,
          height: TILE_SIZE,
          type: 'platform_summer',
          visible: true
        });
      } else {
        const up = row > 0 && maze[row - 1][col] === 1;
        const down = row < ROWS - 1 && maze[row + 1][col] === 1;
        const left = col > 0 && maze[row][col - 1] === 1;
        const right = col < COLS - 1 && maze[row][col + 1] === 1;

        const axis: 'x' | 'y' | null = (left && right && !(up && down)) ? "y" : (up && down && !(left && right)) ? "x" : null;

        if (row < 19 && col > 3 && Math.random() < 0.09 && axis) {
          useLevelStore.getState().spawnEnemies(
            [{
              x: x,
              y: y,
              axis,
              speed: 66,
              type: 'trap2',
              size: DEFAULT_ENEMY_MINI_GAME_SIZE,
              isAngry: true
            }], {x: x, y: y}, 62)
        }
      }
    }
  }

  items.push({
    id: 9,
    x: finish.x,
    y: finish.y,
    type: 'item_summer',
    size: {width: TILE_SIZE, height: TILE_SIZE},
    visible: true
  });

  useLevelStore.setState({
    obstacles: obstacles,
    items: items,
  });
}
