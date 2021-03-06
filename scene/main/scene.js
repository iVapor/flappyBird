
class Bullet extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }
    setup() {
        // this.speed = 2
        this.speed = config.bullet_speed
    }
    update() {

        this.y -= this.speed

    }
}

class Player extends GuaImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }
    setup() {
        this.speed = 5
        this.cooldown = 0
    }
    update() {
        this.speed = config.player_speed
        if(this.cooldown > 0) {
            this.cooldown--
        }
    }

    fire() {
        if (this.cooldown === 0) {
            this.cooldown = config.fire_cooldown
            //子弹的宽和高分别为 18 和 66
            var x = this.x + this.w / 2 - 9
            var y = this.y - 66
            var b= Bullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)
        }

    }
    moveLeft(){
        this.x -= this.speed
    }
    moveRight(){
        this.x += this.speed
    }
    moveUp(){
        this.y -= this.speed
    }
    moveDown(){
        this.y += this.speed
    }
}

class Enemy extends GuaImage {
    constructor(game) {
        var type = randomBetween(0, 4)
        var name = 'enemy' + type
        super(game, name)
        this.setup()
    }
    setup() {
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(0, 200)
        this.y = -randomBetween(0, 100)
    }

    update() {
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }
    }
}

class Cloud extends GuaImage {
    constructor(game) {
        var type = randomBetween(0, 1)
        var name = 'cloud' + type
        super(game, name)
        this.setup()
    }
    setup() {
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(0, 320)
        this.y = -randomBetween(0, 480)
    }

    update() {

        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }
    }
    debug() {
        this.speed = config.cloud_speed
    }
}

class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()

    }
    setup(){
        var game = this.game
        this.numberOfEnemis = 10
        this.bg = GuaImage.new(game,'sky')
        this.cloud = Cloud.new(game,'cloud')

        // this.player = GuaImage.new(game,'player')
        // this.player.x = 120
        // this.player.y = 400

        this.player = Player.new(game)
        this.player.x = 120
        this.player.y = 400

        this.addElement(this.bg)
        this.addElement(this.cloud)
        this.addElement(this.player)

        this.addEnemies()
        //add particles
        this.ps = GuaParticleSystem.new(this.game)
        this.psIndex = this.addElement(this.ps)

    }
    addEnemies () {
        var es = []
        for (let i = 0; i < this.numberOfEnemis; i++) {
            var e = Enemy.new(this.game)
            es.push(e)

            this.addElement(e)
        }

        this.enemis = es
    }
    setupInputs() {
        var g = this.game
        var s = this

        g.registerAction('a', function(){
            s.player.moveLeft()
        })
        g.registerAction('d', function(){
            s.player.moveRight()
        })
        g.registerAction('w', function(){
            s.player.moveUp()
        })
        g.registerAction('s', function(){
            s.player.moveDown()
        })

        g.registerAction('j', function(){
            s.player.fire()
        })
    }

    update() {
        super.update()
        this.cloud.y += 1
        this.removeElement(this.ps, this.psIndex)
    }
}

