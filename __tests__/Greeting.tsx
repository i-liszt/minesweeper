/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'

import React from 'react'
import { render, screen } from '@testing-library/react'
import Greeting from '../src/components/Greeting'

test('should render name prop', () => {
  const testName: string = 'Jack'

  render(
    <Greeting name={testName} />,
  )

  expect(screen.getByText(testName)).toBeTruthy()
})
