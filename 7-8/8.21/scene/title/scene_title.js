log('*************** scene title')
class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        // bg
        var bg = GuaImage.new(this.game, 'bg')
        this.addElement(bg)
        // gun ui
        var gun = GuaImage.new(this.game, 'gun')
        gun.x = 500
        gun.y = 300
        this.gun = gun
        this.addElement(gun)
        //
        this.setupInputs()
    }
    debug() {
    }
    update() {
        super.update()
    }
    setupInputs() {
        let self = this
        // mouse inputs
        let startDrag = false
        this.game.registerMouse(function(event, status){
            let x = event.offsetX
            let y = event.offsetY
            if (status == 'down') {
                let 点到了 = self.gun.pointInFrame(x, y)
                if (点到了) {
                    startDrag = true
                    self.tower = self.gun.clone()
                    self.addElement(self.tower)
                }
            } else if (status == 'move') {
                self.tower.x = x
                self.tower.y = y
            } else {
                startDrag = false
                // self.tower = null
                log('删除 tower', self.tower)
                self.removeElement(self.tower)
            }
            // log('mouse event', status, event)
        })
        // keyboard inputs
        var b = this.mario
        let playerSpeed = 5
    }
}
