import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { MemoryRouter } from 'react-router-dom'

import 'whatwg-fetch'

import { SearchResults } from './SearchResults'
import { resultsList } from '../fixtures/results-mock-resp'
const onClickMock = jest.fn()

const renderComponent = () =>
  render(
    <MemoryRouter initialEntries={['/movie/result:id']}>
      <SearchResults results={resultsList} handleClick={onClickMock}></SearchResults>
    </MemoryRouter>
  )
describe('<SearchResults />', () => {
  afterEach(cleanup)
  it('should render the page', async () => {
    const { findByText } = renderComponent()
    const component = await findByText('Search Results')
    expect(component).toBeInTheDocument()
  })
  it('should render movie title', async () => {
    const { findByText } = renderComponent()
    const component = await findByText('Emily & Tim')
    expect(component).toBeInTheDocument()
  })
  it('should render movie card image', async () => {
    const { findByAltText } = renderComponent()
    const img = await findByAltText('Emily & Tim')
    expect(img).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w780/t37Xa74GFO1R3kebocqSV4hFrPO.jpg'
    )
  })
  it('should render media type', async () => {
    const { findByText } = renderComponent()
    const type = await findByText('movie')
    expect(type).toBeInTheDocument()
  })

  it('should render a list of results ', async () => {
    const { queryAllByTestId, findByText } = renderComponent()
    const movieTitle = await findByText('Emily & Tim')
    expect(movieTitle).toBeInTheDocument()

    const li = queryAllByTestId('result-list')

    expect(li.length).toBe(3)
  })

  it('should direct to movie details page if type is movie', async () => {
    const { findByTitle } = renderComponent()
    const link = await findByTitle('movie')

    expect(link).toHaveAttribute('href', '/result/244117')
  })

  it('should direct to person details page if type is person', async () => {
    const { findByTitle } = renderComponent()
    const link = await findByTitle('person')

    expect(link).toHaveAttribute('href', '/person/244117')
  })
  it('should call onClick event', async () => {
    const { findByTitle } = renderComponent()
    const link = await findByTitle('person')

    fireEvent.click(link)
    expect(onClickMock).toHaveBeenCalled()
  })
})
