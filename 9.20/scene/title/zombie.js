class Zombie extends GuaAnimation {
    static new(game) {
        let animation = {
            name: 'bhzombie',
            // zombie/attack
            pathFormat: 'img/zombie/[action]/zombie_[action]_[index].png',
            actions: [
                {
                    name: 'walking',
                    numberOfFrames: 15,
                },
                {
                    name: 'attack',
                    numberOfFrames: 11,
                },
            ]
        }
        return new this(game, animation)
    }
    update() {
        super.update()
        this.x -= 0.3
    }
    setup() {
        this.hp = 5
    }
    被击中(damage) {
        this.hp -= damage
        if (this.hp < 1) {
            this.die()
        }
    }
    die() {
        // 应该先播放动画，再删除
        // 这里我们直接删除
        this.scene.removeZombie(this)
    }
}
