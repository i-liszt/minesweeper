export enum Level {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

export const grids = {
  [Level.Easy]: {
    row: 8,
    column: 6,
  },
  [Level.Medium]: {
    row: 10,
    column: 7,
  },
  [Level.Hard]: {
    row: 12,
    column: 8,
  },
}
