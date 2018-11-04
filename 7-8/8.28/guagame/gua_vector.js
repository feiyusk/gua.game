class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    static new(...args) {
        return new this(...args)
    }
    distance(vector) {
        let v = vector
        let dx = v.x - this.x
        let dy = v.y - this.y
        return Math.sqrt(dx * dx + dy * dy)
    }
    sub(vector) {
        let v = vector
        let dx = this.x - v.x
        let dy = this.y - v.y
        return Vector.new(dx, dy)
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
    normal() {
        let f = this.length() / 1
        // log('normal', f)
        let v = Vector.new(this.x / f, this.y / f)
        return v
    }
}
