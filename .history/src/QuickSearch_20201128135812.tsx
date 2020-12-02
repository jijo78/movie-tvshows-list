import React, { FC, useEffect } from 'react'

import styled from 'styled-components'

type Props = {
  onClick?: (e: React.MouseEvent<any>) => void
  handleChange: (e: React.ChangeEvent<any>) => void
  onSubmit?: (e: React.ChangeEvent<any>) => void
  placeholder?: string
  ref?: React.RefAttributes<any>
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
  position: relative;
  color: #ccc;
  width: 100%;
  text-align: center;
  padding: 1rem;
  font-size: 2rem;
  border: 0 none;
  &::placeholder {
    color: #ccc;
  }
`

const Button = styled('button')`
  width: 30%;
  height:100%
  border: none;
  border-color: #5c5c5c;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  display: inline-flex;
  color: #ffffff;
  padding: 1rem;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  justify-content: center;
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: bold;
  background-color: #79d6f2;
  color: #091f29;
`

const QuickSearch: FC<Props> = ({ onSubmit, handleChange, placeholder }) => {
  const inputRef = React.createRef<HTMLDivElement>()

  useEffect(() => {
    inputRef.current && inputRef.current.focus()
  }, [])
  console.log('inputRef: ')
  return (
    <Search>
      <SearchForm
        onSubmit={(e: React.ChangeEvent<any>) => {
          e.preventDefault()
          onSubmit && onSubmit(e)
        }}
      >
        <SearchLegend>Find a movie </SearchLegend>
        <SearchInput
          onChange={(e: React.ChangeEvent<any>) => {
            handleChange && handleChange(e)
          }}
          placeholder={placeholder}
          className="search__input"
          type="text"
          ref={inputRef as React.RefObject<HTMLInputElement>}
        />
        <Button type="submit">Search</Button>
      </SearchForm>
    </Search>
  )
}

export default QuickSearch
