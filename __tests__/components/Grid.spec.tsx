/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'

import Grid from '~/components/Grid'

describe('Component: Grid component props', () => {
  test('should render without content', () => {
    const { container } = render(<Grid />)
    expect(container!.firstChild?.textContent).toBe('')
  })

  test('should render with given className', () => {
    const customClass: string = 'customClass'
    const { container } = render(<Grid className={customClass} />)
    expect(container!.firstChild).toHaveClass('grid', customClass)
  })

  test('should render with className "grid--explored" when explored', () => {
    const { container } = render(<Grid explored />)
    expect(container!.firstChild).toHaveClass('grid--explored')
  })

  test('should render without adjacentMines when unexplored', () => {
    const { container } = render(<Grid adjacentMines={1} />)
    expect(container!.firstChild?.textContent).toBe('')
  })

  test('should render with adjacentMines when explored', () => {
    const { container } = render(<Grid adjacentMines={1} explored />)
    expect(container!.firstChild?.textContent).toBe('1')
  })

  test('should trigger event "onClick" if defined', () => {
    const handleClick: jest.Mock = jest.fn()
    const { container } = render(<Grid onClick={handleClick} />)
    fireEvent.click(container!.firstChild)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('should trigger event "onClick" only when unexplored', () => {
    const handleClick: jest.Mock = jest.fn()
    const { container } = render(<Grid onClick={handleClick} explored />)
    fireEvent.click(container!.firstChild)
    expect(handleClick).toHaveBeenCalledTimes(0)
  })

  test('should trigger event "onFlagged" if defined', () => {
    const handleFlagged: jest.Mock = jest.fn()
    const { container } = render(<Grid onFlagged={handleFlagged} />)
    fireEvent.contextMenu(container!.firstChild)
    expect(handleFlagged).toHaveBeenCalledTimes(1)
  })

  test('should trigger event "onFlagged" only when unexplored', () => {
    const handleFlagged: jest.Mock = jest.fn()
    const { container } = render(<Grid onFlagged={handleFlagged} explored />)
    fireEvent.contextMenu(container!.firstChild)
    expect(handleFlagged).toHaveBeenCalledTimes(0)
  })
})
