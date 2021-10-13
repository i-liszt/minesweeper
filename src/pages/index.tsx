import { useState } from 'react'
import clsx from 'clsx'
import MineMapStyle from 'scss/components/mine-map.scss'
import Controls from '~/components/Controls'
import MineMap, { GridData } from '~/components/MineMap'
import { Level, grids } from '~/constants/level'

type AppState = {
  level: string,
  showMine: boolean,
  running: boolean
}

export default () => {
  const [state, setState] = useState<AppState>({
    level: Level.Medium,
    showMine: false,
    running: false,
  })

  const handleLevelChange = (level: string) => {
    setState({
      level,
      showMine: false,
      running: false,
    })
  }

  const handleChange = (grid: GridData) => {
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
      <Controls
        running={state.running}
        onLevelChange={handleLevelChange}
      />
      <MineMap
        className={clsx({
          [MineMapStyle['mine-map--easy']]: state.level === Level.Easy,
          [MineMapStyle['mine-map--hard']]: state.level === Level.Hard,
        })}
        rows={grids[state.level as keyof typeof grids].row}
        columns={grids[state.level as keyof typeof grids].column}
        showMine={state.showMine}
        onChange={handleChange}
      />
    </>
  )
}
