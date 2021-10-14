import {
  createMapFactory,
  placeSingleMine,
  placeMines,
  exploreGrid,
} from '~/utils/mines'

describe('Utils: MineMap utils', () => {
  const row: number = 8
  const column: number = 6
  let map: GridData[][] = []

  beforeEach(() => {
    map = createMapFactory(row, column)
  })

  test('should create a map with designated rows and columns', () => {
    expect(map.length).toBe(row)
    expect(map[0].length).toBe(column)
  })

  test('should randomly set a mine to a grid', () => {
    let count: number = 0

    placeSingleMine(map)
    for (let r = 0; r < row; r++) {
      for (let c = 0; c < column; c++) {
        if (map[r][c].isMine) {
          count++
        }
      }
    }

    expect(count).toBe(1)
  })

  test('should place designated number of mines to the map', () => {
    const totalMines = 10
    let count: number = 0

    placeMines(map, totalMines)
    for (let r = 0; r < row; r++) {
      for (let c = 0; c < column; c++) {
        if (map[r][c].isMine) {
          count++
        }
      }
    }

    expect(count).toBe(totalMines)
  })

  test('should change the state of a grid to explored: true & flagged: false when explored', () => {
    const grid: GridData = map[1][1]
    exploreGrid(grid, map)
    expect(grid.explored).toBe(true)
    expect(grid.flagged).toBe(false)
  })
})
