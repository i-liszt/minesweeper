import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import GridStyle from 'scss/components/grid.scss'
import FlagIcon from 'assets/img/ic-flag.svg'
import BombIcon from 'assets/img/ic-bomb.svg'

const GridProps = {
  className: PropTypes.string,
  adjacentMines: PropTypes.number,
  isMine: PropTypes.bool,
  explored: PropTypes.bool,
  flagged: PropTypes.bool,
  showMine: PropTypes.bool,
  onClick: PropTypes.func,
  onFlagged: PropTypes.func,
}

const Grid = ({
  className, adjacentMines, isMine, explored, flagged, showMine, onClick, onFlagged,
}: PropTypes.InferProps<typeof GridProps>) => {
  const [state, setState] = useState({
    clicked: explored,
    marked: flagged,
  })
  const [prevExplored, setPrevExplored] = useState(null)
  const [prevFlagged, setPrevFlagged] = useState(null)

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()

    if (state.clicked || state.marked || showMine) {
      return
    }

    setState({
      clicked: true,
      marked: false,
    })

    if (onClick) {
      onClick(true, { explored: true, flagged: false }, e)
    }
  }

  const handleContextMenu = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()

    if (state.clicked || showMine) {
      return
    }

    setState((prevState) => ({
      ...prevState,
      marked: !prevState.marked,
    }))

    if (onFlagged) {
      onFlagged(!state.marked, { explored: false, flagged: !state.marked }, e)
    }
  }

  const gridClass: string = clsx(
    GridStyle.grid, {
      [GridStyle['grid--explored']]: state.clicked,
      [GridStyle['grid--variant1']]: adjacentMines! <= 2,
      [GridStyle['grid--variant2']]: adjacentMines! > 2 && adjacentMines! <= 4,
      [GridStyle['grid--variant3']]: adjacentMines! > 4 && adjacentMines! <= 6,
      [GridStyle['grid--variant4']]: adjacentMines! > 6 && adjacentMines! <= 8,
    },
    className,
  )

  if (prevExplored !== explored) {
    setState({
      clicked: explored,
      marked: state.marked,
    })
    setPrevExplored(explored)
  }

  if (prevFlagged !== flagged) {
    setState({
      clicked: state.clicked,
      marked: flagged,
    })
    setPrevFlagged(flagged)
  }

  return (
    <button
      type="button"
      className={gridClass}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      {
        (!state.clicked && state.marked)
          ? <img className={GridStyle.grid__icon} src={FlagIcon} alt="flag" />
          : null
      }
      {
        (isMine && !state.marked && showMine)
          ? <img className={GridStyle.grid__icon} src={BombIcon} alt="mine" />
          : null
      }
      { (state.clicked && !isMine) ? (adjacentMines || '') : null }
    </button>
  )
}

Grid.propTypes = GridProps
Grid.defaultProps = {
  className: '',
  adjacentMines: undefined,
  isMine: false,
  explored: false,
  flagged: false,
  showMine: false,
  onClick: undefined,
  onFlagged: undefined,
}

export default Grid
