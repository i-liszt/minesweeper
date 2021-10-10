import React from 'react'

import MineMapStyle from 'scss/components/mine-map.scss'
import Grid from './Grid'

const Columns: number = 6

const createColumns = (row: number) => Array.from({ length: Columns }, (_el, column: number) => {
  const isActive = Math.floor(Math.random() * 2 + 1) % 2 === 0
  const isMine = Math.floor(Math.random() * 20 + 1) % 5 === 0
  // eslint-disable-next-line
  return <Grid key={`row_${row}_${column}`} number={Math.floor(Math.random() * 8 + 1)} isActive={isActive} isMine={isMine} showMine></Grid>
})

const createMap = (rows: number) => Array.from({ length: rows }).map((_el, row: number) =>
// eslint-disable-next-line
   <div key={`row_${row}`} className={MineMapStyle.row}>
     { createColumns(row) }
   </div>)

export default () => (
  <div className={MineMapStyle['mine-map']}>
    { createMap(8) }
  </div>
)
