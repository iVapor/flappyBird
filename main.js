// var loadLevel = function(game, n) {
//     n = n - 1
//     var level = levels[n]
//     var blocks = []
//     for (var i = 0; i < level.length; i++) {
//         var p = level[i]
//         var b = Block(game, p)
//         blocks.push(b)
//     }
//     return blocks
// }

var enableDebugMode = function(game, enable) {
    if(!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event){
        var k = event.key
        if (k === 'p') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡功能
            // blocks = loadLevel(game, Number(k))
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}

let __main = function() {
    let images = {
        // 像素鸟
        land: 'img/bird/land.png',
        blueSky: 'img/bird/blueSky.png',
        backGround: 'img/bird/backGround.png',
        bird0: 'img/bird/bird0.png',
        bird1: 'img/bird/bird1.png',
        bird2: 'img/bird/bird2.png',
        bird3: 'img/bird/bird3.png',
        pipe: 'img/bird/pipe.png',
        pipeUp: 'img/bird/pipe_up.png',
        pipeDown: 'img/bird/pipe_down.png',
        newPipe: 'img/bird/newPipe.png',
    }
    var game = GuaGame.instance(20, images, function(g){
        var s = SceneTitle.new(g)
        // var s = Scene.new(g)
        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}

__main()
