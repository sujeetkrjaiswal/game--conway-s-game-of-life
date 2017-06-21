import '../css/base.css'
import GameFactory from './gameFactory'
import GameInstance, { IGameInstanceConfig } from './gameInstance'

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
    this.generateList()
  }
  public initWithDefault() {
    this.gameInstances = GameFactory.getPatternList().map((config: IGameInstanceConfig) => (new GameInstance(config)))
    const gameFrag: DocumentFragment = document.createDocumentFragment()
    this.gameInstances.forEach((gameInstance) => {
      gameFrag.appendChild(gameInstance.getDocFragment())
    })
    this.mountNode.innerHTML = ''
    this.mountNode.appendChild(gameFrag)
    this.renderAll(true)
  }
  public renderAll(forceStopUpdate: boolean = false) {
    this.gameInstances.forEach((gameInstance) => {
      gameInstance.nextRender(forceStopUpdate)
    })
  }
  public test() {
    // tslint:disable-next-line
    console.log('hello')
  }
  private addToInstance(config: IGameInstanceConfig) {
    const gameInstance: GameInstance = new GameInstance(config)
    this.gameInstances.push(gameInstance)
    this.mountNode.appendChild(gameInstance.getDocFragment())
    this.renderAll(true)
  }
  private generateList() {
    const listFragment: DocumentFragment = document.createDocumentFragment()
    const ulElem: HTMLUListElement = document.createElement('ul')
    GameFactory.getPatternList().forEach((config: IGameInstanceConfig) => {
      const liElem: HTMLLIElement = document.createElement('li')
      liElem.textContent = config.name
      liElem.onclick = () => {
        this.addToInstance(config)
      }
      ulElem.appendChild(liElem)
    })
    listFragment.appendChild(ulElem)
    this.mountNode.appendChild(listFragment)
  }
}

const app = new App(
  document.getElementById('mountNode') as HTMLDivElement,
  document.getElementById('nextGeneration') as HTMLButtonElement,
)
app.test()
