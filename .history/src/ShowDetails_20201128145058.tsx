import React from 'react'
import useSWR from 'swr'
import config from './config'
import { fetchData } from './utilis/fetchData'

const ShowDetails = ({ match, results }: any) => {
  console.log('match: ', match, results)
  const { data, error, isValidating } = useSWR(
     `https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US`
    fetchData
    {
      shouldRetryOnError: false,
    }
  )
  return (
    <>
      <h2>ciao</h2>
    </>
  )
}

export default ShowDetails
