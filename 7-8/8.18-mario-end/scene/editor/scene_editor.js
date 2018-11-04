class SceneEditor extends GuaScene {
    constructor(game) {
        super(game)
        // bg
        // var bg = GuaImage.new(game, 'bg')
        // this.addElement(bg)
        // tile map
        let map = GuaTileMap.new(game)
        this.addElement(map)
        // mario
        let mario = GuaNesSprite.new(game, map)
        this.addElement(mario)
        mario.x = 100
        mario.y = 100
        this.mario = mario

        this.setupInputs()
    }
    debug() {
        this.birdSpeed = config.bird_speed.value
    }
    update() {
        super.update()
    }
    setupInputs() {
        var self = this
        var b = this.mario
        let playerSpeed = 2
        self.game.registerAction('a', function(keyStatus) {
            b.move(-playerSpeed, keyStatus)
        })
        self.game.registerAction('d', function(keyStatus) {
            b.move(playerSpeed, keyStatus)
        })
        self.game.registerAction('j', function(keyStatus) {
            b.jump()
        })
    }
}
