import PropTypes from 'prop-types'
import clsx from 'clsx'
import InfoStyle from 'scss/components/info.scss'
import FlagIcon from 'assets/img/ic-flag.png'

const FlagProps = {
  className: PropTypes.string,
  remainFlags: PropTypes.number,
}

const Flag = ({ className, remainFlags }: PropTypes.InferProps<typeof FlagProps>) => (
  <div className={clsx(InfoStyle.info, className)}>
    <img className={InfoStyle.info__icon} src={FlagIcon} alt="" />
    <span className={InfoStyle.info__text}>
      { remainFlags || '0' }
    </span>
  </div>
)

Flag.propTypes = FlagProps
Flag.defaultProps = {
  className: undefined,
  remainFlags: 0,
}

export default Flag
