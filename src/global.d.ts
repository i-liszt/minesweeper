// declaration.d.ts
declare module '*.scss'
declare module '*.JPG'
declare module '*.png'
declare module '*.svg'

declare type GridData = {
  index: string,
  adjacentMines?: number,
  isMine: boolean,
  clicked: boolean,
  marked: boolean
}
