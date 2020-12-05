import React, { FC, useEffect } from 'react'
import styled from 'styled-components'

type Props = {
  handleChange: (e: React.ChangeEvent<any>) => void
  isValidating: boolean
  fetching: boolean
}

const Search = styled('section')`
  margin: 0 auto;
  display: flex;
  margin-top: 1rem;
  width: 80%;
`

const SearchForm = styled('form')`
  position: relative;
`
const SearchLegend = styled('legend')`
  display: none;
`
const SearchLabel = styled('label')`
  display: none;
`

const Select = styled('select')`
  border: none;
  border-bottom: 1px solid #ccc;
  padding: 0.75rem;
  width: 30rem;
  font-size: 1.3rem;
  margin: 1.5rem 0;
  &::placeholder {
    color: #ccc;
  }
`
const filters = [
  {
    label: 'Show by Tv',
    key: 'tv',
  },
  {
    label: 'Show by Movie',
    key: 'movie',
  },
  {
    label: 'Show by Actor',
    key: 'person',
  },
  {
    label: 'Show All',
    key: '',
  },
]
export const Filter: FC<Props> = ({ handleChange, isValidating, fetching }) => {
  return (
    <Search>
      <SearchForm>
        <SearchLegend>Filter </SearchLegend>
        <SearchLabel htmlFor="filter-by">Filter</SearchLabel>
        <Select
          onChange={(e: React.ChangeEvent<any>) => {
            handleChange && handleChange(e)
          }}
          aria-disabled={isValidating || fetching ? false : true}
          disabled={isValidating || fetching ? false : true}
          name="filter-by"
          id="filter-by"
          className="search__input"
        >
          <option value="">Filter by</option>
          {filters.map((item, idx) => {
            const { label, key } = item
            return (
              <option value={key} key={idx}>
                {label}
              </option>
            )
          })}
        </Select>
      </SearchForm>
    </Search>
  )
}
