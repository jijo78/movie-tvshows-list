import React, { FC } from 'react'

import styled from 'styled-components'

type Props = {
  onClick: (e: React.MouseEvent<any>) => void
  onSubmit: () => void
}
/**
 * Card is a general purpose container for content.
 */
const Search = styled('section')`
  border-bottom: 3px solid $light-grey;
  margin-bottom: 2rem;
  display: flex;
`

/**
 * Contains an image or other media to be placed inside the card
 */
const SearchForm = styled('form')`
  width: 100%;
  position: relative;
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
  color: $light-grey;
  background-color: $black;
  width: 100%;
  padding: 0.2rem 0;
  font-size: 2rem;
  border: 0 none;
  &::placeholder {
    color: $light-grey;
  }
`

const QuickSearch: FC<Props> = ({ onSubmit, onClick }) => {
  return (
    <Search>
      <SearchForm onSubmit={onSubmit}>
        <SearchInput onClick={onClick} />
      </SearchForm>
    </Search>
  )
}

export default QuickSearch
