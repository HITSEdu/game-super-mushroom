import type {IEnemy, ObjectSize} from "../../../constants/interfaces.ts";
import {handleObstacleCollision} from "../../systems/CollisionSystem.ts";
import i18next from "i18next";
import {useToastStore} from "../../../store/ToastStore.ts";

export const enemies: IEnemy[] = [];

const isHollow = (type: string) => {
  const hollowTypes = ["underworld_spirit"];
  for (const it of hollowTypes) {
    if (type.startsWith(it)) return true;
  }

  return false;
}

export const createEnemy = (id: string, x: number, y: number, patrolStart: number, patrolEnd: number, speed: number, type: string, size: ObjectSize, isAngry: boolean, directionAxis: 'x' | 'y' = 'x'): IEnemy => {
  const enemy: IEnemy = {
    state: "alive",
    size: size,
    id,
    position: {x: x, y: y},
    speed: speed,
    patrolArea: [patrolStart, patrolEnd],
    directionAxis,
    direction: directionAxis === 'x' ? 'right' : 'down',
    type: type,
    onGround: true,
    velocityY: 0,
    velocityX: 0,
    isAngry,
    update() {
      if (this.state === 'dead') return;

      const result = handleObstacleCollision(this.position, this.size, this.velocityX, this.velocityY, false, isHollow(this.type));
      this.position = result.position;
      this.velocityY = result.velocityY;
      this.velocityX = result.velocityX;
      this.onGround = result.onGround;

      if (this.directionAxis === 'x') {
        if (this.direction === 'right') {
          if (this.position.x < this.patrolArea[1] && !result.stacked.x) {
            this.velocityX = this.speed;
          } else {
            this.direction = 'left';
          }
        } else {
          if (this.position.x > this.patrolArea[0] && !result.stacked.x) {
            this.velocityX = -this.speed;
          } else {
            this.direction = 'right';
          }
        }
        this.velocityY = 0;
      } else {
        if (this.direction === 'down') {
          if (this.position.y < this.patrolArea[1] && !result.stacked.y) {
            this.velocityY = this.speed;
          } else {
            this.direction = 'up';
            this.position.y -= 1;
          }
        } else {
          if (this.position.y > this.patrolArea[0] && !result.stacked.y) {
            this.velocityY = -this.speed;
          } else {
            this.direction = 'down';
            this.position.y += 1;
          }
        }
        this.velocityX = 0;
      }
    },

    kill() {
      this.state = 'dead';
      this.velocityX = 0;
      this.velocityY = 0;
      useToastStore.getState().show(i18next.t('translations:enemy.killedToast'));
    },

    pet() {
      const name = i18next.t(`translations:enemy.${this.type.split('_')[0]}`);
      useToastStore.getState().show(i18next.t('translations:enemy.petToast', {name}));
    }
  };

  enemies.push(enemy);
  return enemy;
}