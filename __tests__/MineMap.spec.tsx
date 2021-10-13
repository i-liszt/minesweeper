/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import MineMap from '../src/components/MineMap'

describe('MineMap props', () => {
  let container: HTMLElement
  const customClass: string = 'customClass'
  const rows = 8
  const columns = 6
  beforeEach(() => {
    container = render(<MineMap rows={rows} columns={columns} className={customClass} />).container
  })

  test('should render with given className', () => {
    expect(container!.firstChild).toHaveClass('mine-map', customClass)
  })

  test('should render with given rows and columns', () => {
    const rowElements = container.querySelectorAll('.row')
    expect(rowElements.length).toBe(rows)

    const columnElements = rowElements[0].querySelectorAll('.column')
    expect(columnElements.length).toBe(columns)

    const gridElements = container.querySelectorAll('.grid')
    expect(gridElements.length).toBe(rows * columns)
  })

  test('should trigger event "onChange" when a grid is clicked or marked', () => {
    const handleChange = jest.fn()
    container = render(<MineMap rows={rows} columns={columns} onChange={handleChange} />).container
    const grid = container.querySelectorAll('.grid')

    fireEvent.click(grid[0])
    expect(handleChange).toHaveBeenCalledTimes(1)

    fireEvent.contextMenu(grid[1])
    expect(handleChange).toHaveBeenCalledTimes(2)
  })
})
