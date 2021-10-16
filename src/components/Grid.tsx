import React, { useState, useEffect } from 'react'
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

type GridState = {
  clicked: boolean,
  marked: boolean
}

const Grid = ({
  className, adjacentMines, isMine, explored, flagged, showMine, onClick, onFlagged,
}: PropTypes.InferProps<typeof GridProps>) => {
  const [state, setState] = useState<GridState>({
    clicked: explored!,
    marked: flagged!,
  })

  useEffect(() => {
    if (state.clicked === explored && state.marked === flagged) {
      return
    }

    const clicked = state.clicked !== explored ? explored : state.clicked
    const marked = state.marked !== flagged ? flagged : state.marked
    setState({
      clicked: clicked!,
      marked: clicked ? false : marked!,
    })
  }, [explored, flagged])

  useEffect(() => {
    if (state.clicked === explored) {
      return
    }

    if (state.clicked && onClick) {
      onClick(true, { explored: true, flagged: false })
    }
  }, [state.clicked])

  useEffect(() => {
    if (state.marked === flagged) {
      return
    }

    if (onFlagged) {
      onFlagged(state.marked, { explored: false, flagged: state.marked })
    }
  }, [state.marked])

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()

    if (state.clicked || state.marked || showMine) {
      return
    }

    setState((prevState) => ({
      ...prevState,
      clicked: true,
    }))
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
