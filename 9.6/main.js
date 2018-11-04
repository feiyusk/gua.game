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
    var pathFormat = a.pathFormat
    var keyName = a.name
    for (var action of a.actions) {
        var name = action.name
        var numberOfFrames = action.numberOfFrames
        log('actions', action)
        // pathFormat: 'img/zombie/[action]/zombie_[action]_[index].png',
        var p = pathFormat.replace('[action]', name).replace('[action]', name)
        for (var i = 0; i < numberOfFrames; i++) {
            var index = '0'.repeat(String(numberOfFrames).length - String(i).length) + String(i)
            // var path = `${p}${index}`
            var key = keyName +name + index
            var value = p.replace('[index]', index)
            images[key] = value
        }
    }
}

var __main = function() {
    // zombie
    let animationZombie = {
        name: 'bhzombie',
        // zombie/attack
        pathFormat: 'img/zombie/[action]/zombie_[action]_[index].png',
        actions: [
            {
                name: 'walking',
                numberOfFrames: 15,
            },
            {
                name: 'attack',
                numberOfFrames: 11,
            },
        ]
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
