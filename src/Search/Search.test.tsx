import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { cache } from 'swr'

import 'whatwg-fetch'

import { Search } from './Search'
import { resultsList } from '../fixtures/results-mock-resp'
const server = setupServer(
  rest.get(
    'https://api.themoviedb.org/3/search/multi?api_key=400827fd50b322764fdf4d571822a4a05&append_to_response=credits',
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json(resultsList))
    }
  )
)
console.log('server: ', server)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
const renderComponent = () => render(<Search></Search>)
describe('<Search />', () => {
  afterEach(cleanup)
  afterEach(() => cache.clear())

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
