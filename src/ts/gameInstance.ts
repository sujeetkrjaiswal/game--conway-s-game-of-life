import Game, { grid, gridVal } from './game'
export default class GameInstance {
    private static blockSize = 20
    private player: string
    private game: Game
    private context: CanvasRenderingContext2D | null
    private gameFragmentView: DocumentFragment | null
    public constructor(game: Game, player: string) {
        this.player = player
        this.game = game
        this.gameFragmentView = null
    }
    public getDocFragment(): DocumentFragment {
        this.gameFragmentView = document.createDocumentFragment()
        const container: HTMLDivElement = document.createElement('div')
        const heading: HTMLHeadingElement = document.createElement('h1')
        const canvas: HTMLCanvasElement = document.createElement('canvas')

        this.context = canvas.getContext('2d')
        canvas.width = GameInstance.blockSize * this.game.cols
        canvas.height = GameInstance.blockSize * this.game.rows
        if (this.context !== null) {
            this.context.fillStyle = '#00F'
            this.context.strokeStyle = '#FFF'
        }

        container.className = 'game-instance'
        heading.className = 'game-player'
        heading.textContent = this.player
        container.appendChild(heading)
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
                GameInstance.blockSize * this.game.cols,
                GameInstance.blockSize * this.game.rows,
            )
        }
    }
    private fillRect(
        context: CanvasRenderingContext2D, colVal: gridVal,
        x: number = 0, y: number = 0,
        width: number = 1, height: number = 1) {
        context.fillStyle = colVal === 1 ? '#333' : '#eee'
        context.fillRect(
            GameInstance.blockSize * x,
            GameInstance.blockSize * y,
            GameInstance.blockSize * width,
            GameInstance.blockSize * height,
        )
    }
    private strokeRect(
        context: CanvasRenderingContext2D,
        x: number = 0, y: number = 0,
        width: number = 1, height: number = 1) {
        context.strokeRect(
            GameInstance.blockSize * x,
            GameInstance.blockSize * y,
            GameInstance.blockSize * width,
            GameInstance.blockSize * height,
        )
    }
}
