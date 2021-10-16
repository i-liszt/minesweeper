import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import MineMapStyle from 'scss/components/mine-map.scss'
import { createMapFactory, placeMines, exploreGrid } from '~/utils/mines'
import Grid from './Grid'

export type MineMapState = {
  currentGridData: GridData | undefined,
  prevGridData: GridData | undefined,
  map: GridData[][],
  minesList: GridData[]
}

const MineMapProps = {
  className: PropTypes.string,
  rows: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
  minesCount: PropTypes.number.isRequired,
  showMine: PropTypes.bool,
  onChange: PropTypes.func,
}

const MineMap = ({
  className, rows, columns, minesCount, showMine, onChange,
}: PropTypes.InferProps<typeof MineMapProps>) => {
  const [state, setState] = useState<MineMapState>({
    currentGridData: undefined,
    prevGridData: undefined,
    map: [],
    minesList: [],
  })

  useEffect(() => {
    const newMap: GridData[][] = createMapFactory(rows, columns)
    placeMines(newMap, minesCount)

    const minesList: GridData[] = []
    newMap.forEach((rowData: GridData[]) => {
      rowData.forEach((grid: GridData) => {
        if (grid.isMine) {
          minesList.push(grid)
        }
      })
    })

    setState({
      currentGridData: undefined,
      prevGridData: undefined,
      map: newMap,
      minesList,
    })
  }, [rows, columns])

  useEffect(() => {
    if (state.currentGridData && onChange) {
      onChange(
        state.currentGridData,
        state.prevGridData,
        { map: state.map, minesList: state.minesList },
      )
    }
  }, [state.currentGridData])

  const handleClick = ({ row, column }: { row: number, column: number }): void => {
    const copyGrid = { ...state.map[row][column] }
    exploreGrid(state.map[row][column], state.map)
    setState((prevState) => ({
      ...prevState,
      currentGridData: { ...state.map[row][column] },
      prevGridData: copyGrid,
    }))
  }

  const handleFlagged = (
    { row, column }: { row: number, column: number }, flagged: boolean,
  ): void => {
    const copyGrid = { ...state.map[row][column] }
    state.map[row][column].flagged = flagged
    setState((prevState) => ({
      ...prevState,
      currentGridData: { ...state.map[row][column] },
      prevGridData: copyGrid,
    }))
  }

  return (
    <div className={clsx(MineMapStyle['mine-map'], className)}>
      {
        state.map.map((rowData: GridData[], row: number) => (
          // eslint-disable-next-line
          <div key={`row_${row}`} className={MineMapStyle.row}>
            {
              rowData.map((gridData: GridData, column: number) => (
                <Grid
                  // eslint-disable-next-line
                  key={`${row}_${column}`}
                  className={MineMapStyle.column}
                  adjacentMines={gridData.adjacentMines}
                  explored={gridData.explored}
                  flagged={gridData.flagged}
                  isMine={gridData.isMine}
                  showMine={showMine}
                  onClick={() => handleClick({ row, column })}
                  onFlagged={(flagged) => handleFlagged({ row, column }, flagged)}
                />
              ))
            }
          </div>
        ))
      }
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
