import React, { FC, useEffect, useState } from 'react'
import useSWR from 'swr'
import config from './config'
import QuickSearch from './QuickSearch'
import SearchResults from './SearchResults'

import styled from 'styled-components'
// import classNames from 'classnames'
// import debounce from 'lodash/debounce'
export const fontRootSize = 16

const pxToRem = (size: number) => `${size / fontRootSize}rem`
export const SCREEN_WIDTH_MIN = pxToRem(320)

export const SCREEN_WIDTH_MIN_2 = pxToRem(400)
interface Props {
  children: React.ReactChildren
}
const Container = styled('section')`
  display: flex;
  justify-content: center;
`

const getData = (url: string): Promise<any> => fetch(url).then((res) => res.json())

const App: FC<Props> = () => {
  const [shouldFetch, setShouldFetch] = useState(false)
  const [term, setTerm] = useState('')
  const [append, setAppend] = useState('credits')

  const { data, error, isValidating } = useSWR(
    shouldFetch
      ? `https://api.themoviedb.org/3/search/multi?&api_key=${config.api}&query=${term}&include_adult=false&append_to_response=${append}`
      : null,
    getData,
    {
      shouldRetryOnError: false,
    }
  )
  const { data: projects } = useSWR(
    () =>
      shouldFetch
        ? `https://api.themoviedb.org/3/movie/634244/credits?api_key==${config.api}&language=en-US`
        : null,
    getData,
    {
      shouldRetryOnError: false,
    }
  )
  console.log('projects: ', projects)
  const handleChange = (e: React.ChangeEvent<any>): boolean => {
    const term = e.target.value
    if (term.length >= 5) {
      setTerm(term)
      setShouldFetch(true)
    }
    if (data) {
      setShouldFetch(false)
    }
    return false
  }
  const handleSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault()
    const value = document.getElementsByTagName('input')[0].value
    setShouldFetch(true)

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
        {isValidating ? 'loading' : <SearchResults results={data} />}
      </Container>
    </>
  )
}

export default App
