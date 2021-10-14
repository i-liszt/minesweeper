import PropTypes from 'prop-types'
import clsx from 'clsx'
import InfoStyle from 'scss/components/info.scss'
import FlagIcon from 'assets/img/ic-flag.svg'

const FlagProps = {
  className: PropTypes.string,
  flags: PropTypes.number,
}

const Flag = ({ className, flags }: PropTypes.InferProps<typeof FlagProps>) => (
  <div className={clsx(InfoStyle.info, className)}>
    <div className={InfoStyle.info__inner}>
      <img className={InfoStyle.info__icon} src={FlagIcon} alt="" />
      <span className={InfoStyle.info__text}>
        { flags || '0' }
      </span>
    </div>
  </div>
)

Flag.propTypes = FlagProps
Flag.defaultProps = {
  className: undefined,
  flags: 0,
}

export default Flag
