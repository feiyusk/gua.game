var loadLevel = function(game, n) {
    n = n - 1
    var level = levels[n]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

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

var __main = function() {
    var images = {
        bullet: 'img/bullet.png',
        cloud: 'img/cloud.png',
        player: 'img/player.png',
        sky: 'img/sky.png',
        enemy0: 'img/enemy0.png',
        enemy1: 'img/enemy1.png',
        enemy2: 'img/enemy2.png',
        enemy3: 'img/enemy3.png',
        enemy4: 'img/enemy4.png',
        fire: 'fire.png',
        // w1: 'img/walking/w1.png',
        // w2: 'img/walking/w2.png',
        // w3: 'img/walking/w3.png',
        // w4: 'img/walking/w4.png',
        // w5: 'img/walking/w5.png',
        // w6: 'img/walking/w6.png',
        // w7: 'img/walking/w7.png',
        // w8: 'img/walking/w8.png',
        // w9: 'img/walking/w9.png',
        // 多状态动画
        // 闲置
        idle1: 'img/player-idle/player-idle-1.png',
        idle2: 'img/player-idle/player-idle-2.png',
        idle3: 'img/player-idle/player-idle-3.png',
        idle4: 'img/player-idle/player-idle-4.png',
        // 跑动
        run1: 'img/player-run/player-run-1.png',
        run2: 'img/player-run/player-run-2.png',
        run3: 'img/player-run/player-run-3.png',
        run4: 'img/player-run/player-run-4.png',
        run5: 'img/player-run/player-run-5.png',
        run6: 'img/player-run/player-run-6.png',
        run7: 'img/player-run/player-run-7.png',
        run8: 'img/player-run/player-run-8.png',
        run9: 'img/player-run/player-run-9.png',
        run10: 'img/player-run/player-run-10.png',
        //
        cave: 'img/cave.png',
    }
    var game = GuaGame.instance(30, images, function(g){
        // var s = Scene.new(g)
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}

__main()
