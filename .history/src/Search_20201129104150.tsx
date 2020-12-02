import React, { FC, useEffect, useState } from 'react'
import useSWR from 'swr'
import config from './config'
import QuickSearch from './QuickSearch'
import SearchResults from './SearchResults'
import { fetchData } from './utilis/fetchData'
import styled from 'styled-components'
import { Route, Redirect, useHistory } from 'react-router-dom'

interface Props {
  children: React.ReactChildren
}

const Container = styled('section')`
  display: flex;
  justify-content: center;
`

const Search: FC<Props> = () => {
  const [shouldFetch, setShouldFetch] = useState(false)
  const [term, setTerm] = useState('')
  const [append, setAppend] = useState('credits')
  const history = useHistory()

  const { data, error, isValidating } = useSWR(
    shouldFetch
      ? `https://api.themoviedb.org/3/search/multi?&api_key=${config.api}&query=${term}&include_adult=false&append_to_response=${append}`
      : null,
    fetchData,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  )

  const handleChange = (e: React.ChangeEvent<any>): boolean => {
    const term = e.target.value
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

    if (data) {
      setShouldFetch(false)
    }
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
        {isValidating ? 'Loading...' : <SearchResults results={data} />}
      </Container>
    </>
  )
}

export default Search
