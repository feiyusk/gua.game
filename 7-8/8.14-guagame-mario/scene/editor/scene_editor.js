class GuaTileMap {
    constructor(game) {
        this.game = game
        // 8 x 5
        this.tiles = [
            1, 1, 1, 0, 1,
            1, 2, 3, 0, 1,
            1, 2, 3, 0, 1,
        ]
        this.th = 5
        // TODO, tw 应该是一个整数
        this.tw = this.tiles.length / this.th
        this.tileImages = [
            GuaImage.new(game, 't1'),
            GuaImage.new(game, 't2'),
            GuaImage.new(game, 't3'),
            GuaImage.new(game, 't4'),
        ]
        this.tileSize = 32
    }
    static new(...args) {
        return new this(...args)
    }
    update() {

    }
    draw() {
        let h = this.th
        for (var i = 0; i < this.tiles.length; i++) {
            let index = this.tiles[i]
            if (index != 0) {
                let x = Math.floor(i / h) * this.tileSize
                let y = (i % h) * this.tileSize
                let image = this.tileImages[index]
                this.game.context.drawImage(image.texture, x, y)
            }
        }
    }
}

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
        let mario = GuaNesSprite.new(game)
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
