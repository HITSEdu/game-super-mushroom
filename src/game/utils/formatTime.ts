export function formatTime(curTime: number): string {
    const minutes = Math.floor(curTime / 1000 / 60);
    const seconds = String(Math.floor(curTime / 1000 % 60)).padStart(2, '0');

    return `${minutes}:${seconds}`;
}