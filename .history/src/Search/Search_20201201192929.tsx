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
  const [payload, setPayload] = useState(Array) as Array<any>

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
  if (data) {
    const dat = data && data.results
    setPayload(dat)
    setShouldFetch(false)
  }
  if (error) {
    return <Error>Something went wrong</Error>
  }
  console.log('payload: ', payload)
  const handleChange = (e: React.ChangeEvent<any>): boolean => {
    const term = e.target.value
    term === '' && setTerm('') && history.push('/')
    if (term.length >= 5) {
      setTerm(term)
      const dat = payload && payload.results

      setPayload((prevState) => ({
        ...prevState,
        payload: dat,
      }))

      history.push('/')
    }

    return false
  }
  const handleSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault()
    const value = document.getElementsByTagName('input')[0].value
    setShouldFetch(true)
    const dat = payload && payload.results

    setPayload(dat)
    setPayload((prevState) => ({
      ...prevState,
      dat,
    }))
    history.push('/')

    setTerm(value)
  }
  const filters = [
    {
      label: 'filter by Tv',
      key: 'tv',
    },
    {
      label: 'filter by Movie',
      key: 'movie',
    },
  ]
  return (
    <>
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
          aria-disabled={payload && !error ? false : true}
          disabled={payload && !error ? false : true}
          onChange={(e: React.ChangeEvent<any>) => {
            console.log(e)
            const dataFiltered = payload.filter((r) => r.media_type === e.target.value)
            setPayload((prevState) => ({
              ...prevState,
              dataFiltered,
            }))
          }}
        >
          <option value="">Filter y</option>
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
            results={payload}
            handleClick={() => {
              setTerm('')
            }}
          />
        )}
      </Container>
    </>
  )
}
