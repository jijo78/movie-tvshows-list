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
  max-width: 80rem;
`
const Cards = styled('section')`
  display: grid;
  width: 80rem;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-gap: 10px;
`

const Card = styled('section')`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: dodgerblue;
  color: white;
  min-height: 10rem;
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
  console.log('data: ', data)

  useEffect(() => {
    if (data) {
      setShouldFetch(false)
    }
  }, [])

  return (
    <Container as="section" {...rest}>
      <QuickSearch />
      <SearchResults results={data.results} />
    </Container>
  )
}

export default StickyWrapper
