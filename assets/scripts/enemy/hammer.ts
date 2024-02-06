import { _decorator, Component, Node } from 'cc';
import { BaseEnemy } from './BaseEnemy';
const { ccclass, property } = _decorator;

@ccclass('hammer')
export class hammer extends BaseEnemy {

    constructor() {
        super();
    }


    update(deltaTime: number) {
        
    }
}

