

import { _decorator, BoxCollider2D, Collider2D, Component, Contact2DType, find, Node, PolygonCollider2D } from 'cc';
import { BaseEnemy } from './BaseEnemy';
const { ccclass, property } = _decorator;

@ccclass('dragon')
export class dragon extends BaseEnemy {

    @property({ type: Node })
    private dragonFire:Node = null!;

    private attackTimer = null;

    constructor() {
        super();
    }

    start(): void {
        super.start();
    }

    accackSuccess() {
        console.log('攻击成功');
    }

    public attack(): void {
        // 1.5s 攻击一次
        // this.attackTimer = setInterval(() => {
        //     this.dragonFire.active = true;
        //     this.dragonFire.getComponent(PolygonCollider2D).on(Contact2DType.BEGIN_CONTACT, this.accackSuccess.bind(this));
        //     this.schedule(() => {
        //         this.dragonFire.active = false;
        //     }, 1);
        // }, 1500);
    }

    update(deltaTime: number) {
        
    }
}

