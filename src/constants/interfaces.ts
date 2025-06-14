import type {PointData, Texture} from "pixi.js";
import type { SeasonType } from "./types";

export interface ObjectSize {
    width: number
    height: number
}

export interface IObstacle {
    position: PointData
    size: ObjectSize
    color: string
    type?: string
}

export interface ICharacter {
    id: number,
    season: SeasonType,
    name: string,
    src: string,
    speed: number,
    jumpPower: number,
    size: ObjectSize,
}

export interface ICharacterWithTexture extends ICharacter {
    texture: Texture,
    textureString: string,
}

export interface IIcon {
    className?: string
}

export interface IItem {
    id: number;
    source: string;
    amount: number;
    action: () => void;
    height?: number;
}