/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'

import Grid from '../src/components/Grid'

describe('Grid component props', () => {
  test('should render without content', () => {
    const { container } = render(<Grid />)
    expect(container!.firstChild?.textContent).toBe('')
  })

  test('should render with given className', () => {
    const customClass: string = 'customClass'
    const { container } = render(<Grid className={customClass} />)
    expect(container!.firstChild).toHaveClass('grid', customClass)
  })

  test('should render with className "grid--pressed" when clicked', () => {
    const { container } = render(<Grid clicked />)
    expect(container!.firstChild).toHaveClass('grid--pressed')
  })

  test('should render without number when unclicked', () => {
    const { container } = render(<Grid number={1} />)
    expect(container!.firstChild?.textContent).toBe('')
  })

  test('should render with number when clicked', () => {
    const { container } = render(<Grid number={1} clicked />)
    expect(container!.firstChild?.textContent).toBe('1')
  })

  test('should render with className "grid--marked" only when marked', () => {
    const { container } = render(<Grid />)
    fireEvent.contextMenu(container!.firstChild)
    expect(container?.firstChild).toHaveClass('grid', 'grid--marked')

    fireEvent.contextMenu(container!.firstChild)
    expect(container?.firstChild).not.toHaveClass('grid--marked')
  })

  test('should render with className "grid--mine" when both isMine and showMine are true', () => {
    const { container } = render(<Grid isMine showMine />)
    expect(container?.firstChild).toHaveClass('grid', 'grid--mine')
  })

  test('should trigger event "onClick"', () => {
    const handleClick: jest.Mock = jest.fn()
    const { container } = render(<Grid onClick={handleClick} />)
    fireEvent.click(container!.firstChild)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('should trigger event "onClick" only when unclicked', () => {
    const handleClick: jest.Mock = jest.fn()
    const { container } = render(<Grid onClick={handleClick} clicked />)
    fireEvent.click(container!.firstChild)
    expect(handleClick).toHaveBeenCalledTimes(0)
  })

  test('should trigger event "onMarked" if defined', () => {
    const handleMarked: jest.Mock = jest.fn()
    const { container } = render(<Grid onMarked={handleMarked} />)
    fireEvent.contextMenu(container!.firstChild)
    expect(handleMarked).toHaveBeenCalledTimes(1)
  })

  test('should trigger event "onMarked" only when unclicked', () => {
    const handleMarked: jest.Mock = jest.fn()
    const { container } = render(<Grid onMarked={handleMarked} clicked />)
    fireEvent.contextMenu(container!.firstChild)
    expect(handleMarked).toHaveBeenCalledTimes(0)
  })
})
