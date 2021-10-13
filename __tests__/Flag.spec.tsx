/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Flag from '../src/components/Flag'

describe('Flag props', () => {
  test('should render with given className', () => {
    const customClass: string = 'customClass'
    const { container } = render(<Flag className={customClass} />)
    expect(container!.firstChild).toHaveClass('info', customClass)
  })

  test('should render with remainFlags', () => {
    const remainFlags: number = 3
    const { container } = render(<Flag remainFlags={remainFlags} />)
    const text = container.querySelector('.info__text')
    expect(text?.textContent).toBe(String(remainFlags))
  })
})
