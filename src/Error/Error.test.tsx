import React from 'react'
import { cleanup, render } from '@testing-library/react'

import '@testing-library/jest-dom/extend-expect'

import { Error } from './Error'

const renderComponent = () => render(<Error>Some error occurred</Error>)

describe('<Card />', () => {
  afterEach(cleanup)

  it('should render the Card', () => {
    const { getByText } = renderComponent()

    const error = getByText('Some error occurred')
    expect(error).toBeInTheDocument()
  })
})
