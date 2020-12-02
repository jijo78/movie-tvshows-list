import React, { FC } from 'react'

import styled from 'styled-components'

type Props = {
  onClick?: (e: React.MouseEvent<any>) => void
  onSubmit?: () => void
  placeholder?: string
}
/**
 * Card is a general purpose container for content.
 */
const Search = styled('section')`
  border-bottom: 3px solid #ccc;
  margin-bottom: 2rem;
  display: flex;

  width: 100%;
`

/**
 * Contains an image or other media to be placed inside the card
 */
const SearchForm = styled('form')`
  position: relative;
  width: 100%;
  &fieldset {
    margin: 0;
    padding: 0;
    border: 0 none;
  }
  &.search__form--hidden {
    display: none;
  }
`
const SearchLegend = styled('legend')`
  display: none;
`

const SearchInput = styled('input')`
  color: #ccc;

  padding: 0.2rem 0;
  font-size: 2rem;
  border: 0 none;
  &::placeholder {
    color: #ccc;
  }
`

const QuickSearch: FC<Props> = ({ onSubmit, onClick, placeholder }) => {
  return (
    <Search>
      <SearchForm onSubmit={onSubmit}>
        <SearchInput onClick={onClick} placeholder={placeholder} />
      </SearchForm>
    </Search>
  )
}

export default QuickSearch
