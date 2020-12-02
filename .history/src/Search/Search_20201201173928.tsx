import React, { FC, useState, useEffect } from 'react'
import useSWR from 'swr'
import config from '../config'
import { QuickSearch } from '../QuickSearch'
import { SearchResults } from '../SearchResults'
import { Error } from '../Error'

import { debounce } from '../utilis/debounce'

import { fetchData } from '../utilis/fetchData'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

interface Props {
  children?: React.ReactChildren
}

const Container = styled('section')`
  display: flex;
  justify-content: center;
`

export const Search: FC<Props> = () => {
  const [shouldFetch, setShouldFetch] = useState(false)
  const [term, setTerm] = useState('')
  const [payload, setPayload] = useState()

  const history = useHistory()

  const { data, error, isValidating } = useSWR(
    shouldFetch
      ? `https://api.themoviedb.org/3/search/multi?&api_key=${config.api}&query=${term}&include_adult=false`
      : null,
    fetchData,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  )

  if (error) {
    return <Error>Something went wrong</Error>
  }

  const handleChange = (e: React.ChangeEvent<any>): boolean => {
    const term = e.target.value
    term === '' && setTerm('') && history.push('/')
    if (term.length >= 5) {
      setTerm(term)
      if (data !== undefined) {
        setPayload(data)
      }
      setShouldFetch(true)
      history.push('/')
    }

    return false
  }
  const handleSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault()
    const value = document.getElementsByTagName('input')[0].value
    setShouldFetch(true)
    if (data !== undefined) {
      setPayload(data)
    }
    history.push('/')

    setTerm(value)
  }

  return (
    <>
      <QuickSearch
        placeholder="Search a programme..."
        onSubmit={handleSubmit}
        handleChange={handleChange}
      />
      <form>
        <div>
          <label htmlFor="filterTv">Filter by tv shows</label>
          <input type="radio" id="filterTv" name="filter" aria-label="primary radio" />
        </div>
        <div>
          <label htmlFor="filterMovie">Filter by movie</label>
          <input type="radio" id="filterMovie" name="filter" aria-label="primary radio" />
        </div>
        <div>
          <label htmlFor="filterActor">Filter by actors</label>
          <input type="radio" id="filterActor" name="filter" aria-label="primary radio" />
        </div>
      </form>
      <Container as="section">
        {isValidating ? (
          'Loading...'
        ) : (
          <SearchResults
            results={data}
            handleClick={() => {
              setTerm('')
            }}
          />
        )}
      </Container>
    </>
  )
}
