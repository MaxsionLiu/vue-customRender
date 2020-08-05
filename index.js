import { initRuntimeCanvas } from './render/index'
import gameContainer from './src/component/GameContainer.js'
import { game  } from './game.js'

const { renderer } = initRuntimeCanvas()

console.log(renderer)
console.log(gameContainer)
console.log(game)
// root component 作为游戏的根容器
const root = renderer.createApp(gameContainer)
root.mount(game.stage)