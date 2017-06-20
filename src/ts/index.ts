import '../css/base.css'
import GameFactory,  {PatternType} from './gameFactory'
import GameInstance from './gameInstance'

class App {
  private mountNode: HTMLDivElement
  private btnNode: HTMLButtonElement
  private gameInstances: GameInstance[]
  public constructor(mountNode: HTMLDivElement, btnNode: HTMLButtonElement) {
    this.mountNode = mountNode
    this.btnNode = btnNode
    this.gameInstances = []
    this.btnNode.addEventListener('click', (e) => {
      e.preventDefault()
      this.renderAll()
    })
  }
  public initWithDefault() {
    this.gameInstances.push(...GameFactory.getPattern(PatternType.Pattern1, PatternType.Pattern2))
    const gameFrag: DocumentFragment = document.createDocumentFragment()
    this.gameInstances.forEach((gameInstance) => {
      gameFrag.appendChild(gameInstance.getDocFragment())
    })
    this.mountNode.innerHTML = ''
    this.mountNode.appendChild(gameFrag)
    this.renderAll(true)
  }

  private generateList(){
    const listFragment: DocumentFragment = document.createDocumentFragment()
    const ulElem: HTMLUListElement = document.createElement('ul')

  }

  private renderAll(forceStopUpdate: boolean = false) {
    this.gameInstances.forEach((gameInstance) => {
      gameInstance.nextRender(forceStopUpdate)
    })
  }
}

const app = new App(
  document.getElementById('mountNode') as HTMLDivElement,
  document.getElementById('nextGeneration') as HTMLButtonElement,
)
app.initWithDefault()
