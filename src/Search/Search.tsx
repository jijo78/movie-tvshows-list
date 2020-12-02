import React, { FC, useState, useEffect } from 'react'

import styled from 'styled-components'

import useSWR from 'swr'
import config from '../config'
import { QuickSearch } from '../QuickSearch'
import { SearchResults } from '../SearchResults'
import { Error } from '../Error'

import { fetchData } from '../utilis/fetchData'
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
  fetchedData = data && data.results

  if (error) {
    return <Error>Something went wrong</Error>
  }
  console.log('payload: ', payload)

  const handleChange = (e: React.ChangeEvent<any>): boolean => {
    const term = e.target.value
    if (term === '') {
      setTerm('')
      setShouldFetch(false)
      setPayload([])

      history.push('/')
    }
    if (term.length >= 5) {
      const dataResults = data && data.results

      setTerm(term)
      setShouldFetch(true)

      setPayload(dataResults)

      history.push('/')
    }

    return false
  }

  const handleSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault()
    setShouldFetch(true)

    const value = document.getElementsByTagName('input')[0].value
    const dataResults = data && data.results
    setPayload(dataResults)

    history.push('/')

    setTerm(value)
  }

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

  console.log('payload: ', payload)
  return (
    <>
      <h1> Movie search </h1>
      <QuickSearch
        placeholder="Search a programme..."
        onSubmit={handleSubmit}
        handleChange={handleChange}
      />
      <form>
        <select
          placeholder="Select a model"
          className="selectDark"
          name="SelectModel"
          aria-disabled={isValidating || data ? false : true}
          disabled={isValidating || data ? false : true}
          onChange={(e: React.ChangeEvent<any>) => {
            const dataFiltered = fetchedData.filter((r) => {
              return r.media_type === e.target.value
            })
            setPayload(dataFiltered)

            if (e.target.value === '') {
              const dataResults = data && data.results
              setPayload(dataResults)
            }
          }}
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
        </select>
      </form>
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
      </Container>
    </>
  )
}
