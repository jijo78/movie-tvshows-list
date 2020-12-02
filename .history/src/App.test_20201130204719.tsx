import React from 'react'
import { cleanup, render } from '@testing-library/react'

import '@testing-library/jest-dom/extend-expect'

import { App } from './App'

const renderComponent = () =>
  render(
    <App>
      <img src="" alt="some alt tag" />
    </App>
  )

describe('<Media />', () => {
  afterEach(cleanup)

  it('should render the Media component and his child', () => {
    const { getByAltText } = renderComponent()
    const media = getByAltText('some alt tag')
    expect(media).toBeInTheDocument()
  })
})
