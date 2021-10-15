import { isLose, isWin } from '~/utils/game'

describe('Utils: Game utils', () => {
  test('should lose the game when clicking a mine grid', () => {
    const mineGrid: GridData = {
      index: '0_0',
      isMine: true,
      explored: true,
      flagged: false,
    }
    expect(isLose(mineGrid)).toBe(true)
  })

  test('should win the game when mine grids are all flagged and remainFlags is 0', () => {
    const mineGrids: GridData[] = Array.from({ length: 8 }, (_, index: number) => ({
      index: `0_${index}`,
      isMine: true,
      explored: false,
      flagged: true,
    }))
    expect(isWin(mineGrids, 0)).toBe(true)
  })

  test('should not win the game when mine grids are all flagged and remainFlags is not 0', () => {
    const mineGrids: GridData[] = Array.from({ length: 8 }, (_, index: number) => ({
      index: `0_${index}`,
      isMine: true,
      explored: false,
      flagged: true,
    }))
    expect(isWin(mineGrids, -2)).toBe(false)
  })
})
