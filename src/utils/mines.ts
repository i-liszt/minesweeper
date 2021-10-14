// eslint-disable-next-line arrow-body-style
export const createMapFactory = (rows: number, columns: number): GridData[][] => {
  // eslint-disable-next-line arrow-body-style
  return Array.from({ length: rows }, (_el, row: number) => {
    return Array.from({ length: columns }, (_e, column: number) => ({
      index: `${row}_${column}`,
      adjacentMines: undefined,
      isMine: false,
      clicked: false,
      marked: false,
    }))
  })
}

export const placeSingleMine = (map: GridData[][]): void => {
  const row: number = Math.floor(Math.random() * map.length)
  const col: number = Math.floor(Math.random() * map[0].length)

  if (!map[row] || !map[row][col]) {
    return
  }

  if (!map[row][col].isMine) {
    // eslint-disable-next-line no-param-reassign
    map[row][col].isMine = true
  } else {
    placeSingleMine(map)
  }
}

export const placeMines = (map: GridData[][], totalMines: number): void => {
  const total = Math.min(map.length * map[0].length, totalMines)
  for (let count = 0; count < total; count++) {
    placeSingleMine(map)
  }
}

export const getAdjacentMines = (row: number, column: number, map: GridData[][]): number => {
  let count: number = 0
  for (let rowOffset = -1; rowOffset < 2; rowOffset++) {
    for (let columnOffset = -1; columnOffset < 2; columnOffset++) {
      const grid: GridData | undefined = map[row + rowOffset]
        ? map[row + rowOffset][column + columnOffset]
        : undefined

      if (grid?.isMine) {
        count++
      }
    }
  }
  return count
}

export const exploreGrid = (grid: GridData, map: GridData[][]): void => {
  if (grid.clicked || grid.marked) {
    return
  }

  // eslint-disable-next-line no-param-reassign
  grid.clicked = true
  // eslint-disable-next-line no-param-reassign
  grid.marked = false
  if (grid.isMine) {
    // TODO
  } else {
    const [row, column] = grid.index.split('_')
    // eslint-disable-next-line no-param-reassign
    grid.adjacentMines = getAdjacentMines(Number(row), Number(column), map)
    if (!grid.adjacentMines) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      exploreAdjacentGrid(Number(row), Number(column), map)
    }
  }
}

export const exploreAdjacentGrid = (row: number, column: number, map: GridData[][]): void => {
  for (let rowOffset = -1; rowOffset < 2; rowOffset++) {
    for (let columnOffset = -1; columnOffset < 2; columnOffset++) {
      if (rowOffset === 0 && columnOffset === 0) {
        // eslint-disable-next-line no-continue
        continue
      }

      const grid: GridData | undefined = map[row + rowOffset]
        ? map[row + rowOffset][column + columnOffset]
        : undefined

      if (grid && !grid.clicked && !grid.marked) {
        exploreGrid(grid, map)
      }
    }
  }
}
