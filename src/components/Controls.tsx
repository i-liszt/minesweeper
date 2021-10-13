import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import ControlsStyle from 'scss/components/controls.scss'
import InfoStyle from 'scss/components/info.scss'
import Timer from '~/components/Timer'
import Flag from '~/components/Flag'
import { Level } from '~/constants/level'

const ControlsProps = {
  className: PropTypes.string,
  level: PropTypes.oneOf(Object.values(Level)),
  remainFlags: PropTypes.number,
  running: PropTypes.bool,
  onLevelChange: PropTypes.func,
}

type ControlsState = {
  time: number,
  currentLevel: string,
  active: boolean | undefined | null
}

const Controls = ({
  className, level, remainFlags, running, onLevelChange,
}: PropTypes.InferProps<typeof ControlsProps>) => {
  const [{ time, currentLevel, active }, setState] = useState<ControlsState>({
    time: 0,
    currentLevel: level as string,
    active: running,
  })

  useEffect(() => {
    if (onLevelChange) {
      onLevelChange(currentLevel)
    }
  }, [currentLevel])

  const handleTimeChange = (seconds: number) => {
    setState((prevState) => ({
      ...prevState,
      time: seconds,
    }))
  }

  const handleLevelChange = (event: Event) => {
    setState({
      time: 0,
      currentLevel: (event?.target as HTMLSelectElement).value,
      active: false,
    })
  }

  if (active !== running) {
    setState((prevState) => ({
      ...prevState,
      time: 0,
      active: running,
    }))
  }

  return (
    <div className={clsx(ControlsStyle.controls, className)}>
      <Timer
        seconds={time}
        running={active}
        onChange={handleTimeChange}
      />
      <Flag
        className={ControlsStyle.controls__flags}
        remainFlags={remainFlags}
      />
      <div className={clsx(InfoStyle.info, ControlsStyle.controls__level)}>
        <select
          className={InfoStyle.info__inner}
          value={currentLevel}
          onChange={handleLevelChange}
        >
          {
            Object.keys(Level).map((lv: string) => (
              <option key={lv} value={Level[lv as keyof typeof Level]}>
                {lv}
              </option>
            ))
          }
        </select>
      </div>
    </div>
  )
}

Controls.propTypes = ControlsProps
Controls.defaultProps = {
  className: undefined,
  level: Level.Medium,
  remainFlags: 0,
  running: false,
  onLevelChange: undefined,
}

export default Controls
