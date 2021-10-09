/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'

import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Counter from '../src/components/Counter'

test('should load with state 0', () => {
  const { container } = render(<Counter />)
  const counter = container.querySelector('.counter__number')
  expect(counter?.textContent).toBe('0')
})

test('should increment work', () => {
  const { container } = render(<Counter />)

  const counter = container.querySelector('.counter__number')
  expect(counter?.textContent).toBe('0')

  const button = container.querySelector('.counter__button')
  // @ts-ignore
  fireEvent.click(button)
  expect(counter?.textContent).toBe('1')
})
