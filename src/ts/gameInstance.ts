import Cgol, { grid, gridVal } from './cgol'

export interface IGameInstanceConfig {
    description: string
    name: string
    initialState: grid
    pixelSize: number
    timeInterval: number
}
export default class GameInstance {
    private static counter: number = 0
    public readonly id: number
    private description: string
    private name: string
    private game: Cgol
    private pixelSize: number
    private context: CanvasRenderingContext2D | null
    private gameFragmentView: DocumentFragment | null
    public constructor(config: IGameInstanceConfig) {
        this.name = config.name
        this.description = config.description
        this.pixelSize = config.pixelSize
        this.game = new Cgol(config.initialState)
        this.gameFragmentView = null
        this.id = ++GameInstance.counter
    }
    public getDocFragment(): DocumentFragment {
        this.gameFragmentView = document.createDocumentFragment()
        const container: HTMLDivElement = document.createElement('div')
        const heading: HTMLHeadingElement = document.createElement('h1')
        const description: HTMLParagraphElement = document.createElement('p')
        const canvas: HTMLCanvasElement = document.createElement('canvas')

        this.context = canvas.getContext('2d')
        canvas.width = this.pixelSize * this.game.cols
        canvas.height = this.pixelSize * this.game.rows
        if (this.context !== null) {
            this.context.fillStyle = '#00F'
            this.context.strokeStyle = '#FFF'
        }

        container.className = 'game-instance'
        heading.className = 'game-player'
        heading.textContent = this.name
        description.textContent = this.description
        container.appendChild(heading)
        container.appendChild(description)
        container.appendChild(canvas)
        this.gameFragmentView.appendChild(container)
        return this.gameFragmentView
    }
    public nextRender(forceStopUpdate: boolean = false) {
        if (this.gameFragmentView === null) {
            throw new Error('please initialize the game view by calling getDocFragment()')
        }
        if (forceStopUpdate) {
            this.render()
        } else {
            this.render(this.game.getNextState())
        }
    }
    private render(state: grid = this.game.getState()) {
        if (this.gameFragmentView === null) {
            throw new Error('please initialize the game view by calling getDocFragment()')
        }
        this.clearRect()
        state.forEach((row: gridVal[], rindex: number) => {
            row.forEach((colVal: gridVal, cindex: number) => {
                if (this.context !== null) {
                    this.fillRect(this.context, colVal, cindex, rindex)
                    this.strokeRect(this.context, cindex, rindex)
                }
            })
        })
    }
    private clearRect() {
        if (this.context !== null) {
            this.context.clearRect(
                0, 0,
                this.pixelSize * this.game.cols,
                this.pixelSize * this.game.rows,
            )
        }
    }
    private fillRect(
        context: CanvasRenderingContext2D, colVal: gridVal,
        x: number = 0, y: number = 0,
        width: number = 1, height: number = 1) {
        context.fillStyle = colVal === 1 ? '#333' : '#eee'
        context.fillRect(
            this.pixelSize * x,
            this.pixelSize * y,
            this.pixelSize * width,
            this.pixelSize * height,
        )
    }
    private strokeRect(
        context: CanvasRenderingContext2D,
        x: number = 0, y: number = 0,
        width: number = 1, height: number = 1) {
        context.strokeRect(
            this.pixelSize * x,
            this.pixelSize * y,
            this.pixelSize * width,
            this.pixelSize * height,
        )
    }
}
