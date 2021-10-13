export enum Level {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

export const grids = {
  // 48
  [Level.Easy]: {
    row: 8,
    column: 6,
  },
  // 42
  [Level.Medium]: {
    row: 10,
    column: 7,
  },
  // 36
  [Level.Hard]: {
    row: 12,
    column: 8,
  },
}
