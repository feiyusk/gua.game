class GuaAnimation {
    constructor(game, animation) {
        // let animationZombie = {
        //     numberOfFrames: 15,
        //     name: 'bhzombie',
        //     pathFormat: 'img/BucketheadZombie/zombie_{}.png',
        // }
        let a = animation
        this.game = game
        // 为了省事，在这里 hard code 一套动画
        this.animations = {
            idle: [],
        }
        var prefix = a.name
        for (var i = 0; i < a.numberOfFrames; i++) {
            // bhzombie00
            var index = '0'.repeat(String(a.numberOfFrames).length - String(i).length) + String(i)
            var name = `${prefix}${index}`
            var t = game.textureByName(name)
            this.animations['idle'].push(t)
        }
        this.animationName = 'idle'
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height
        this.frameIndex = 0
        this.frameCount = a.numberOfFrames
        //
        this.flipX = false
        this.rotation = 0
        this.alpha = 1
    }
    static new(...args) {
        return new this(...args)
    }
    frames() {
        return this.animations[this.animationName]
    }
    updateFrame() {
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 3
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }
    update() {
        this.updateFrame()
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
    changeAnimation(name) {
        this.animationName = name
    }
}
