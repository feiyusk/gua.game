class Enemy1 extends GuaImage {
    constructor(game, name) {
        name = name || 't1'
        super(game, name)
        this.setup()
    }
    setup() {
        this.stepIndex = 0
        this.steps = [
            [0, 170],
            [0, 0],
            [300, 0],
            [300, 170],
            [600, 170],
        ]
        this.dead = false
        this.y = 170
        this.speed = 2
        this.maxHP = 18
        this.hp = this.maxHP
        this.destination = 500
    }
    drawLifeBar() {
        let context = this.game.context
        context.fillStyle = 'red'
        let [x, y, w, h] = [this.x, this.y - 10, this.w, 10]
        // 总血量
        context.fillRect(x, y, w, h)
        // 剩余血量
        context.fillStyle = 'green'
        let w1 = w * (this.hp / this.maxHP)
        context.fillRect(x, y, w1, h)
    }
    draw() {
        super.draw()
        this.drawLifeBar()
    }
    update() {
        if (this.dead) {
            return
        }
        let [dx, dy] = this.steps[this.stepIndex]
        let signX = dx > this.x ? 1 : -1
        let signY = dy > this.y ? 1 : -1
        if (dx == this.x) {
            signX = 0
        }
        if (dy == this.y) {
            signY = 0
        }
        this.x += this.speed * signX
        this.y += this.speed * signY
        if (this.x == dx && this.y == dy) {
            log('敌人已经到达目标点')
            this.stepIndex++
            // 判断敌人是否到达终点
            if (this.stepIndex == this.steps.length) {
                log('敌人到达终点')
                this.die()
            }
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
