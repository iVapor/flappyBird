class GuaAnimation {
    constructor(game){
        this.game = game
        //为了省事，在这里硬编码一套动画
        this.animations = {
            card: [],
            cloth: [],
        }
        for (let i = 1; i < 5; i++) {
            let name = `card${i}`
            let t = game.textureByName(name)
            this.animations['card'].push(t)
        }
        for (let i = 1; i < 7; i++) {
            let name = `cloth${i}`
            let t = game.textureByName(name)
            this.animations['cloth'].push(t)
        }
        this.animationName = 'card'
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height
        this.frameIndex = 0
        this.frameCount = 20

        this.flipX = false
    }
    static new(game) {
        return new this(game)
    }
    frames() {
        return this.animations[this.animationName]
    }
    update() {
        this.frameCount--
        if (this.frameCount === 0) {
            this.frameCount = 3
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }
    draw() {
        let context = this.game.context
        if (this.flipX) {
            context.save();
            let x = this.x + this.w / 2
            context.translate(x, 0);
            context.scale(-1, 1);
            context.translate(-x, 0);
            // Draw the image
            context.drawImage(this.texture, 0, 0);
            context.restore();
        } else {
            context.drawImage(this.texture, this.x, this.y)
        }
    }
    move(x, keyStatus){
        this.flipX = x < 0
        this.x += x
        log('event', keyStatus)
        var animationNames = {
            down: 'cloth',
            up: 'card',
        }
        var name = animationNames[keyStatus]
        this.changeAnimation(name)

    }
    changeAnimation(name) {
        this.animationName = name
    }
}