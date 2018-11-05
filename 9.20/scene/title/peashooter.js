class PeaShooter extends GuaAnimation {
    static new(game) {
        let animation = {
            name: 'peashooter',
            pathFormat: 'img/peashooter/[action]/peashooter_[action]_[index].png',
            actions: [
                {
                    name: 'idle',
                    numberOfFrames: 13,
                },
            ]
        }
        let p = new this(game, animation)
        p.setup()
        return p
    }
    setup() {
        // row 表示在草地的第几排
        this.row = -1
        this.cooldown = 50
        this._sleep = true
    }
    awake() {
        this._sleep = false
    }
    sleep() {
        this._sleep = true
    }
    fire() {
        // 没有僵尸不发射子弹
        if (this._sleep) {
            return
        }
        this.cooldown--
        if (this.cooldown == 0) {
            // 开始冷却
            this.cooldown = 50
            // 发射子弹
            let pb = PeaBullet.new(this.game, 'peabullet1')
            let fix = 30
            pb.x = this.x + fix
            pb.y = this.y
            pb.row = this.row
            let s = this.game.scene
            s.addElement(pb)
            s.bullets.push(pb)
        }
    }
    update() {
        super.update()
        this.fire()
    }
}
