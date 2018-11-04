class Zombie extends GuaAnimation {
    static new(game) {
        let animation = {
            numberOfFrames: 15,
            name: 'bhzombie',
            pathFormat: 'img/BucketheadZombie/zombie_{}.png',
        }
        return new this(game, animation)
    }
    setup() {
    }
}
