class PeaBullet extends GuaImage {
    constructor(game, name) {
        super(game, name)
        // 子弹的伤害
        this.damage = 1
        // 子弹的速度
        this.speed = 3
    }
    static new(...args) {
        return new this(...args)
    }
    update() {
        this.x += this.speed
    }
}
