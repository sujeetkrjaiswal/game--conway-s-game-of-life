import { grid, gridVal } from './cgol'

export class CanvasView {
  private pixelSize: number
  private context: CanvasRenderingContext2D
  constructor(pixelSize: number, context: CanvasRenderingContext2D) {
    this.pixelSize = pixelSize
    this.context = context
  }
  public render(state: grid) {
    this.clearRect(state.length, state[0].length)
    state.forEach((row: gridVal[], rindex: number) => {
      row.forEach((colVal: gridVal, cindex: number) => {
        if (this.context !== null) {
          this.fillRect(this.context, colVal, cindex, rindex)
          this.strokeRect(this.context, cindex, rindex)
        }
      })
    })
  }
  private clearRect(rows: number, cols: number) {
    if (this.context !== null) {
      this.context.clearRect(
        0, 0,
        this.pixelSize * cols,
        this.pixelSize * rows,
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
