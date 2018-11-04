class Tower1 extends GuaImage {
    constructor(game, name) {
        name = name || 'gun'
        super(game, name)
        this.setup()
    }
    setup() {
        this.attack = 1
        this.range = 50
        this.target = null
    }
    update() {
        // TODO, 当敌人渐渐远去，你要设置 targ = null
        let target = this.target
        if (this.canAttack(target)) {
            // this.fire(target)
            target.被攻击(this.attack)
            log('攻击敌人', target, target.dead)
            if (target.dead) {
                this.target = null
            }
        }
    }
    canAttack(enemy) {
        let e = enemy
        let enemyExist = e !== null && !e.dead
        if (enemyExist) {
            let can = this.center().distance(e.center()) < this.range
            // log('range', this.center().distance(e.center()), this.range)
            return can
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
