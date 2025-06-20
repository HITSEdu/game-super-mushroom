export async function loadLevel(id: string) {
    return await import(`../jsons/levels/level${id}.json`);
}

export async function loadPlayers(id: number) {
    return await import(`../jsons/players/player${id}.json`);
}