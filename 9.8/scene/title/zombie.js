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
    }
}
