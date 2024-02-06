import { _decorator, Component, instantiate, Node, Prefab, find } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {

    @property({ type: Prefab })
    dragon: Prefab = null!;

    @property({ type: Prefab })
    hammer: Prefab = null!;

    // 最大敌人数量
    private maxEnemyCount = 10;
    private nowEnemyCount = 2;

    start() {
        // const canvas = find('Canvas');

        this.createEnemy();
    }

    createEnemy() {
        // 不断创建敌人
        setInterval(() => {
            if (this.nowEnemyCount > this.maxEnemyCount) return;
            const newDragon = instantiate(this.dragon);

            this.node.setPosition(-800, -400);
            this.node.addChild(newDragon);
            this.nowEnemyCount++;
        }, 3000);

        setInterval(() => {
            if (this.nowEnemyCount > this.maxEnemyCount) return;
            const newHammer = instantiate(this.hammer);

            this.node.setPosition(-700, -300);
            this.node.addChild(newHammer);
            this.nowEnemyCount++;
        }, 5000);
    }


}

