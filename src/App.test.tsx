import React from 'react'
import { cleanup, render } from '@testing-library/react'

import '@testing-library/jest-dom/extend-expect'

import App from './App'

const renderComponent = () => render(<App />)

describe('<Media />', () => {
  afterEach(cleanup)

  it('should render the App component', () => {
    const { getByText } = renderComponent()
    const media = getByText('Find a movie')
    expect(media).toBeInTheDocument()
  })
})
