import {Texture, Assets} from 'pixi.js';

const textureCache = new Map<string, Texture>();

export const getTextureSafe = (alias: string): Texture => {
  if (textureCache.has(alias)) {
    return textureCache.get(alias)!;
  }

  if (Assets.cache.has(alias)) {
    const texture = Assets.cache.get(alias);
    textureCache.set(alias, texture);
    return texture;
  }

  return Texture.EMPTY;
};

export const clearTextureCache = () => {
  textureCache.clear();
};