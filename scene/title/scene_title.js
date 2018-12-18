class Pipes {
    constructor(game) {
        this.game = game
        this.pipes = []
        this.pipeSpace = 100
        this.pipeNarrow = 100
        this.columsofPipe = 3
        for (let i = 0; i < this.columsofPipe; i++) {
            let p1 = GuaImage.new(game, 'pipeDown')
            // p1.flipY = true
            p1.x = 100 + i * this.pipeNarrow
            let p2 = GuaImage.new(game, 'pipeUp')
            p2.x = p1.x
            this.resetPipesPosition(p1, p2)
            // this.createUpPipe(game, p1.x, p1.y)
            // this.createDownPipe(game, p2.x, p2.y)
            this.pipes.push(p1)
            this.pipes.push(p2)
            log('THIS.pipes', this.pipes, 'i', i)
        }
    }
    //创建向上管子的下半部分
    createUpPipe (game, px, py) {
        log('px', px, 'py', py)
        this.eachPipe = []
        for (let i = py; i >= 0; i--) {
            let g = GuaImage.new(game, 'pipe')
            g.x = px
            g.y = i
            log('createUpPipe g.x', g.x, 'g.y', g.y)
            this.pipes.push(g)
        }
    }
    //创建向下管子的上半部分
    createDownPipe (game, px, py) {
        this.eachPipe = []
        let maxHeight = 388
        for (let i = py + 26; i <= maxHeight; i++) {
            let g = GuaImage.new(game, 'pipe')
            g.x = px
            g.y = py + i
            // log('createDownPipe g.y', g.y)
            this.pipes.push(g)
        }
    }
    static new(game) {
        return new this(game)
    }
    resetPipesPosition(p1, p2) {
        p1.y = randomBetween(0, 200)
        p2.y = p1.y + p1.h + this.pipeSpace
        log('in resetPipesPosition, p1.y', p1.y, 'p2.y', p2.y)
    }
    update() {
        for (let p of this.pipes) {
            p.x -= 5
            if (p.x < -100) {
                p.x += this.pipeNarrow * this.columsofPipe
            }
        }
    }
    draw() {
        let context = this.game.context
        for (let p of this.pipes) {
            context.save();
            let w2 = p / 2
            let h2 = p.h / 2
            // let x = this.x + this.w / 2
            context.translate(p.x + w2, p.y + h2);
            // let scaleX = p.flipX ? -1 : 1
            // let scaleY = p.flipY ? -1 : 1
            // context.scale(scaleX, scaleY);
            context.rotate(p.rotation * Math.PI / 180)
            context.translate(-w2, -h2);
            // Draw the image
            context.drawImage(p.texture, 0, 0);
            context.restore();
        }

    }
}

class SceneTitle extends GuaScene{
    constructor(game) {
        super(game)
        this.game = game

        let sky = GuaImage.new(game, 'blueSky')
        this.addElement(sky)
        // bg
        let bg = GuaImage.new(game, 'backGround')
        bg.y = 279
        this.addElement(bg)
        // 加入水管
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)
        // 地面
        this.grounds = []
        for (let i = 0; i < 15; i++) {
            let g = GuaImage.new(game, 'land')
            g.x = i * 19
            g.y = 388
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 4
        // bird
        let b = GuaAnimation.new(game)
        b.x = 120
        b.y = 200
        this.bird = b
        this.addElement(b)
        this.setupInputs()
    }
    update() {
        super.update();
        // 地面移动
        this.skipCount--
        let offset = -5
        if (this.skipCount === 0) {
            this.skipCount = 4
            offset = 15
        }
        for (let i = 0; i < 15; i++) {
            let g = this.grounds[i]
            g.x += offset
        }
    }

    // move() {
    //
    // }
    setupInputs(){
        let self = this
        let b = this.bird
        self.game.registerAction('a', function (keyStatus) {
            b.move(-2, keyStatus)
         })
        self.game.registerAction('d', function (keyStatus) {
            b.move(2, keyStatus)
         })
        self.game.registerAction('j', function (keyStatus) {
            b.jump()
         })
    }

}
