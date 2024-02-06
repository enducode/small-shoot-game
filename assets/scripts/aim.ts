import { _decorator, Component, director, EventMouse, game, input, Input, Scene, view, Node, BoxCollider2D, RigidBody2D, ERigidBody2DType } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('aim')
export class aim extends Component {

    private scene:Scene = null!;

    @property({ type: Node })
    private fire:Node = null!;

    start() {
        this.scene = director.getScene();
        // input.on(Input.EventType.MOUSE_MOVE, this.move.bind(this));
        // input.on(Input.EventType.MOUSE_DOWN, this.openFire.bind(this));
        // game.canvas.style.cursor = 'none';
    }

    openFire(event: EventMouse) {
        const mousePos = event.getLocation();
        // const pos = this.node.getPosition();
        // console.log('fire', pos);
        // const viewSize = view.getCanvasSize();
//         pos.x = mousePos.x;
//         pos.y = mousePos.y; 

        // this.fire.setPosition(pos);
        this.fire.active = true;

        this.fire.addComponent(BoxCollider2D).enabled = true;
        const rigidBody2D =  this.fire.addComponent(RigidBody2D);
        rigidBody2D.enabled = true;
        rigidBody2D.type = ERigidBody2DType.Static;

        setTimeout(() => {
          this.fire.active = false;
        }, 300);
    }

    move(event: EventMouse) {
        // const delta = event.getDelta();
        const mousePos = event.getLocation();

        const viewSize = view.getCanvasSize();

        const pos = this.node.getPosition();

        pos.x = mousePos.x - viewSize.width / 2;
        pos.y = mousePos.y - viewSize.height / 2;
        // 求向量值 保存起来

        this.node.setPosition(pos);
    }

    update(deltaTime: number) {
        
    }
}

