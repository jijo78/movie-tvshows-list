import React from 'react'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { MemoryRouter } from 'react-router-dom'

import 'whatwg-fetch'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { cache } from 'swr'

import { ActorDetails } from './ActorDetails'
import { actorDetails } from '../fixtures/results-mock-resp'

const server = setupServer(
  rest.get(
    'https://api.themoviedb.org/3/person/38334?api_key=38334&append_to_response=movie_credits,tv_credits',
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json(actorDetails))
    }
  )
)

const renderComponent = () =>
  render(
    <MemoryRouter initialEntries={['/person/person:id']}>
      <ActorDetails match={{ params: { resultId: '38334' } }}></ActorDetails>
    </MemoryRouter>
  )

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('<ActorDetails />', () => {
  afterEach(() => cache.clear())
  it('should render the page', async () => {
    const { findByText } = renderComponent()
    const component = await findByText('Actor Details Page')
    expect(component).toBeInTheDocument()
  })
  it('should render birthday section', async () => {
    const { findByText } = renderComponent()
    const component = await findByText('28 Aug 1961')
    expect(component).toBeInTheDocument()
  })

  it('should render Biography if data available', async () => {
    const { findByText } = renderComponent()
    const component = await findByText(/Biography:/i)
    expect(component).toBeInTheDocument()
  })

  it('should render the actor name', async () => {
    const { findByText } = renderComponent()
    const component = await findByText(/Jennifer Coolidge /i)
    expect(component).toBeInTheDocument()
  })

  it('should render a list of tv shows', async () => {
    const { queryAllByTestId, findByText, container } = renderComponent()
    const movieTitle = await findByText('Most recent Tv shows')
    expect(movieTitle).toBeInTheDocument()

    const li = queryAllByTestId('tv-list')

    expect(li.length).toBe(3)
  })
  it('should render tv shows card image', async () => {
    const { findByAltText } = renderComponent()
    const img = await findByAltText('The Smurfs!')
    expect(img).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w780/ziqYvMMvQGSKQtPIkFmc41FU1nb.jpg'
    )
  })
  it('should render tv shows card title', async () => {
    const { findByText } = renderComponent()
    const cardTitle = await findByText('The Smurfs!')
    expect(cardTitle).toBeInTheDocument()
  })
  it('should direct tv link to tv details page', async () => {
    const { findByTitle } = renderComponent()
    const link = await findByTitle('The Smurfs!')

    expect(link).toHaveAttribute('href', '/tv/91319')
  })

  it('should render a list of movies', async () => {
    const { queryAllByTestId, findByText } = renderComponent()
    const movieTitle = await findByText('Most recent Movies')
    expect(movieTitle).toBeInTheDocument()

    const li = queryAllByTestId('movies-list')
    expect(li.length).toBe(2)
  })
  it('should render movie card image', async () => {
    const { findByAltText } = renderComponent()
    const img = await findByAltText('Bobbleheads: The Movie')
    expect(img).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w780/t7gNfiDRZLgNka0Q7hPmRgmxLoG.jpg'
    )
  })

  it('should direct movie link to movie details page', async () => {
    const { findByTitle } = renderComponent()
    const link = await findByTitle('Bobbleheads: The Movie')

    expect(link).toHaveAttribute('href', '/result/754433')
  })
  it('handles server error', async () => {
    rest.get(
      'https://api.themoviedb.org/3/person/38334?api_key=38334&append_to_response=movie_credits,tv_credits',
      (_req, res, ctx) => {
        return res(ctx.status(404), ctx.json({}))
      }
    )

    const { findByText } = renderComponent()

    const error = await findByText('Sorry. Not details available')
    expect(error).toBeInTheDocument()
    cache.clear()
  })
})
