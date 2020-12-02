import React, { FC, useState } from 'react'
import useSWR from 'swr'
import config from '../config'
import { QuickSearch } from '../QuickSearch'
import { SearchResults } from '../SearchResults'
import { Error } from '../Error'

import { fetchData } from '../utilis/fetchData'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

interface Props {
  children: React.ReactChildren
}

const Container = styled('section')`
  display: flex;
  justify-content: center;
`

export const Search: FC<Props> = () => {
  const [shouldFetch, setShouldFetch] = useState(false)
  const [term, setTerm] = useState('')
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
    term === '' && setTerm('') history.push('/')
    if (term.length >= 5) {
      setTerm(term)
      setShouldFetch(true)
      history.push('/')
    }

    return false
  }
  const handleSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault()
    const value = document.getElementsByTagName('input')[0].value
    setShouldFetch(true)
    history.push('/')

    setTerm(value)
  }

  return (
    <>
      <QuickSearch
        placeholder="Search a movie..."
        onSubmit={handleSubmit}
        handleChange={handleChange}
      />
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
