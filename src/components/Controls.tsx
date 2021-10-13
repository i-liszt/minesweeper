import PropTypes from 'prop-types'
import clsx from 'clsx'
import ControlsStyle from 'scss/components/controls.scss'
import Timer from '~/components/Timer'
import Flag from '~/components/Flag'
// import { Level } from '~/constants/level'

const ControlsProps = {
  className: PropTypes.string,
  // level: PropTypes.oneOf(Object.values(Level)),
  seconds: PropTypes.number,
  remainFlags: PropTypes.number,
  running: PropTypes.bool,
  onTimeChange: PropTypes.func,
}

const Controls = ({
  className, seconds, remainFlags, running, onTimeChange,
}: PropTypes.InferProps<typeof ControlsProps>) => (
  <div className={clsx(ControlsStyle.controls, className)}>
    <Timer seconds={seconds} running={running} onChange={onTimeChange} />
    <Flag className={ControlsStyle.controls__flags} remainFlags={remainFlags} />
  </div>
)

Controls.propTypes = ControlsProps
Controls.defaultProps = {
  className: undefined,
  // level: Level.Easy,
  seconds: 0,
  remainFlags: 0,
  running: false,
  onTimeChange: undefined,
}

export default Controls
