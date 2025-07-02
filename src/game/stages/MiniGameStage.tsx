import {useMiniGameStore} from "../../store/MiniGameStore.ts";
import {getTextureSafe} from "../utils/getTextureSafe.ts";
import MiniGamePlatform from "../entities/decoration/MiniGamePlatform.tsx";
import Item from "../entities/item/Item.tsx";
import WinterFog from "../effects/WinterFog.tsx";

const MiniGameStage = () => {
  const {
    carriedItem,
    currentMiniGame,
    deliveryZones,
    activeDeliveryZoneIndex
  } = useMiniGameStore();

  const miniGameTexture = getTextureSafe(`platform_games_${currentMiniGame}`);
  return (
    <>
      <MiniGamePlatform texture={miniGameTexture} />
      {currentMiniGame === 'autumn' && carriedItem === 8 && deliveryZones.length > 0 && (
        <Item
          x={deliveryZones[activeDeliveryZoneIndex]?.x}
          y={deliveryZones[activeDeliveryZoneIndex]?.y}
          texture={getTextureSafe('box_zone')}
          size={{width: 24, height: 24}}
        />
      )}
      {currentMiniGame === 'winter' && (
        <WinterFog />
      )}
    </>
  );
}

export default MiniGameStage;