import { useEffect, useState } from 'react'
import clsx from 'clsx'
import MineMapStyle from 'scss/components/mine-map.scss'
import Controls from '~/components/Controls'
import MineMap from '~/components/MineMap'
import { isWin, isLose } from '~/utils/game'
import { Level, levelConfig } from '~/constants/level'
import { Status } from '~/constants/status'

type AppState = {
  level: string,
  remainFlags: number,
  status: Status
}

export default () => {
  const [state, setState] = useState<AppState>({
    level: Level.Medium,
    remainFlags: levelConfig[Level.Medium].mines,
    status: Status.Stop,
  })

  useEffect(() => {
    // TODO: modal
    if (state.status === Status.Lose) {
      alert('You lose')
    } else if (state.status === Status.Win) {
      alert('You win')
    }
  }, [state.status])

  const handleLevelChange = (level: string) => {
    setState({
      level,
      remainFlags: levelConfig[level as keyof typeof levelConfig].mines,
      status: Status.Stop,
    })
  }

  const handleChange = (
    grid: GridData,
    prevGrid: GridData,
    { minesList }: ({ minesList: GridData[] }),
  ) => {
    if (!grid) {
      return
    }

    if (state.status !== Status.Running) {
      setState((prevState) => ({
        ...prevState,
        remainFlags: grid.flagged ? prevState.remainFlags - 1 : prevState.remainFlags,
        status: grid.explored && grid.isMine ? Status.Stop : Status.Running,
      }))
    } else if (grid) {
      const isFlagChanged: boolean = grid.flagged !== prevGrid.flagged

      let status: Status = Status.Running
      if (isLose(grid)) {
        status = Status.Lose
      } else if (isWin(minesList)) {
        status = Status.Win
      }

      setState((prevState) => ({
        ...prevState,
        // eslint-disable-next-line no-nested-ternary
        remainFlags: (isFlagChanged && grid.flagged)
          ? prevState.remainFlags - 1
          : (isFlagChanged && !grid.flagged) ? prevState.remainFlags + 1 : prevState.remainFlags,
        status,
      }))
    }
  }

  return (
    <>
      <Controls
        remainFlags={state.remainFlags}
        running={state.status === Status.Running}
        onLevelChange={handleLevelChange}
      />
      <MineMap
        className={clsx({
          [MineMapStyle['mine-map--easy']]: state.level === Level.Easy,
          [MineMapStyle['mine-map--hard']]: state.level === Level.Hard,
        })}
        rows={levelConfig[state.level as keyof typeof levelConfig].row}
        columns={levelConfig[state.level as keyof typeof levelConfig].column}
        minesCount={levelConfig[state.level as keyof typeof levelConfig].mines}
        showMine={state.status === Status.Lose}
        onChange={handleChange}
      />
    </>
  )
}
