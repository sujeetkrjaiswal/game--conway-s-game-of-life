import '../css/base.css'
import Game from "./game"
import {GameFactory, Oscillators , Stills} from './gameFactory'

const games1: Game[] = GameFactory.getOscillators(Oscillators.Beacon)
const games2: Game[] = GameFactory.getSills(Stills.Beehive)

games1.forEach((game) => {
  game.printState()
  game.getNextState()
  game.printState()
  game.getNextState()
  game.printState()
})
games2.forEach((game) => {
  game.printState()
  game.getNextState()
  game.printState()
})
