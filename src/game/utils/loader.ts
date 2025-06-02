export async function loadLevel(id: number) {
    return await import(`../scenes/levels/level${id}.json`);
}