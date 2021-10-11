import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import TimerStyle from 'scss/components/timer.scss'
import timerIcon from 'assets/img/ic-stopwatch.png'

const TimerProps = {
  seconds: PropTypes.number,
  running: PropTypes.bool,
  onChange: PropTypes.func,
}

const Timer = ({ seconds, running, onChange }: PropTypes.InferProps<typeof TimerProps>) => {
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
    <div className={TimerStyle.timer}>
      <img
        className={TimerStyle.timer__icon}
        src={timerIcon}
        alt=""
      />
      <span className={TimerStyle.timer__seconds}>
        { time > 999 ? '999+' : displaySeconds }
      </span>
    </div>
  )
}

Timer.propTypes = TimerProps
Timer.defaultProps = {
  seconds: 0,
  running: false,
  onChange: undefined,
}

export default Timer
