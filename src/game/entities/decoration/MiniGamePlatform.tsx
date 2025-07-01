import {type Texture, TilingSprite} from "pixi.js";
import {extend} from "@pixi/react";
import {TILE_SIZE} from "../../../constants/values.ts";

extend({TilingSprite});


const MiniGamePlatform = ({texture}: { texture: Texture }) => {

  return (
    <pixiTilingSprite
      texture={texture}
      width={42 * TILE_SIZE}
      height={24 * TILE_SIZE}
      tileScale={{x: 1, y: 1}}
    />
  );
};

export default MiniGamePlatform;