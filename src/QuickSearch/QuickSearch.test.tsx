import React from 'react'

import { cleanup, render, fireEvent, waitFor } from '@testing-library/react'

import '@testing-library/jest-dom/extend-expect'

import { QuickSearch } from './QuickSearch'

let props: any

const onChangeMock = jest.fn()
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
    jest.resetAllMocks()
  })
  it('should render the form', async () => {
    const { getByLabelText } = render(<QuickSearch {...props}></QuickSearch>)
    const form = getByLabelText(_LABEL)

    expect(form).toBeInTheDocument()
  })
  it('should call onSubmit', async () => {
    const { getByLabelText } = render(<QuickSearch {...props}></QuickSearch>)
    const form = getByLabelText(_LABEL)

    fireEvent.submit(form)

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalled()
    })
  })

  //Tried to test the on enter event but react testing library seems to have an
  //issue with firing key event as discussed bby the same library author
  // https://github.com/testing-library/dom-testing-library/issues/405,
  //https://github.com/testing-library/react-testing-library/issues/269
  it.skip('should call submit on pressing enter key', async () => {
    const { getByText } = render(<QuickSearch {...props}></QuickSearch>)

    const input = getByText('Search')
    fireEvent.keyDown(input, { key: 'Enter', code: 13, charCode: 13 })

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalled()
    })
  })
  it('should call onChange value is equal or more than 5 char', async () => {
    const { getByPlaceholderText } = render(
      <QuickSearch {...props} placeholder="search-form"></QuickSearch>
    )

    const input = getByPlaceholderText('search-form')

    const e = {
      target: { value: 'movie' },
    }

    fireEvent.change(input, e)
    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalled()
    })
  })
  it('should  not call on change if not value', async () => {
    const { getByPlaceholderText } = render(
      <QuickSearch {...props} placeholder="search-form"></QuickSearch>
    )

    const input = getByPlaceholderText('search-form')

    const e = {
      target: { value: '' },
    }

    fireEvent.change(input, e)
    await waitFor(() => {
      expect(onChangeMock).not.toHaveBeenCalled()
    })
  })
})
