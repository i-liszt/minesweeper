import { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import GridStyle from 'scss/components/grid.scss'

const GridProps = {
  className: PropTypes.string,
  number: PropTypes.number,
  clicked: PropTypes.bool,
  isMine: PropTypes.bool,
  showMine: PropTypes.bool,
  onClick: PropTypes.func,
  onMarked: PropTypes.func,
}

const Grid = ({
  className, number, clicked, isMine, showMine, onClick, onMarked,
}: PropTypes.InferProps<typeof GridProps>) => {
  const [marked, setMarked] = useState(false)

  const gridClass: string = clsx(
    GridStyle.grid, {
      [GridStyle['grid--pressed']]: clicked,
      [GridStyle['grid--marked']]: marked,
      [GridStyle['grid--mine']]: showMine && isMine,
      [GridStyle['grid--variant1']]: number! <= 2,
      [GridStyle['grid--variant2']]: number! > 2 && number! <= 4,
      [GridStyle['grid--variant3']]: number! > 4 && number! <= 6,
      [GridStyle['grid--variant4']]: number! > 6 && number! <= 8,
    },
    className,
  )

  const handleContextMenu = (e: Event) => {
    e.stopPropagation()
    e.preventDefault()

    setMarked(!marked)
    if (onMarked) {
      onMarked(!marked, e)
    }
  }

  return (
    <button
      type="button"
      className={gridClass}
      onClick={!clicked ? onClick : undefined}
      onContextMenu={!clicked ? handleContextMenu : undefined}
    >
      { (clicked && !isMine) ? (number || '') : '' }
    </button>
  )
}

Grid.propTypes = GridProps
Grid.defaultProps = {
  className: '',
  number: undefined,
  clicked: false,
  isMine: false,
  showMine: false,
  onClick: undefined,
  onMarked: undefined,
}

export default Grid
