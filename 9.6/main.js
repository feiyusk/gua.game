var enableDebugMode = function(game, enable) {
    if(!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event){
        var k = event.key
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡功能
            // blocks = loadLevel(game, Number(k))
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}

var GuaAddAnimation = (images, animation) => {
    var a = animation
    // TODO, 现在只支持 2 位数的 frames, 应该做成通用的
    for (var i = 0; i < a.numberOfFrames; i++) {
        // 1  01
        // 11  11
        var index = String(i)
        if (i < 10) {
            index = '0' + index
        }
        //
        var key = a.name + index
        var value = a.pathFormat.replace('{}', index)
        images[key] = value
    }
}

var __main = function() {
    // zombie
    let animationZombie = {
        numberOfFrames: 15,
        name: 'bhzombie',
        pathFormat: 'img/BucketheadZombie/zombie_{}.png',
    }
    var images = {
        // zombie
        // bhzombie00: 'img/BucketheadZombie/zombie_00.png',
    }
    GuaAddAnimation(images, animationZombie)

    var game = GuaGame.instance(30, images, function(g){
        // var s = Scene.new(g)
        // log('scene title', typeof SceneTitle)
        var s = SceneTitle.new(g)
        // var s = SceneEditor.new(g)
        g.runWithScene(s)
    })
}

__main()
