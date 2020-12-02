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
  border: 3px solid #ccc;
  margin-bottom: 2rem;
  display: flex;

  width: 100%;
`

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
  width: 100%;
  text-align: center;
  padding: 0.2rem 0;
  font-size: 2rem;
  border: 0 none;
  &::placeholder {
    color: #ccc;
  }
`

const Button = styled('button')`
  width: 100%;
  border: none;
  border-color: #5c5c5c;
  cursor: pointer;
  position: absolute;
  right: 0;
  display: inline-flex;
  color: #ffffff;
  background-color: rgb(13, 46, 61);
  padding: 0.75rem;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;

  justify-content: center;
  text-transform: uppercase;

  font-size: 1rem;
  line-height: 1.25;

  letter-spacing: normal;
  font-weight: bold;
  background-color: #79d6f2;
  color: #091f29;
`

const QuickSearch: FC<Props> = ({ onSubmit, onClick, placeholder }) => {
  return (
    <Search>
      <SearchForm onSubmit={onSubmit}>
        <SearchLegend>Find a movie </SearchLegend>
        <SearchInput onClick={onClick} placeholder={placeholder} />
        <Button type="submit">Search</Button>
      </SearchForm>
    </Search>
  )
}

export default QuickSearch
