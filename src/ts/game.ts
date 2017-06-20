export type gridVal = 0 | 1
export type grid = gridVal[][]
export default class Game {
  public readonly rows: number
  public readonly cols: number

  private state: grid = []
  public constructor(initialState: grid) {
    this.validateInitialState(initialState)
    this.state = initialState
    this.rows = this.state.length
    this.cols = this.state[0].length
  }
  public getState(): grid {
    return this.state
  }
  public getNextState(): grid {
    this.state = this.state.map((row, rindex) => (
      row.map((colVal, cindex) => (
        this.getCellState(
          colVal,
          this.getLivingNeighbours(rindex, cindex),
        )
      ))
    ))
    return this.state
  }
  private getCellState(cellVal: gridVal, neighbours: number): gridVal {
    switch (neighbours) {
      case 2:
        return cellVal
      case 3:
        return 1
      default:
        return 0
    }
  }
  private getLivingNeighbours(rindex: number, cindex: number): number {
    let count = 0
    const rindices: number[] = []
    const cindices: number[] = []
    // For rows
    if (rindex !== 0) {
      rindices.push(rindex - 1)
    }
    rindices.push(rindex)
    if (rindex !== this.state.length - 1) {
      rindices.push(rindex + 1)
    }
    // For columns
    if (cindex !== 0) {
      cindices.push(cindex - 1)
    }
    cindices.push(cindex)
    if (cindex !== this.state[0].length - 1) {
      cindices.push(cindex + 1)
    }
    // Calculating neighbours
    rindices.forEach((ri) => {
      cindices.forEach((ci) => {
        if (this.state[ri] === undefined) {
          // tslint:disable-next-line
          debugger
        }
        count += this.state[ri][ci]
      })
    })
    count -= this.state[rindex][cindex]
    return count
  }
  private validateInitialState(initialState: grid): boolean {
    if (initialState.length > 0) {
      const firstColSize = initialState[0].length
      return initialState.map((rows) => (rows.length)).every((len) => (len === firstColSize))
    }
    throw new Error("Invalid initial state. Grid can not be of size 0(zero)")
  }
}
