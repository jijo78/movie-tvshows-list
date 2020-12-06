import React from 'react'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { MemoryRouter } from 'react-router-dom'

import 'whatwg-fetch'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { cache } from 'swr'

import { TvDetails } from './TvDetails'
import { tvDetails } from '../fixtures/results-mock-resp'

const server = setupServer(
  rest.get(
    'https://api.themoviedb.org/3/tv/81026?api_key=00827fd50b322764fdf4d571822a4a05&append_to_response=credits',
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json(tvDetails))
    }
  )
)

const renderComponent = () =>
  render(
    <MemoryRouter initialEntries={['/tv/result:id']}>
      <TvDetails match={{ params: { resultId: '81026' } }}></TvDetails>
    </MemoryRouter>
  )

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('<TvDetails />', () => {
  afterEach(() => cache.clear())
  it('should render the page', async () => {
    const { findByText } = renderComponent()
    const component = await findByText('Tv shows')
    expect(component).toBeInTheDocument()
  })
  it('should render tv show title', async () => {
    const { findByText } = renderComponent()
    const component = await findByText('Rise of the Teenage Mutant Ninja Turtles')
    expect(component).toBeInTheDocument()
  })

  it('should render Release date', async () => {
    const { findByText } = renderComponent()
    const component = await findByText(/2020/i)
    expect(component).toBeInTheDocument()
  })

  it('should render overview', async () => {
    const { findByText } = renderComponent()
    const component = await findByText(/Overview:/i)
    expect(component).toBeInTheDocument()
  })

  it('should render a list of cast', async () => {
    const { queryAllByTestId, findByText } = renderComponent()
    const movieTitle = await findByText('Cast')
    expect(movieTitle).toBeInTheDocument()

    const li = queryAllByTestId('credits-list')

    expect(li.length).toBe(4)
  })
  it('should render cast card image', async () => {
    const { findByAltText } = renderComponent()
    const img = await findByAltText('Ben Schwartz')
    expect(img).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w780/5vV52TSEIhe4ZZLWwv3i7nfv8we.jpg'
    )
  })
  it('should render cast card title', async () => {
    const { findByText } = renderComponent()
    const cardTitle = await findByText('Ben Schwartz')
    expect(cardTitle).toBeInTheDocument()
  })
  it('should direct to actor details page', async () => {
    const { findByTitle } = renderComponent()
    const link = await findByTitle('Ben Schwartz')

    expect(link).toHaveAttribute('href', '/person/222121')
  })
})
