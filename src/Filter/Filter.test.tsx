import React from 'react'

import { cleanup, render, fireEvent, waitFor } from '@testing-library/react'

import '@testing-library/jest-dom/extend-expect'

import { Filter } from './Filter'

let props: any

const onChangeMock = jest.fn()

describe('<Filter />', () => {
  const _LABEL = /Filter/i

  beforeEach(() => {
    props = {
      handleChange: onChangeMock,
      isValidating: true,
      fetching: true,
    }
  })

  afterEach(() => {
    cleanup
    jest.resetAllMocks()
  })
  it('should render the form', async () => {
    const { getByLabelText } = render(<Filter {...props}></Filter>)
    const form = getByLabelText(_LABEL)

    expect(form).toBeInTheDocument()
  })

  it('should call on change', async () => {
    const { getByLabelText } = render(<Filter {...props}></Filter>)
    const form = getByLabelText(_LABEL)

    fireEvent.change(form)

    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalled()
    })
  })

  it('should have aria-disabled attribute to false as default', () => {
    const { getByLabelText } = render(<Filter {...props}></Filter>)
    const form = getByLabelText(_LABEL)
    expect(form).toHaveAttribute('aria-disabled', 'false')
  })

  it('should enable aria-disabled if stop validating and fetching', () => {
    const { getByLabelText } = render(
      <Filter handleChange={onChangeMock} isValidating={false} fetching={false}></Filter>
    )
    const form = getByLabelText(_LABEL)
    expect(form).toHaveAttribute('aria-disabled', 'true')
  })
  it('should select value onChange ', async () => {
    const { getByLabelText } = render(
      <Filter handleChange={onChangeMock} isValidating={false} fetching={false}></Filter>
    )
    const form = getByLabelText(_LABEL) as HTMLInputElement
    const e = {
      target: { value: 'movie' },
    }

    fireEvent.change(form, e)
    await waitFor(() => {
      expect(form.value).toEqual('movie')
    })
  })

  it('should render all the options ', async () => {
    const { getAllByTestId } = render(
      <Filter handleChange={onChangeMock} isValidating={false} fetching={false}></Filter>
    )
    const options = getAllByTestId('select-option') as HTMLInputElement[]

    expect(options.length).toBe(4)
  })
})
