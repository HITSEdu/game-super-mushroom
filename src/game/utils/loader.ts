import type {SeasonType} from "../../constants/types.ts";

export async function loadLevel(id: string, season: SeasonType) {
  return await import(`../jsons/levels/${season}/level${id}.json`);
}

export async function loadPlayers(id: number) {
  return await import(`../jsons/players/player${id}.json`);
}