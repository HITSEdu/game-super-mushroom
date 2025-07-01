import {Player} from "./Player.tsx";
import {useGameSessionStore} from "../../../store/GameSessionStore.ts";
import {usePlayerStore} from "../../../store/PlayerStore.ts";

const PlayerWrapper = () => {
  const gameState = useGameSessionStore(state => state.status);
  const playerTexture = usePlayerStore(state => state.texture);
  const playerPosition = usePlayerStore(state => state.position);
  const playerSize = usePlayerStore(state => state.size);

  return (
    playerTexture && gameState !== 'lost' &&
    <Player
      x={playerPosition.x}
      y={playerPosition.y}
      texture={playerTexture}
      size={playerSize}
    />
  );
}

export default PlayerWrapper;