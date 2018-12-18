class GuaImage {
    constructor(game, name) {
        this.game = game
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
        this.flipY = false
        this.rotation = 0
    }
    static new(game, name) {
        return new this(game, name)
    }
    draw() {
        this.game.drawImage(this)
    }
    update() {

    }
}

//逻辑上来看，不应该继承 GuaImage,但是暂时就这么做吧。
// class Player extends GuaImage {
//     constructor(game, name) {
//         super(game, name)
//
//     }
// }
