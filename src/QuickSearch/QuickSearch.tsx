import React, { FC, useEffect } from 'react'

import styled from 'styled-components'

type Props = {
  handleChange: (e: React.ChangeEvent<any>) => void
  onSubmit?: (e: React.ChangeEvent<any>) => void
  placeholder?: string
  ref?: React.RefAttributes<any>
}

const Search = styled('section')`
  display: flex;
  margin-top: 1rem;
`

const SearchForm = styled('form')`
  position: relative;
  width: 100%;
  border: 1px solid #ccc;

  &fieldset {
    margin: 0;
    padding: 0;
    border: 0 none;
  }
`
const SearchLegend = styled('legend')`
  position: absolute !important;
  top: -9999px !important;
  left: -9999px !important;
`
const SearchLabel = styled('label')`
  position: absolute !important;
  top: -9999px !important;
  left: -9999px !important;
`

const SearchInput = styled('input')`
  position: relative;
  color: #ccc;
  width: 80%;
  text-align: center;
  padding: 1rem;
  font-size: 1.5rem;
  border: 0 none;
  &::placeholder {
    color: #ccc;
  }
`

const Button = styled('button')`
  width: 30%;
  height: 100%;
  border: none;
  border-color: #5c5c5c;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  padding: 1rem;
  text-align: center;
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: bold;
  background-color: #0125f6;
  color: #ffffff;
`

export const QuickSearch: FC<Props> = ({ onSubmit, handleChange, placeholder }) => {
  const inputRef = React.createRef<HTMLDivElement>()

  useEffect(() => {
    inputRef.current && inputRef.current.focus()
  })
  return (
    <Search>
      <SearchForm
        onSubmit={(e: React.ChangeEvent<any>) => {
          e.preventDefault()
          onSubmit && onSubmit(e)
        }}
      >
        <SearchLegend>Find a movie </SearchLegend>
        <SearchLabel htmlFor="search-input">Search for movie, tv show or actor</SearchLabel>
        <SearchInput
          onChange={(e: React.ChangeEvent<any>) => {
            handleChange && handleChange(e)
          }}
          placeholder={placeholder}
          name="search-input"
          id="search-input"
          className="search__input"
          type="text"
          ref={inputRef as React.RefObject<HTMLInputElement>}
        />
        <Button type="submit">Search</Button>
      </SearchForm>
    </Search>
  )
}
