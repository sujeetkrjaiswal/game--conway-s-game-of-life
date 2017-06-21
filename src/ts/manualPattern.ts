import { grid, gridVal } from './cgol'

class ManualPattern {
  private rows: number
  private cols: number
  private readonly pixelSize: number
  private matrix: grid
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D

  constructor(rows: number, cols: number, pixelSize: number) {
    this.rows = rows
    this.cols = cols
    this.pixelSize = pixelSize
    this.matrix = [
      [0, 0],
      [0, 0],
    ]
  }
  public getDocFragment(): DocumentFragment {
    const docFragment: DocumentFragment = document.createDocumentFragment()
    const container: HTMLDivElement = document.createElement('div')
    container.className = 'manual-entry-container'

    const manualGrid: HTMLDivElement = document.createElement('div')
    manualGrid.appendChild(this.getCanvasGrid())
    manualGrid.appendChild(this.getButtonDocFragment())

    const manualBtn: HTMLButtonElement = document.createElement('button')
    manualBtn.textContent = 'Manual Pattern'
    manualBtn.className = 'pattern-item'
    manualBtn.onclick = () => {
      // tslint:disable-next-line
      console.log('test: todo')
      manualGrid.style.display = manualGrid.style.display === 'none' ? 'block' : 'none'
    }

    container.appendChild(manualBtn)
    container.appendChild(manualGrid)
    docFragment.appendChild(container)
    return docFragment
  }
  // Canvas for receiving grid
  private getCanvasGrid(): DocumentFragment {
    const docFragment: DocumentFragment = document.createDocumentFragment()
    this.canvas = document.createElement('canvas')
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.canvas.addEventListener('click', (event: MouseEvent) => {
      const x: number = event.pageX - this.canvas.offsetLeft
      const y: number = event.pageY - this.canvas.offsetTop
    })
    return docFragment
  }
  private renderCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.matrix.forEach((row: gridVal[], rindex: number) => {
      row.forEach((colVal: gridVal, cindex: number) => {
        if (this.context !== null) {
          this.context.fillRect()
          // this.fillRect(this.context, colVal, cindex, rindex)
          // this.strokeRect(this.context, cindex, rindex)
        }
      })
    })
  }
  // For Row and Colum Management of Pattern Receiver Grid
  private getButtonDocFragment(): DocumentFragment {
    const btnIncRow: HTMLButtonElement = document.createElement('button')
    const btnDecRow: HTMLButtonElement = document.createElement('button')
    const btnIncCol: HTMLButtonElement = document.createElement('button')
    const btnDecCol: HTMLButtonElement = document.createElement('button')

    btnIncRow.textContent = '+1 Row'
    btnDecRow.textContent = '-1 Row'
    btnIncCol.textContent = '+1 Col'
    btnDecCol.textContent = '-1 Col'

    btnIncRow.addEventListener('click', () => { this.incrementRow() })
    btnDecRow.addEventListener('click', () => { this.decrementRow() })
    btnIncCol.addEventListener('click', () => { this.incrementCol() })
    btnDecCol.addEventListener('click', () => { this.decrementCol() })

    const docFragment: DocumentFragment = document.createDocumentFragment()
    docFragment.appendChild(btnIncRow)
    docFragment.appendChild(btnDecRow)
    docFragment.appendChild(btnIncCol)
    docFragment.appendChild(btnDecCol)
    return docFragment
  }

  private incrementRow() {
    this.rows += 1
    this.canvas.height += this.pixelSize
  }
  private decrementRow() {
    this.rows -= 1
    this.canvas.height -= this.pixelSize
  }
  private incrementCol() {
    this.cols += 1
    this.canvas.width += this.pixelSize
  }
  private decrementCol() {
    this.cols -= 1
    this.canvas.width -= this.pixelSize
  }
}
