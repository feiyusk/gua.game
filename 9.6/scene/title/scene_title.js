// log('*************** scene title')
class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        this.setupInputs()
        let zombie = Zombie.new(this.game)
        zombie.x = 200
        zombie.y = 200
        this.addElement(zombie)
        // 调试用
        window.z = zombie
        // 可以在 浏览器控制台中用 z 这个全局变量来调试，切换动画角色：
        // z.changeAnimation('walking')   z.changeAnimation('walking')
    }
    setupInputs() {
    }
}
