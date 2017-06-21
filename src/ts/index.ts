import '../css/base.css'
import GameFactory from './gameFactory'
import GameInstance, { IGameInstanceConfig } from './gameInstance'

class App {
  public timerInterval: number = 300
  private timer: number
  private mountNode: HTMLDivElement
  private gameInstances: GameInstance[]
  public constructor(mountNode: HTMLDivElement) {
    this.mountNode = mountNode
    this.gameInstances = []
  }

  public initialRender() {
    const docFragment: DocumentFragment = document.createDocumentFragment()
    docFragment.appendChild(this.getPatternListDocFragment())
    this.mountNode.appendChild(docFragment)
  }
  private renderGameFrame(forceStopUpdate: boolean = false) {
    this.gameInstances.forEach((gameInstance: GameInstance) => {
      gameInstance.nextRender(forceStopUpdate)
    })
  }
  private renderLoop(forceStopUpdate: boolean = false) {
    clearTimeout(this.timer)
    this.renderGameFrame()
    this.timer = window.setTimeout(() => {
      if (this.gameInstances.length > 0) {
        this.renderLoop(forceStopUpdate)
      }
    }, this.timerInterval)
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
    this.renderLoop(true)
  }
  private getPatternListDocFragment(): DocumentFragment {
    const docFragment: DocumentFragment = document.createDocumentFragment()
    // Pattern btn container
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
    docFragment.appendChild(patternBtnContainer)
    return docFragment
  }

}

const app = new App(
  document.getElementById('mountNode') as HTMLDivElement,
)
app.initialRender()
