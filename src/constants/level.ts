export enum Level {
  Easy = 'EASY',
  Medium = 'MEDIUM',
  Hard = 'HARD',
}

export const levelConfig = {
  [Level.Easy]: {
    row: 8,
    column: 6,
    mines: 5,
  },
  [Level.Medium]: {
    row: 10,
    column: 7,
    mines: 10,
  },
  [Level.Hard]: {
    row: 12,
    column: 8,
    mines: 15,
  },
}
