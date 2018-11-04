class GuaImage {
    constructor(game, name) {
        this.game = game
        this.name = name
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
        //
        this.flipY = false
        this.rotation = 0
    }
    clone() {
        // let c = Object.assign({}, this)
        let c = GuaImage.new(this.game, this.name)
        c.x = this.x
        c.y = this.y
        log('clone', c, typeof c)
        return c
    }
    static new(game, name) {
        var i = new this(game, name)
        return i
    }
    pointInFrame(x, y) {
        let xIn = x >= this.x && x <= this.x + this.w
        let yIn = y >= this.y && y <= this.y + this.h
        return xIn && yIn
    }
    draw() {
        this.game.drawImage(this)
    }
    update() {

    }
}

// 逻辑上来看 不应该继承 GuaImage, 但是就暂时这么做吧
// class Player extends GuaImage {
//     constructor(game, name) {
//         super(game, name)
//     }
// }
