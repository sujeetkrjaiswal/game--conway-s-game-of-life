import '../css/base.css'
import GameFactory from './gameFactory'
import GameInstance, { IGameInstanceConfig } from './gameInstance'

class App {
  private mountNode: HTMLDivElement
  private gameInstances: GameInstance[]
  public constructor(mountNode: HTMLDivElement) {
    this.mountNode = mountNode
    this.gameInstances = []
  }
  public hasAnyGameInstance(): boolean {
    return this.gameInstances.length > 0
  }
  public renderGameFrame(forceStopUpdate: boolean = false) {
    this.gameInstances.forEach((gameInstance: GameInstance) => {
      gameInstance.nextRender(forceStopUpdate)
    })
  }
  public initialRender() {
    this.renderList()
  }
  private addInstance(config: IGameInstanceConfig) {
    const gameInstance: GameInstance = new GameInstance(config)
    this.gameInstances.push(gameInstance)
    const instanceContainer: HTMLDivElement = document.createElement('div')
    const removeBtn: HTMLButtonElement = document.createElement('button')

    instanceContainer.className = 'game-instance-container'
    removeBtn.className = 'game-instance-remove'
    removeBtn.textContent = "X"
    removeBtn.onclick = () => {
      // tslint:disable-next-line
      console.log('removing', gameInstance)
      this.gameInstances = this.gameInstances.filter(
        (unitGameInstance) => unitGameInstance.id !== gameInstance.id)
      instanceContainer.remove()
    }
    instanceContainer.appendChild(removeBtn)
    instanceContainer.appendChild(gameInstance.getDocFragment())
    this.mountNode.appendChild(instanceContainer)
    this.renderGameFrame(true)
  }
  private renderList() {
    const btnListFragment: DocumentFragment = document.createDocumentFragment()
    const patternBtnContainer: HTMLDivElement = document.createElement('div')
    patternBtnContainer.className = 'pattern-list'
    GameFactory.getPatternList().forEach((config: IGameInstanceConfig) => {
      const patternBtn: HTMLButtonElement = document.createElement('button')
      patternBtn.className = 'pattern-item'
      patternBtn.textContent = config.name
      patternBtn.onclick = () => {
        this.addInstance(config)
      }
      patternBtnContainer.appendChild(patternBtn)
    })
    const manualBtn: HTMLButtonElement = document.createElement('button')
    manualBtn.textContent = 'Manual Pattern'
    manualBtn.className = 'pattern-item'
    manualBtn.onclick = () => {
      // tslint:disable-next-line
      console.log('test: todo')
    }
    patternBtnContainer.appendChild(manualBtn)
    btnListFragment.appendChild(patternBtnContainer)
    this.mountNode.appendChild(btnListFragment)
  }
}

const app = new App(
  document.getElementById('mountNode') as HTMLDivElement,
)
app.initialRender()

setInterval(() => {
  app.renderGameFrame()
}, 300)

let timer: number
const render = () => {
  clearTimeout(timer)
  timer = window.setTimeout(() => {
    app.renderGameFrame()
    if (app.hasAnyGameInstance()) {
      render()
    }
  }, 200)
}
