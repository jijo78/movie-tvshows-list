import React from 'react'
import useSWR from 'swr'
import config from './config'
import { fetchData } from './utilis/fetchData'

const ShowDetails = ({ match, results }: any) => {
  const {
    params: { resultId },
  } = match
  console.log('match: ', match, results, resultId)
  const { data, error, isValidating } = useSWR(
    `https://api.themoviedb.org/3/movie/${resultId}/credits?api_key=${config.api}`,
    fetchData,
    {
      shouldRetryOnError: false,
    }
  )
  console.log('data: ', data)
  return (
    <>
     {data.cast.map((result) => {  return ()})

    </>
  )
}

export default ShowDetails
