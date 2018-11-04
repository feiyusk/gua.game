// 瓜
class GuaGame {
    constructor(fps, images, runCallback) {
        window.fps = fps
        this.images = images
        this.runCallback = runCallback
        //
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.mouseActions = []
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')
        // events
        var self = this
        window.addEventListener('keydown', event => {
            this.keydowns[event.key] = 'down'
        })
        window.addEventListener('keyup', function(event){
            self.keydowns[event.key] = 'up'
        })
        // mouse events
        let moving = false
        window.addEventListener('mousedown', event => {
            moving = true
            for (let a of this.mouseActions) {
                a(event, 'down')
            }
        })
        window.addEventListener('mousemove', event => {
            if (moving) {
                for (let a of this.mouseActions) {
                    a(event, 'move')
                }
            }
        })
        window.addEventListener('mouseup', event => {
            moving = false
            for (let a of this.mouseActions) {
                a(event, 'up')
            }
        })
        this.init()
    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }
    drawImage(img) {
        // img 是一个 GuaImage
        this.context.drawImage(img.texture, img.x, img.y)
    }
    // update
    update() {
        this.scene.update()
    }
    // draw
    draw() {
        this.scene.draw()
    }
    //
    registerAction(key, callback) {
        this.actions[key] = callback
    }
    // 注册鼠标事件
    registerMouse(callback) {
        this.mouseActions.push(callback)
    }
    runloop() {
        // log(window.fps)
        // events
        var g = this
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            var status = g.keydowns[key]
            if(status == 'down') {
                // 如果按键被按下, 调用注册的 action
                g.actions[key]('down')
            } else if (status == 'up') {
                g.actions[key]('up')
                // 删除掉这个 key 状态
                g.keydowns[key] = null
            }
        }
        // update
        g.update()
        // clear
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
        // draw
        g.draw()
        // next run loop
        setTimeout(function(){
            g.runloop()
        }, 1000/window.fps)
    }
    textureByName(name) {
        var g = this
        // log('image by name', g.images)
        var img = g.images[name]
        // var image = {
        //     w: img.width,
        //     h: img.height,
        //     image: img,
        // }
        return img
    }
    runWithScene(scene) {
        var g = this
        g.scene = scene
        // 开始运行程序
        setTimeout(function(){
            g.runloop()
        }, 1000/window.fps)
    }
    replaceScene(scene) {
        this.scene = scene
    }
    __start(scene) {
        this.runCallback(this)
    }

    init() {
        var g = this
        var loads = []
        // 预先载入所有图片
        var names = Object.keys(g.images)
        for (var i = 0; i < names.length; i++) {
            let name = names[i]
            var path = g.images[name]
            let img = new Image()
            img.src = path
            img.onload = function() {
                // 存入 g.images 中
                g.images[name] = img
                // 所有图片都成功载入之后, 调用 run
                loads.push(1)
                // log('load images', loads.length, names.length)
                if (loads.length == names.length) {
                    // log('load images', g.images)
                    g.__start()
                }
            }
        }
    }
}
