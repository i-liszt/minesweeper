import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import InfoStyle from 'scss/components/info.scss'
import TimerIcon from 'assets/img/ic-timer.svg'

const TimerProps = {
  className: PropTypes.string,
  seconds: PropTypes.number,
  running: PropTypes.bool,
  onChange: PropTypes.func,
}

const Timer = ({
  className, seconds, running, onChange,
}: PropTypes.InferProps<typeof TimerProps>) => {
  const [time, setTime] = useState(seconds || 0)
  const [prevSeconds, setPrevSeconds] = useState(0)
  const displaySeconds = (time || 0).toString().padStart(3, '0')

  useEffect(() => {
    const intervalId: NodeJS.Timer = setInterval(() => {
      if (running) {
        setTime((prevTime) => prevTime + 1)
        if (onChange) {
          onChange(time + 1)
        }
      } else {
        clearInterval(intervalId)
      }
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [running, time, setTime, onChange])

  if (seconds !== prevSeconds) {
    setTime(seconds || 0)
    setPrevSeconds(seconds || 0)
  }

  return (
    <div className={clsx(InfoStyle.info, className)}>
      <div className={InfoStyle.info__inner}>
        <img
          className={InfoStyle.info__icon}
          src={TimerIcon}
          alt=""
        />
        <span className={InfoStyle.info__text}>
          { time > 999 ? '999+' : displaySeconds }
        </span>
      </div>
    </div>
  )
}

Timer.propTypes = TimerProps
Timer.defaultProps = {
  className: undefined,
  seconds: 0,
  running: false,
  onChange: undefined,
}

export default Timer
