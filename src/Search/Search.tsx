import React, { FC, useState, useEffect } from 'react'

import styled from 'styled-components'

import useSWR from 'swr'
import config from '../config'
import { QuickSearch } from '../QuickSearch'
import { SearchResults } from '../SearchResults'
import { Error } from '../Error'
import { Filter } from '../Filter'

import { fetchData } from '../utilis/fetchData'
import { useHistory } from 'react-router-dom'

interface Props {
  children?: React.ReactChildren
}

const Container = styled('section')`
  position: relative;
`

const Main = styled('main')`
  margin: 0 auto;
  max-width: 90rem;
  padding: 1rem;
  box-sizing: border-box;
`
export const Search: FC<Props> = () => {
  const [shouldFetch, setShouldFetch] = useState(false)
  const [term, setTerm] = useState('')
  const [validating, setIsValidating] = useState(false)

  const [payload, setPayload] = useState([]) as Array<any>
  let fetchedData

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

  // Saving data in array to pass it to the filter component, and not manipulate the data array
  fetchedData = data && data.results

  const dataResults = data && data.results

  if (data && data.errors) {
    setIsValidating(isValidating)
    setShouldFetch(false)
  }
  if (error) {
    return <Error>Something went wrong</Error>
  }

  const handleChange = (e: React.ChangeEvent<any>): boolean => {
    const term = e.target.value

    if (term === '') {
      setTerm('')
      setPayload([])
      setIsValidating(isValidating)
      setShouldFetch(false)
    }
    if (term.length >= 5) {
      setTerm(term)
      setShouldFetch(true)

      setPayload(dataResults)
      history.push('/')
    }

    return false
  }

  const handleSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault()

    const value = document.getElementsByTagName('input')[0].value
    setPayload(dataResults)

    history.push('/')

    setTerm(value)
    if (data && data.errors) {
      setTerm('')
    }
    setShouldFetch(true)
  }

  const filterChange = (e: React.ChangeEvent<any>) => {
    const dataFiltered = fetchedData.filter((r) => {
      return r.media_type === e.target.value
    })
    setPayload(dataFiltered)

    if (e.target.value === '') {
      setPayload(dataResults)
    }
  }

  return (
    <Main>
      <h1>Movie search</h1>
      <QuickSearch
        placeholder="Search a programme..."
        onSubmit={handleSubmit}
        handleChange={handleChange}
      />
      <Filter handleChange={filterChange} isValidating={validating} fetching={shouldFetch} />

      <Container as="section">
        {isValidating ? (
          'Loading...'
        ) : (
          <SearchResults
            results={payload || (data && data.results)}
            handleClick={() => {
              setTerm('')
              setPayload([])
            }}
          />
        )}
        <p>{dataResults && dataResults.length === 0 ? '0 matches found' : ''}</p>
      </Container>
    </Main>
  )
}
