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

const StickyWrapper: FC<Props> = ({ children, ...rest }) => {
  const [shouldFetch, setShouldFetch] = useState(true)
  const [term, setTerm] = useState('a')
  const [append, setAppend] = useState('credits')

  const { data, error, isValidating } = useSWR(
    shouldFetch
      ? `https://api.themoviedb.org/3/search/multi?&api_key=${config.api}&query=${term}&include_adult=false&append_to_response=${append}`
      : null,
    getData,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  )
  const handleChange = (e: React.ChangeEvent<any>): void => {
    const term = e.target.value
    setTerm(term)
    // SelectCarManufacturer !== '' ? setShouldFetch(true) : setShouldFetch(false)
  }
  useEffect(() => {
    if (data) {
      setShouldFetch(false)
    }
  }, [])

  return (
    <>
      <QuickSearch placeholder="Search a movie..." onChange={handleChange} />
      <Container as="section">
        <SearchResults results={data} />
      </Container>
    </>
  )
}

export default StickyWrapper
