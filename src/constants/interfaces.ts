import type {PointData} from "pixi.js";

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