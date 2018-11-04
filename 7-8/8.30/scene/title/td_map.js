class TDMap {
    constructor(game, w, h) {
        name = name || 'gun'
        this.w = w
        this.h = h
        this.setup()
    }
    static new(...args) {
        return new this(...args)
    }
    addTower(i, j) {
        // 10 表示 tower
        this.grid[j][i] = 10
    }
    setup() {
        let grid = [
            [0, 0, 1, 0,],
            [1, 1, 1, 1,],
            [1, 1, 1, 1,],
            [1, 1, 1, 1,],
            [1, 1, 1, 1,],
            [0, 0, 1, 0,],
        ]
        this.grid = grid
    }
}
