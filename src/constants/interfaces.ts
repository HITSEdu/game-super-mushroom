import type {PointData, Texture} from "pixi.js";

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