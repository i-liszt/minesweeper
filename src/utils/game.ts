export const isLose = (clickedGrid: GridData): boolean => clickedGrid.isMine && clickedGrid.explored

// eslint-disable-next-line arrow-body-style
export const isWin = (minesList: GridData[], remainFlags: number): boolean => {
  return remainFlags === 0
    && minesList.every((grid) => grid.isMine && grid.flagged)
}
