import React from 'react'
import useSWR from 'swr'
import config from './config'
import { fetchData } from './utilis/fetchData'

const ShowDetails = ({ match, results }: any) => {
  console.log('match: ', match, results)
  const { data, error, isValidating } = useSWR(
      
     `https://api.themoviedb.org/3/movie/${config.api}?api_key=${config.api}&language=en-US`,
    fetchData
    {
      shouldRetryOnError: false,
    }
  )
  console.log('data: ', data);
  return (
    <>
      <h2>ciao</h2>
    </>
  )
}

export default ShowDetails
