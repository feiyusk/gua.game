class GuaAnimation {
    constructor(game) {
        this.game = game
        // 为了省事，在这里 hard code 一套动画
        this.animations = {
            idle: [],
        }
        for (var i = 1; i < 4; i++) {
            var name = `b${i}`
            var t = game.textureByName(name)
            this.animations['idle'].push(t)
        }
        this.animationName = 'idle'
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height
        this.frameIndex = 0
        this.frameCount = 3
        //
        this.flipX = false
        this.rotation = 0
        this.alpha = 1
        // 重力和加速度
        this.gy = 10
        this.vy = 0
    }
    static new(game) {
        return new this(game)
    }
    frames() {
        return this.animations[this.animationName]
    }
    jump() {
        this.vy = -10
        this.rotation = -90
    }
    update() {
        // 更新 alpha
        if (this.alpha > 0) {
            this.alpha -= 0.05
        }
        // 更新受力
        this.y += this.vy
        this.vy += this.gy * 0.2
        var h = 510
        if (this.y > h) {
            this.y = h
        }
        // 更新角度
        if (this.rotation < 45) {
            this.rotation += 45
        }
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
    move(x, keyStatus) {
        this.flipX = (x < 0)
        this.x += x
        // log('keyStatus', keyStatus, this.flipX)
        // var animationNames = {
        //     down: 'run',
        //     up: 'idle',
        // }
        // var name = animationNames[keyStatus]
        // this.changeAnimation(name)
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
