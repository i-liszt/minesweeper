import { useState } from 'react'
import Controls from '~/components/Controls'
import MineMap, { GridData } from '~/components/MineMap'
import { Level, grids } from '~/constants/level'

type AppState = {
  level: string,
  seconds: number,
  showMine: boolean,
  running: boolean
}

export default () => {
  const [state, setState] = useState<AppState>({
    level: Level.Medium,
    seconds: 0,
    showMine: false,
    running: false,
  })

  const handleChange = (grid: GridData, newMap: GridData[][]) => {
    // TODO
    console.log(grid, newMap)
    if (grid && !state.running && !state.showMine) {
      setState((prevState) => ({
        ...prevState,
        running: true,
      }))
    } else if (grid?.isMine) {
      setState((prevState) => ({
        ...prevState,
        showMine: true,
        running: false,
      }))
    }
  }

  return (
    <>
      <Controls seconds={state.seconds} running={state.running} />
      <MineMap
        rows={grids[Level.Easy].row}
        columns={grids[Level.Easy].column}
        showMine={state.showMine}
        onChange={handleChange}
      />
    </>
  )
}
