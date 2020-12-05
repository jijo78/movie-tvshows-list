import React from 'react'

import { cleanup, render, fireEvent, waitFor } from '@testing-library/react'

import '@testing-library/jest-dom/extend-expect'

import { QuickSearch } from './QuickSearch'

const SelectOptionsMock = [
  {
    id: 'Volvo',
    title: 'Volvo',
    path: 'volvo',
  },
  {
    id: 'Saab',
    title: 'Saab',
    path: 'saab',
  },
  {
    id: 'Fiat',
    title: 'Fiat',
    path: 'fiat',
  },
  {
    id: 'Audi',
    title: 'Audi',
    path: 'audi',
  },
]

let props: any

const onChangeMock = jest.fn()
const onChangeModelMock = jest.fn()
const onSubmitMock = jest.fn()

describe('<QuickSearch />', () => {
  const _LABEL = /Search for movie, tv show or actor/i

  beforeEach(() => {
    props = {
      handleChange: onChangeMock,
      onSubmit: onSubmitMock,
    }
  })

  afterEach(() => {
    cleanup
  })
  it('should call onSubmit', async () => {
    const { getByLabelText } = render(<QuickSearch {...props}></QuickSearch>)
    const form = getByLabelText(_LABEL) as HTMLSelectElement

    fireEvent.submit(form)

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalled()
    })
  })

  it('should should show an error and keep aria-disabled attribute to false if an error', () => {
    const { getByLabelText } = render(<QuickSearch {...props}></QuickSearch>)

    const form = getByLabelText(_LABEL) as HTMLSelectElement

    expect(form).toHaveAttribute('aria-disabled', 'true')
  })

  it('should enable Select Model dropdown if not error, call onChangeModel and add data-url attribute', () => {
    const { getByLabelText, container } = render(
      <QuickSearch
        {...props}
        data={{ data: [{ attributes: { name: 'Name', url: '/some/url' } }] }}
        error=""
      ></QuickSearch>
    )

    expect(SelectModels).toHaveAttribute('aria-disabled', 'false')

    fireEvent.change(SelectModels)

    const url = container.querySelector('[data-url="/some/url"]')

    expect(url).toBeInTheDocument()
    expect(onChangeModelMock).toHaveBeenCalled()
  })
  it('should call onSubmit', async () => {
    const { getByLabelText } = render(<QuickSearch {...props}></QuickSearch>)
    const form = getByLabelText(_LABEL) as HTMLSelectElement
    fireEvent.submit(form)

    await waitFor(() => {
      expect(form).toHaveTextContent('Loading...')
      expect(onSubmitMock).toHaveBeenCalled()
    })
  })
})
