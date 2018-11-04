class Tower1 extends GuaImage {
    constructor(game, name) {
        name = name || 'gun'
        super(game, name)
        this.setup()
    }
    setup() {
        // this.rotation = 90
        this.attack = 1
        this.range = 100
        this.target = null
        this._cooldown = 8
        this._fireCount = 0
    }
    drawAttackRange() {
        let context = this.game.context
        context.fillStyle = 'rgba(200, 200, 200, 0.5)'
        context.beginPath()
        let v = this.center()
        context.arc(v.x, v.y, this.range, 0, Math.PI * 2)
        context.fill()
    }
    draw() {
        this.drawAttackRange()
        //
        super.draw()
    }
    update() {
        // TODO, 当敌人渐渐远去，你要设置 targ = null
        let target = this.target
        this.updateRotation(target)
        if (this.canAttack(target)) {
            // this.fire(target)
            target.被攻击(this.attack)
            log('攻击敌人', target, target.dead)
            if (target.dead) {
                this.target = null
            }
        }
    }
    updateRotation(target) {
        if (target !== null) {
            let dx = target.x - this.x
            let dy = target.y - this.y
            let r = 向量夹角(dx, dy)
            log('update rotation', r, dx, dy)
            this.rotation = r
        }
    }
    canAttack(enemy) {
        //
        let e = enemy
        let enemyExist = e !== null && !e.dead
        if (enemyExist) {
            let can = this.center().distance(e.center()) < this.range
            // log('range', this.center().distance(e.center()), this.range)
            // 检查是否冷却
            if (this._fireCount != 0) {
                this._fireCount--
                return false
            } else {
                this._fireCount = this._cooldown
                return can
            }
        } else {
            return false
        }
    }
    findTarget(enemies) {
        for (let e of enemies) {
            // do what, 不 do how
            if (this.canAttack(e)) {
                this.target = e
                break
            }
        }
    }
}
