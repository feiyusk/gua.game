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
        this.sleep = true
    }
    awake() {
        this.sleep = false
    }
    fire() {
        // 没有僵尸不发射子弹
        if (this.sleep) {
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
            this.game.scene.addElement(pb)
        }
    }
    update() {
        super.update()
        this.fire()
    }
}
