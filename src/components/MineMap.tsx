import React from 'react'
import MineMapStyle from 'scss/components/mine-map.scss'

const Columns: number = 6

// eslint-disable-next-line
const createRows = (column: number, rows: number) => Array.from({ length: rows }).map((_el, row: number) => <div key={`row_${column}_${row}`} className={MineMapStyle.cell} />)

const createMap = (rows: number) => {
  const columns = Array.from({ length: Columns }).map((_el, column: number) => (
    // eslint-disable-next-line
    <div key={`col_${column}`} className="column">
      { createRows(column, rows) }
    </div>
  ))
  return columns
}

export default () => (
  <div className={MineMapStyle['mine-map']}>
    { createMap(12) }
  </div>
)
