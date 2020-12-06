import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { MemoryRouter } from 'react-router-dom'

import 'whatwg-fetch'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { cache } from 'swr'

import { ShowDetails } from './ShowDetails'
import { movieDetails } from '../fixtures/results-mock-resp'

const server = setupServer(
  rest.get(
    'https://api.themoviedb.org/3/movie/454640?api_key=400827fd50b322764fdf4d571822a4a05&append_to_response=credits',
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json(movieDetails))
    }
  )
)

const renderComponent = () =>
  render(
    <MemoryRouter initialEntries={['/movie/result:id']}>
      <ShowDetails match={{ params: { resultId: '454640' } }}></ShowDetails>
    </MemoryRouter>
  )

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('<ShowDetails />', () => {
  afterEach(() => cache.clear())
  it('should render the page', async () => {
    const { findByText } = renderComponent()
    const component = await findByText('Movies')
    expect(component).toBeInTheDocument()
  })
  it('should render movie title', async () => {
    const { findByText } = renderComponent()
    const component = await findByText('The Angry Birds Movie 2')
    expect(component).toBeInTheDocument()
  })

  it('should render Release date', async () => {
    const { findByText } = renderComponent()
    const component = await findByText(/Released: 2019/i)
    expect(component).toBeInTheDocument()
  })

  it('should render movie duration', async () => {
    const { findByText } = renderComponent()
    const component = await findByText(/Duration: 96 minutes/i)
    expect(component).toBeInTheDocument()
  })

  it('should render a list of cast', async () => {
    const { queryAllByTestId, findByText } = renderComponent()
    const movieTitle = await findByText('Cast')
    expect(movieTitle).toBeInTheDocument()

    const li = queryAllByTestId('cast-list')

    expect(li.length).toBe(4)
  })

  it('should render a list of genres', async () => {
    const { queryAllByTestId, findByText } = renderComponent()
    const movieTitle = await findByText('Genres')
    expect(movieTitle).toBeInTheDocument()

    const li = queryAllByTestId('genres-list')

    expect(li.length).toBe(4)
  })
  it('should render cast card image', async () => {
    const { findByAltText } = renderComponent()
    const img = await findByAltText('Jason Sudeikis')
    expect(img).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w780/zaxEnovPoqzkBIs5RIxfO9wS47h.jpg'
    )
  })
  it('should render cast card title', async () => {
    const { findByText } = renderComponent()
    const cardTitle = await findByText('Jason Sudeikis')
    expect(cardTitle).toBeInTheDocument()
  })
  it('should direct to actor details page', async () => {
    const { findByTitle } = renderComponent()
    const link = await findByTitle('Jason Sudeikis')

    expect(link).toHaveAttribute('href', '/person/58224')
  })
})
