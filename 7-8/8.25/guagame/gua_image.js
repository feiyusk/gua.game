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
    center() {
        let x = this.x + this.w / 2
        let y = this.y + this.h / 2
        return Vector.new(x, y)
    }
    clone() {
        // let c = Object.assign({}, this)
        let c = GuaImage.new(this.game, this.name)
        c.x = this.x
        c.y = this.y
        log('clone', c, typeof c)
        return c
    }
    static new(...args) {
        var i = new this(...args)
        return i
    }
    pointInFrame(x, y) {
        let xIn = x >= this.x && x <= this.x + this.w
        let yIn = y >= this.y && y <= this.y + this.h
        return xIn && yIn
    }
    draw() {
        var context = this.game.context
        context.save()

        var w2 = this.w / 2
        var h2 = this.h / 2
        context.translate(this.x + w2, this.y + h2)
        if (this.flipX) {
            context.scale(-1, 1)
        }
        context.globalAlpha = this.alpha

        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, -h2)

        context.drawImage(this.texture, 0, 0)

        context.restore()
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
