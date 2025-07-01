import {getTextureSafe} from "../utils/getTextureSafe.ts";
import {useClouds} from "../../hooks/useClouds.ts";
import MovingSkyElement from "../entities/decoration/MovingSkyElement.tsx";
import SkyOverlay from "../entities/decoration/SkyOverlay.tsx";
import Cloud from "../entities/decoration/Cloud.tsx";

type SkyAndCloudsProps = {
  containerWidth: number;
  containerHeight: number;
  isLoaded: boolean;
};

const SkyAndClouds = ({
                        containerWidth,
                        containerHeight,
                        isLoaded
                      }: SkyAndCloudsProps) => {

  const clouds = useClouds(isLoaded);

  return (
    <>
      <MovingSkyElement
        sunTexture={getTextureSafe('sun')}
        moonTexture={getTextureSafe('moon')}
        containerWidth={containerWidth}
        containerHeight={containerHeight}
      />
      <SkyOverlay
        containerWidth={containerWidth}
        containerHeight={containerHeight}
      />
      {clouds.map((c) => (
        <Cloud
          key={c.id}
          x={c.x}
          y={c.y}
          width={128}
          height={64}
          speed={c.speed}
          boundsWidth={containerWidth * 1.2}
          texture={getTextureSafe(c.textureString)}
        />
      ))}
    </>
  );
};

export default SkyAndClouds;