class Pipes {
    constructor(game) {
        this.game = game
        this.pipes = []
        this.pipeSpace = 150
        // 管子的横向间距
        this.pipeNarrow = 200
        this.columsofPipe = 3
        for (let i = 0; i < this.columsofPipe; i++) {
            let p1 = GuaImage.new(game, 'newPipe')
            p1.flipY = true
            p1.x = 500 + i * this.pipeNarrow
            let p2 = GuaImage.new(game, 'newPipe')
            p2.x = p1.x
            this.resetPipesPosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
            log('THIS.pipes', this.pipes, 'i', i)
        }
    }
    static new(game) {
        return new this(game)
    }
    resetPipesPosition(p1, p2) {
        p1.y = randomBetween(-300, 0)
        p2.y = p1.y + p1.h + this.pipeSpace
    }
    debug() {
        this.pipeNarrow = config.pipe_narrow
        this.pipeSpace = config.pipe_space
    }
    update() {

        for (let i = 0; i < this.pipes.length / 2; i += 2) {
            let p1 = this.pipes[i]
            let p2 = this.pipes[i + 1]
            p1.x -= 5
            p2.x -= 5
            if (p1.x < -100) {
                p1.x += this.pipeNarrow * this.columsofPipe
            }
            if (p2.x < -100) {
                p2.x += this.pipeNarrow * this.columsofPipe
                this.resetPipesPosition(p1, p2)
            }
        }
    }
    draw() {
        let context = this.game.context
        for (let p of this.pipes) {
            context.save();
            let w2 = p.w / 2
            let h2 = p.h / 2
            // let x = this.x + this.w / 2
            context.translate(p.x + w2, p.y + h2);
            let scaleX = p.flipX ? -1 : 1
            let scaleY = p.flipY ? -1 : 1
            context.scale(scaleX, scaleY);
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
        this.birdSpeed = 2
        let b = GuaAnimation.new(game)
        b.x = 120
        b.y = 200
        this.bird = b
        this.addElement(b)
        this.setupInputs()
    }
    debug() {
        this.birdSpeed = config.bird_speed
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
            b.move(-self.birdSpeed, keyStatus)
         })
        self.game.registerAction('d', function (keyStatus) {
            log('self.birdSpeed', self.birdSpeed)
            b.move(self.birdSpeed, keyStatus)
         })
        self.game.registerAction('j', function (keyStatus) {
            b.jump()
         })
    }

}
