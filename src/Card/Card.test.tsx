import React from 'react'
import { cleanup, render } from '@testing-library/react'

import '@testing-library/jest-dom/extend-expect'

import { Cards, Card, CardBody } from './Card'

const renderComponent = () =>
  render(
    <Cards>
      <Card>Content</Card>

      <CardBody>Body</CardBody>
    </Cards>
  )

describe('<Card />', () => {
  afterEach(cleanup)

  it('should render the Card', () => {
    const { getByText } = renderComponent()

    const content = getByText('Content')
    expect(content).toBeInTheDocument()
    const footer = getByText('Body')
    expect(footer).toBeInTheDocument()
  })
})
