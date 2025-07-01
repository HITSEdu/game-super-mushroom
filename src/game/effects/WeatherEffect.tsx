import {Rain} from "./items/Rain.tsx";
import {Snow} from "./items/Snow.tsx";
import type {SeasonType} from "../../constants/types.ts";

const WeatherEffect = ({season}: { season: SeasonType }) => {
  const tiles = [];

  for (let row = 0; row < 42; row += 8) {
    for (let col = 0; col < 21 + 24; col += 8) {
      tiles.push(
        season === 'autumn' ? (
          <Rain
            key={`${row}-${col}`}
            x={col * 24}
            y={row * 24}
          />
        ) : season === 'winter' ? (
          <Snow
            key={`${row}-${col}`}
            x={col * 24}
            y={row * 24}
          />
        ) : null
      );
    }
  }

  return <>{tiles}</>;
};

export default WeatherEffect;