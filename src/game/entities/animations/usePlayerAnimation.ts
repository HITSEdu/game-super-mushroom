import {Texture} from "pixi.js";

interface IUsePlayerAnimationProps {
    texture: Texture
    // animationSpeed: number
    // frameWidth: number,
}

export const usePlayerAnimation = ({texture}: IUsePlayerAnimationProps) => {
    return texture;
}