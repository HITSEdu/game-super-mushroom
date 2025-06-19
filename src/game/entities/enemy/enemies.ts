import {Point} from "pixi.js";
import {getPlayerPosition} from '../../systems/ControlSystem.ts';
import type {IEnemy, ObjectSize} from "../../../constants/interfaces.ts";
import {handleObstacleCollision} from "../../systems/CollisionSystem.ts";

export const enemies: IEnemy[] = [];

export const createEnemy = (id: string, x: number, y: number, patrolStart: number, patrolEnd: number, speed: number, type: string, size: ObjectSize): IEnemy => {
    const enemy: IEnemy = {
        state: "alive",
        size: size,
        id,
        position: new Point(x, y),
        speed: speed,
        patrolArea: [patrolStart, patrolEnd],
        direction: 'right',
        type: type,
        onGround: true,
        velocityY: 0,
        velocityX: 0,
        update() {
            if (this.state === 'dead') return;

            const player = getPlayerPosition();
            const dx = player.x - this.position.x;
            const dy = player.y - this.position.y;

            const result = handleObstacleCollision(this.position, this.size, this.velocityX, this.velocityY);
            this.position = result.position;
            this.velocityY = result.velocityY;
            this.velocityX = result.velocityX;
            this.onGround = result.onGround;

            if (Math.abs(dx) < 200 && Math.abs(dy) < 150) {
                this.direction = dx > 0 ? 'right' : 'left';
                this.velocityX = this.direction === 'right' ? this.speed : -this.speed;
            } else {
                if (this.direction === 'right') {
                    if (this.position.x < this.patrolArea[1] && !result.stacked) {
                        this.velocityX = this.speed;
                    } else {
                        this.direction = 'left';
                    }
                } else {
                    if (this.position.x > this.patrolArea[0] && !result.stacked) {
                        this.velocityX = -this.speed;
                    } else {
                        this.direction = 'right';
                    }
                }
            }
        }
    };

    enemies.push(enemy);
    return enemy;
}