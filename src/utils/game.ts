export const isLose = (clickedGrid: GridData): boolean => clickedGrid.isMine && clickedGrid.explored

// eslint-disable-next-line arrow-body-style
export const isWin = (minesList: GridData[]): boolean => {
  return minesList.every((grid) => grid.isMine && grid.flagged)
}
