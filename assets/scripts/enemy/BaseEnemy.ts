import { BoxCollider2D, Component, Contact2DType, ProgressBar, find, Node, RigidBody2D, Vec2, Animation, Tween, tween, Vec3 } from "cc";
import { isCollidionBullet, isHeroType } from "../Types/NodeTypes";

export class BaseEnemy extends Component {

  public life: number = 100;
  public hero: Node = null!;

  public moveSpeed: number = 2;
  public rigidbody: RigidBody2D = null!;
  public lifeBar: Node = null!;

  start() {

    this.hero = find('Canvas/hero')!;
    this.lifeBar = find('LifeBar', this.node);
    // 出生即向主角移动
    this.schedule(() => {
      this.moveToHero();
    }, 1);

    const collision = this.getComponent(BoxCollider2D);
    this.rigidbody = this.getComponent(RigidBody2D);

    collision.on(Contact2DType.BEGIN_CONTACT, this.beginContact.bind(this), this);
  }

  beginContact(selfCollider, otherCollider) {
    if (isCollidionBullet(otherCollider.tag)) {
      // 被击中了 扣血
      this.reduceLife();
    }

    if (isHeroType(otherCollider.tag)) {
      // 击中玩家
      this.attack();
    }
  }

  reduceLife() {
    this.life -= 10;
    const anim = this.node.getComponent(Animation)
    anim.play('beAccacked');
    this.lifeBar.getComponent(ProgressBar).progress = this.life / 100;

    if (this.life <= 0) {
      this.die();
    }
  }

  // 攻击
  public attack() {
    const selfPox = this.node.getPosition();
    // 攻击后向后退
    tween(this.node)
      .to(0.3, {
        position: new Vec3(selfPox.x + 20, selfPox.y, selfPox.z)
      })
      .to(0.3, {
        position: new Vec3(selfPox.x - 60, selfPox.y, selfPox.z)
      })
      .start();
  }

  // public beAttacked (harm: number) {
  //   this.life =- harm;
  //   console.log('beAccacked');
  //   const anim = this.node.getComponent(Animation)

  //   anim.play('beAccacked');

  //   if (this.life <= 0) {
  //     this.die();
  //   }
  // }

  public moveToHero () {
    // 获取位置
    const heroPos = this.hero.getPosition();
    const selfPox = this.node.getPosition();
    // console.log('heroPos');
    const distancePosX = Math.abs(heroPos.x - selfPox.x);
    const distancePosY = Math.abs(heroPos.y - selfPox.y);

    if (distancePosX < 40) {
      this.attack();
    }

    if (distancePosX > distancePosY) {
      // 水平方向移动
      this.rigidbody.linearVelocity = new Vec2(heroPos.x > selfPox.x ? this.moveSpeed : -this.moveSpeed, 0);
    } else {
      // 垂直方向移动
      this.rigidbody.linearVelocity = new Vec2(0, heroPos.y > selfPox.y ? this.moveSpeed : -this.moveSpeed);
    }
  }

  public die() {
    this.schedule(() => {
      this.node.active = false;
    }, 0.1);
  }
}
