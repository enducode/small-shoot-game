import { _decorator, Component, director, Input, Node, NodeEventType } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Start')
export class Start extends Component {

    @property({ type: Node })
    private startBtn: Node = null!;

    start() {
        this.startBtn.on(Input.EventType.TOUCH_END, this.clickStart.bind(this));
    }

    clickStart() {
        console.log('点击');
        director.loadScene('Game');
    }

    update(deltaTime: number) {
        
    }
}

