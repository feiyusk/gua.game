class GuaAnimation {
    constructor(game) {
        this.game = game
        // 为了省事，在这里 hard code 一套动画
        this.animations = {
            idle: [],
            run: [],
        }
        for (var i = 1; i < 5; i++) {
            var name = `idle${i}`
            var t = game.textureByName(name)
            this.animations['idle'].push(t)
        }
        for (var i = 1; i < 11; i++) {
            var name = `run${i}`
            var t = game.textureByName(name)
            this.animations['run'].push(t)
        }
        this.animationName = 'idle'
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height
        this.frameIndex = 0
        this.frameCount = 3
        //
        this.flipX = false
    }
    static new(game) {
        return new this(game)
    }
    frames() {
        return this.animations[this.animationName]
    }
    update() {
        // log('anim update', this.frameCount)
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 3
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }
    draw() {
        var context = this.game.context
        if (this.flipX) {
            context.save()

            var x = this.x + this.w / 2
            context.translate(x, 0)
            context.scale(-1, 1)
            context.translate(-x, 0)
            // log('draw, x, -x', x, -x)
            context.drawImage(this.texture, this.x, this.y)

            context.restore()
        } else {
            context.drawImage(this.texture, this.x, this.y)
        }
    }
    move(x, keyStatus) {
        this.flipX = (x < 0)
        this.x += x
        log('keyStatus', keyStatus, this.flipX)
        var animationNames = {
            down: 'run',
            up: 'idle',
        }
        var name = animationNames[keyStatus]
        this.changeAnimation(name)
    }
    changeAnimation(name) {
        this.animationName = name
    }
}





    // move(x, keyStatus) {
    //     this.x += x
    //     log('keyStatus', keyStatus)
    //     if (keyStatus == 'down') {
    //         this.changeAnimation('run')
    //     } else if (keyStatus == 'up') {
    //         this.changeAnimation('idle')
    //     }
    // }
    // changeAnimation(name) {
    //     this.animationName = name
    // }



// // 只有一个动画的实现
// class GuaAnimation {
//     constructor(game) {
//         this.game = game
//         // 为了省事，在这里 hard code 一套动画
//         this.frames = []
//         for (var i = 1; i < 10; i++) {
//             var name = `w${i}`
//             var t = game.textureByName(name)
//             this.frames.push(t)
//         }
//         this.texture = this.frames[0]
//         this.frameIndex = 0
//         this.frameCount = 3
//     }
//     static new(game) {
//         return new this(game)
//     }
//     update() {
//         this.frameCount--
//         if (this.frameCount == 0) {
//             this.frameCount = 3
//             this.frameIndex = (this.frameIndex + 1) % this.frames.length
//             this.texture = this.frames[this.frameIndex]
//         }
//     }
//     draw() {
//         this.game.drawImage(this)
//     }
//     move(x) {
//         this.x += x
//     }
// }
