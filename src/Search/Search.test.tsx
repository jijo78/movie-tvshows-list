import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { Search } from './Search'

const renderComponent = () => render(<Search></Search>)
describe('<Search />', () => {
  afterEach(cleanup)

  it('should render the page', async () => {
    const { findByText } = renderComponent()
    const component = await findByText('Movie search')

    expect(component).toBeInTheDocument()
  })
  it('should render main search bar', async () => {
    const { findByLabelText } = renderComponent()
    const component = await findByLabelText('Search for movie, tv show or actor')

    expect(component).toBeInTheDocument()
  })

  it('should render filter component', async () => {
    const { findByLabelText } = renderComponent()
    const component = await findByLabelText('Filter')

    expect(component).toBeInTheDocument()
  })
})
