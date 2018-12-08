class SceneTitle extends GuaScene{
    constructor(game) {
        super(game)
        let label = GuaLabel.new(game, 'hello from clement')
        this.addElement(label)

        let cave = GuaImage.new(game, 'sky')
        this.addElement(cave)
        let w = GuaAnimation.new(game)
        w.x = 20
        w.y = 30
        this.w = w
        this.addElement(w)
        this.setupInputs()
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
