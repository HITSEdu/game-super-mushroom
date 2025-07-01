import {type PointData, type Texture} from "pixi.js";
import type {SeasonType} from "./types";

export interface ObjectSize {
  width: number
  height: number
}

export interface IObject {
  x: number
  y: number
  width: number
  height: number
}

export interface IObstacle {
  position: PointData
  size: ObjectSize
  texture: string
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

export interface ISpirit {
  id: number;
  name: string;
  action: () => void;
  season: SeasonType;
}

export interface IObstacleInteractive {
  id: number;
  type: string;
  action: () => void;
}

export interface IEnemy {
  id: string;
  position: PointData;
  speed: number;
  patrolArea: [number, number];
  directionAxis: 'x' | 'y';
  direction: 'left' | 'right' | 'up' | 'down';
  size: ObjectSize;
  type: string;
  update: () => void;
  kill: () => void;
  pet: () => void;
  state: 'alive' | 'dead';
  onGround: boolean;
  velocityY: number;
  velocityX: number;
  isAngry: boolean;
}

export interface IInteraction {
  id: string;
  visible: boolean;
  x: number;
  y: number;
  title: string;
  key: string;
  action: () => void;
  holdable?: boolean;
  holdDuration?: number;
}

export interface MiniGameConfig {
  id: SeasonType;
  level: string;
  goal: number;
  itemId: number;
  butterflyId: number;
  itemName: string;
  deliverTo?: string;
  description: string;
  action?: () => void;
}

export interface EnemySpawnConfig {
  x: number;
  y: number;
  axis: 'x' | 'y';
  type?: string;
  speed?: number;
  size?: ObjectSize;
  isAngry?: boolean;
}

export interface IReady {
  ready: boolean;
}

export interface ICloud {
  id: string;
  x: number;
  y: number;
  speed: number;
  textureString: string;
}