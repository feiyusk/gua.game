// log('*************** scene title')
class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        // 先初始化属性
        this.enemies = []
        this.towers = []
        this.setupBG()
        //
        this.setupGameElements()
        this.setupTower()
        //
        this.setupHUD()
        //
        this.setupInputs()
    }
    setupTower() {
        let t1 = Tower1.new(this.game)
        t1.x = 100
        t1.y = 220
        this.addElement(t1)
        //
        this.towers.push(t1)
    }
    setupGameElements() {
        let e1 = Enemy1.new(this.game)
        this.addElement(e1)
        let e2 = Enemy1.new(this.game)
        e2.x -= 30
        this.addElement(e2)
        //
        this.enemies.push(e1)
        this.enemies.push(e2)
    }
    setupBG() {
        var bg = GuaImage.new(this.game, 'bg')
        this.addElement(bg)
    }
    setupHUD() {
        var gun = GuaImage.new(this.game, 'gun')
        gun.x = 500
        gun.y = 300
        this.gun = gun
        this.addElement(gun)
    }
    debug() {
    }
    update() {
        super.update()
        // 给所有没有 target 的 tower 寻找目标
        for (let t of this.towers) {
            if (t.target === null) {
                t.findTarget(this.enemies)
            }
        }
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
