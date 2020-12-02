import React, { FC, useEffect, useState } from 'react'
import useSWR from 'swr'

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


const StickyWrapper: FC<Props> = ({ children, ...rest }) => {
  const [shouldFetch, setShouldFetch] = useState(Boolean)
  const { data, error, isValidating } = useSWR(
    shouldFetch
      ? `/api/search/CarReviews?filter[make]=${initialValues.SelectCarManufacturer}&fields[CarReviews]=name,url`
      : null,
    getData,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false
    }
  )
  const fetchData = 	(term = '', append='credits' ){
		//set fetch to true to show the loader before request it is completed.
	
		
		fetch(`https://api.themoviedb.org/3/search/multi?&api_key=${config.api}&query=${term}&include_adult=false&append_to_response=${append}`)
		.then(response => response.json())
		.then(response => (
			console.log(response),
			this.setState({ 
				data: response.results,
				fetching: false
			})			
		)).catch(error => {
			this.setState({
				error : error.message,
				fetching: false
			});
		});
	}

  // useEffect(() => {
  //   // const handleResizeFn = debounce(handleScroll, 10, { leading: true, trailing: false })
  //   window.addEventListener('scroll', handleResizeFn)

  //   return () => {
  //     window.removeEventListener('scroll', handleResizeFn)
  //   }
  // }, [])

  return (
    <Container
      as="section"
      {...rest}
    >
      {children}
    </Container>
  )
}

export default StickyWrapper
