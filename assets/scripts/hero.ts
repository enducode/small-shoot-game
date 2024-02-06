import { _decorator, Component, input, view, Event, Input, KeyCode, Animation, Node, Vec2, RigidBody2D, Prefab, instantiate, BoxCollider2D, Contact2DType, EventMouse, Vec3, v2, Tween, tween, Sprite, Color, color, find, ProgressBar, Director, director } from 'cc';
import { isEnemyType, isHeroType } from './Types/NodeTypes';
const { ccclass, property } = _decorator;

@ccclass('hero')
export class hero extends Component {

    private speed:number = 4;
    private bulletSpeed: number = 0.1;

    private lv:Vec2 = new Vec2(0, 0);
    private rigidbody: RigidBody2D = null!;

    @property({type: Prefab })
    private bullet:Prefab = null!;


    private mousePos: Vec3 = new Vec3(0, 0, 0);

    private totalLife: number = 100;
    private life: number = 100;
    private lifeBar: Node = null!
    private restartNode: Node = null!

    start() {
        // 节点绑定
        this.lifeBar = find('Canvas/playerStatus/life');
        this.restartNode = find('Canvas/restart')
        // 开始跑动
        input.on(Input.EventType.KEY_DOWN, (event) => {
            this.playRunAnimation();
            this.move(event);
        });
        input.on(Input.EventType.KEY_PRESSING, this.move.bind(this));
        // 停止跑动
        input.on(Input.EventType.KEY_UP, this.stop.bind(this)); 
        input.on(Input.EventType.MOUSE_DOWN, this.fire.bind(this));
        
        // 开枪瞄准
        input.on(Input.EventType.MOUSE_MOVE, this.moveGun.bind(this));

        this.rigidbody = this.node.getComponent(RigidBody2D);
        this.node.getComponent(BoxCollider2D).on(Contact2DType.END_CONTACT, this.beAccacked.bind(this));
    }

    beAccacked(selfCollider, otherCollider) {
        if (!isEnemyType(otherCollider.tag)) return;
        const sprite: Sprite = this.node.getComponent(Sprite);
        tween(sprite)
          .to(0.3, {
            color: color('#F06D6D')
          })
          .to(0.3, {
            color: color('#FFFFFF')
          }).start();

        this.life -= 10;
        if (this.life < 0) {
            this.gameOver();
        } else {
            this.lifeBar.getComponent(ProgressBar).progress = this.life / this.totalLife;
        }
    }

    gameOver() {
        director.pause();
        this.restartNode.active = true;
    }

    restart() {
        this.restartNode.active = false;
        setTimeout(() => {
            director.loadScene('Game');
        }, 500);    
    }

    moveGun(event: EventMouse) {
        // const delta = event.getDelta();
        const mousePos = event.getLocation();

        const viewSize = view.getCanvasSize();

        const pos = this.node.getPosition();

        pos.x = mousePos.x - viewSize.width / 2;
        pos.y = mousePos.y - viewSize.height / 2;
        // 求向量值 保存起来 发射子弹
        this.mousePos = pos;
    }

    fire(event) {
        const newBullet = instantiate(this.bullet);

        newBullet.active = true;
        newBullet.setPosition(20, 10);
        this.node.addChild(newBullet);

        const rigidBody2D = newBullet.getComponent(RigidBody2D);
        const collision = newBullet.getComponent(BoxCollider2D);

        collision.on(Contact2DType.BEGIN_CONTACT, (self, other) => {
            // 不能击中玩家自己
            if (isHeroType(other.tag)) return;
            this.schedule(() => {
                newBullet.active = false;
            }, 0.1)
        });

        const velocity: Vec2 = v2();
        velocity.x = this.mousePos.x;
        velocity.y = this.mousePos.y;
        velocity.multiplyScalar(this.bulletSpeed);

        rigidBody2D.linearVelocity = velocity;
        // TODO 子弹现在只能水平发射
        rigidBody2D.linearVelocity = new Vec2(-10, 0);
        // rigidBody2D.angularVelocity = this.bulletSpeed;

        // newBullet.worldPosition = this.node.worldPosition;
    }

    stop() {
        this.node.getComponent(RigidBody2D).linearVelocity = new Vec2(0, 0);
        this.schedule(() => {
            // TODO 状态机 停止动画
            // this.node.getComponent(Animation).pause();
        }, 0.2);
    }

    playRunAnimation() {
        const anim = this.getComponent(Animation);
        anim.play('run');
    }

    move(event) {
        const keydown:KeyCode = event.keyCode;
        const pos = this.node.getPosition();
        const scale = this.node.getScale();
        // 播放打枪动画
        // const gunAnum = find('gun', this.node).getComponent(Animation);
        // gunAnum.play('shoot');

        this.lv = this.rigidbody.linearVelocity;

        switch(keydown) {
            case KeyCode.KEY_W:
                this.lv.x = 0;
                this.lv.y = 1 * this.speed;
                break;
            case KeyCode.KEY_S:
                this.lv.x = 0;
                this.lv.y = -1 * this.speed;
                break;
            case KeyCode.KEY_A:
                scale.x = scale.x < 0 ? scale.x : -scale.x;
                this.lv.x = -1 * this.speed;;
                this.lv.y = 0;
                break;
            case KeyCode.KEY_D:
                scale.x = scale.x > 0 ? scale.x : -scale.x;
                this.lv.x = 1 * this.speed;
                this.lv.y = 0;
                break;
            default:
                break;
        }

        this.node.setScale(scale);
        // anim.stop();
        // this.node.setPosition(pos);
        this.node.getComponent(RigidBody2D).linearVelocity = this.lv;
    }

    update(deltaTime: number) {
        
    }
}

