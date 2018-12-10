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

        let w = GuaAnimation.new(game)
        w.x = 138
        w.y = 279
        this.w = w
        this.addElement(w)
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

    move() {

    }
    setupInputs(){
        let self = this
        self.game.registerAction('a', function (keyStatus) {
            self.w.move(-2, keyStatus)
         })
        self.game.registerAction('d', function (keyStatus) {
            self.w.move(2, keyStatus)
         })
    }

}
