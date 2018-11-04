class Enemy1 extends GuaImage {
    constructor(game, name) {
        name = name || 't1'
        super(game, name)
        this.setup()
    }
    setup() {
        this.dead = false
        this.y = 200
        this.speed = 1
        this.hp = 8
        this.destination = 500
    }
    update() {
        if (this.dead) {
            return
        }
        this.x += this.speed
        if (this.x > this.destination) {
            log('敌人已经到达')
        }
    }
    被攻击(ap) {
        // ap 就是攻击力
        this.hp -= ap
        if (this.hp <= 0) {
            this.die()
        }
    }
    die() {
        this.dead = true
        // 先应该播放闪动的动画
        // 然后还应该把元素移除出场景中
        this.scene.removeElement(this)
        log('敌人死亡')
    }
}
