// log('*************** scene title')
class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        this.zombies = []
        this.plants = []
        this.bullets = []
        this.offsetX = 255
        this.offsetY = 100
        this.zombieOffsetY = 30
        this.widthOfColumn = 80
        this.heightOfRow = 100
        //
        this.bulletHitOffset = config.hit_offset.value
        //
        this.setupBG()
        this.setupInputs()
        this.setupZombies()
        this.setupPlants()
    }
    setupBG() {
        let bg = GuaImage.new(this.game, 'bg1')
        this.addElement(bg)
    }
    setupPlants() {
        for (var j = 0; j < 1; j++) {
            for (var i = 0; i < 5; i++) {
                let p = PeaShooter.new(this.game)
                // 255 和 100 是横纵的 偏移(offset)
                this.addPlant(p, i, j)
            }
        }
    }
    addPlant(plant, row, column) {
        let p = plant
        p.x = this.offsetX + column * this.widthOfColumn
        p.y = this.offsetY + row * this.heightOfRow
        p.row = row
        this.addElement(p)
        this.plants.push(p)
    }
    addZombie(row) {
        // row 表示第几排，场景会自动计算坐标，所以不应该设置 zombie 的 x y
        let zombie = Zombie.new(this.game)
        zombie.x = 600
        zombie.y = this.zombieOffsetY + row * this.heightOfRow
        zombie.row = row
        this.addElement(zombie)
        this.zombies.push(zombie)
    }
    setupZombies() {
        this.addZombie(1)
        this.addZombie(3)
        // 调试用
        // window.z = zombie
        // 可以在 浏览器控制台中用 z 这个全局变量来调试，切换动画角色：
        // z.changeAnimation('walking')   z.changeAnimation('walking')
    }
    setupInputs() {
    }
    debug() {
        this.bulletHitOffset = config.hit_offset.value
        // log('debug')
    }
    update() {
        super.update()
        // 检测开火和碰撞
        this.updateFire()
        this.updateHit()
    }
    updateFire() {
        for (let z of this.zombies) {
            let row = z.row
            for (let p of this.plants) {
                if (p.row == row) {
                    p.awake()
                }
            }
        }

    }
    updateHit() {
        // log('bullets', this.bullets.length)
        for (let z of this.zombies) {
            let row = z.row
            for (let b of this.bullets) {
                // log('row', b.row, row)
                if (b.row == row) {
                    // 判断是否相撞
                    if (z.x - b.x < this.bulletHitOffset) {
                        // TODO, 临时性的修改
                        b.x += 10000
                    }
                }
            }
        }
    }
}
