/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { render, act } from '@testing-library/react'
import React from 'react'
import Timer from '../src/components/Timer'

describe('Timer components props', () => {
  test('should render with given seconds, and prepended 0', () => {
    const { container } = render(<Timer seconds={1} />)
    const displayText = container!.querySelector('.timer__seconds')
    expect(displayText?.textContent).toBe('001')
  })

  test('should render "999+" when the seconds is over 999', () => {
    const { container } = render(<Timer seconds={1000} />)
    const displayText = container!.querySelector('.timer__seconds')
    expect(displayText?.textContent).toBe('999+')
  })

  test('should displaying time change every second', () => {
    jest.useFakeTimers()
    const { container } = render(<Timer running />)
    const displayTime = container!.querySelector('.timer__seconds')
    expect(displayTime?.textContent).toBe('000')

    /*
    * Unit test has no idea that advancing timers will cause component updates
    * Need an act() to wrap so that test will know advanceTimersByTime() causes component to update
    * */
    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(displayTime?.textContent).toBe('001')
  })

  test('should onChange triggered if defined', () => {
    jest.useFakeTimers()
    const handleChange = jest.fn()
    render(<Timer running onChange={handleChange} />)

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(handleChange).toHaveBeenCalledTimes(1)
  })
})
