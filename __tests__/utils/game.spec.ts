import { isLose, isWin } from '~/utils/game'

describe('Utils: Game utils', () => {
  test('should a user loses the game when clicking a mine grid', () => {
    const mineGrid: GridData = {
      index: '0_0',
      isMine: true,
      explored: true,
      flagged: false,
    }
    expect(isLose(mineGrid)).toBe(true)
  })

  test('should a user wins the game when mine grids are all flagged', () => {
    const mineGrids: GridData[] = Array.from({ length: 8 }, (_, index: number) => ({
      index: `0_${index}`,
      isMine: true,
      explored: false,
      flagged: true,
    }))
    expect(isWin(mineGrids)).toBe(true)
  })
})
