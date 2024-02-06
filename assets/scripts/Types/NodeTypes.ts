import { Node } from "cc";


export enum NodeTypes {
  // 子弹类型
  BulletType = 100,
  // 玩家自己
  HeroType = 101,
  // 敌人
  EnemyType = 102
}

export const isCollidionBullet = (tag:  number) => tag === NodeTypes.BulletType;

export const isHeroType = (tag: number) => tag === NodeTypes.HeroType;

export const isEnemyType = (tag: number) => tag === NodeTypes.EnemyType;