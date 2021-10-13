import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import MineMapStyle from 'scss/components/mine-map.scss'
import Grid from './Grid'

export type GridData = {
  index: string,
  adjacentCount?: number,
  isMine: boolean,
  clicked: boolean,
  marked: boolean
}

export type MineMapState = {
  currentGrid: GridData | undefined,
  map: GridData[][]
}

const MineMapProps = {
  className: PropTypes.string,
  rows: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
  showMine: PropTypes.bool,
  onChange: PropTypes.func,
}

// eslint-disable-next-line arrow-body-style
const createMapFactory = (rows: number, columns: number): GridData[][] => {
  // eslint-disable-next-line arrow-body-style
  return Array.from({ length: rows }, (_el, row: number) => {
    return Array.from({ length: columns }, (_e, column: number) => ({
      index: `${row}_${column}`,
      adjacentCount: undefined,
      isMine: false,
      clicked: false,
      marked: false,
    }))
  })
}

const MineMap = ({
  className, rows, columns, showMine, onChange,
}: PropTypes.InferProps<typeof MineMapProps>) => {
  const [state, setState] = useState<MineMapState>({
    currentGrid: undefined,
    map: createMapFactory(rows, columns),
  })

  useEffect(() => {
    if (state.currentGrid && onChange) {
      onChange(state.currentGrid, state.map)
    }
  }, [state.currentGrid, onChange])

  const handleClick = ({ row, column }: { row: number, column: number }) => {
    state.map[row][column].clicked = true
    state.map[row][column].marked = false
    // TODO
    setState((prevState) => ({
      ...prevState,
      currentGrid: { ...state.map[row][column] },
    }))
  }

  const handleMarked = ({ row, column }: { row: number, column: number }, marked: boolean) => {
    state.map[row][column].marked = marked
    setState((prevState) => ({
      ...prevState,
      currentGrid: { ...state.map[row][column] },
    }))
  }

  const mapUi = state.map.map((rowData: GridData[], row: number) => (
    // eslint-disable-next-line
    <div key={`row_${row}`} className={MineMapStyle.row}>
      {
        rowData.map((gridData: GridData, column: number) => (
          <Grid
            // eslint-disable-next-line
            key={`row_${row}_${column}`}
            className={MineMapStyle.column}
            number={gridData.adjacentCount}
            clicked={gridData.clicked}
            isMine={gridData.isMine}
            showMine={showMine}
            onClick={() => handleClick({ row, column })}
            onMarked={(marked) => handleMarked({ row, column }, marked)}
          />
        ))
      }
    </div>
  ))

  return (
    <div className={clsx(MineMapStyle['mine-map'], className)}>
      { mapUi }
    </div>
  )
}

MineMap.propTypes = MineMapProps
MineMap.defaultProps = {
  className: undefined,
  showMine: false,
  onChange: undefined,
}

export default MineMap
