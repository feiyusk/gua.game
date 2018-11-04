// log('*************** scene title')
class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        this.count = 0
        this.debugPath = []
        // 初始化地图
        this.map = TDMap.new(this.game, 6, 4)
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
    addTower(x, y) {
        let t1 = Tower1.new(this.game)
        let towerSize = t1.w
        let i = Math.floor(x / towerSize)
        let j = Math.floor(y / towerSize)
        // 设置地图属性
        this.map.addTower(i, j)
        x = i * towerSize
        y = j * towerSize
        t1.x = x
        t1.y = y
        this.addElement(t1)
        //
        this.towers.push(t1)
        // debug map grid
        this.map.showGrid()
        // find path for enemies
        this.findPathForEnemies()
    }
    findPathForEnemies() {
        // 为每一个敌人单独寻路 pathfinding
        let s = this.map.tileSize
        for (let e of this.enemies) {
            let x = e.x
            let y = e.y
            let i = Math.floor(x / s)
            let j = Math.floor(y / s)
            let path = this.map.pathfinding(i, j)
            log('path', path, i, j)
            // 设置敌人的 steps 并且重置敌人的 stepIndex
            e.resetPath(path)
            // 用于 debug 的临时性变量
            this.debugPath = path
        }
    }
    setupTower() {
        this.addTower(100, 80)
        this.addTower(100, 200)
    }
    setupGameElements() {
        let offset = [0, 30]
        for (var i = 0; i < 1; i++) {
            let e1 = Enemy1.new(this.game)
            e1.tileSize = this.map.tileSize
            e1.x -= i * 50
            e1.y += offset[i % 2]
            this.addElement(e1)
            this.enemies.push(e1)
        }
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
    draw() {
        super.draw()
        let s = this.map.tileSize
        for (let p of this.debugPath) {
            let context = this.game.context
            context.fillStyle = 'rgba(200, 200, 200, 0.5)'
            let x = p.x * s
            let y = p.y * s
            context.fillRect(x, y, s, s)
        }
    }
    debug() {
    }
    update() {
        super.update()
        this.count++
        if (this.count == 60) {
            this.count = 0
            let e1 = Enemy1.new(this.game)
            e1.tileSize = this.map.tileSize
            this.addElement(e1)
            this.enemies.push(e1)
            // find path for enemies
            this.findPathForEnemies()
        }
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
        let ox = 0
        let oy = 0
        this.game.registerMouse(function(event, status){
            let x = event.offsetX
            let y = event.offsetY
            if (status == 'down') {
                let 点到了 = self.gun.pointInFrame(x, y)
                if (点到了) {
                    startDrag = true
                    self.tower = self.gun.clone()
                    self.addElement(self.tower)
                    // 设置偏移的 x 和 y
                    ox = self.gun.x - x
                    oy = self.gun.y - y
                }
            } else if (status == 'move') {
                self.tower.x = x + ox
                self.tower.y = y + oy
            } else {
                startDrag = false
                // self.tower = null
                log('删除 tower', self.tower)
                self.removeElement(self.tower)
                // 添加一个 tower
                self.addTower(x, y)
            }
            // log('mouse event', status, event)
        })
        // keyboard inputs
        var b = this.mario
        let playerSpeed = 5
    }
}
