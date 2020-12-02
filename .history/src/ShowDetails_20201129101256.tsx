import React, { FC } from 'react'
import useSWR from 'swr'
import config from './config'
import { fetchData } from './utilis/fetchData'
import { formatDateUK } from './date'

interface Props {
  data: { cast: Array<any> }
}
const ShowDetails: FC<Props> = ({ match, result }: any) => {
  const {
    params: { resultId },
  } = match
  console.log('match: ', match, resultId)
  const { data, error, isValidating } = useSWR(
    `https://api.themoviedb.org/3/movie/${resultId}?api_key=${config.api}&append_to_response=credits`,
    fetchData,
    {
      shouldRetryOnError: false,
    }
  )
  console.log('data: ', typeof data)
  {data && data!==undefined && 

  return (
    <div>
    {results &&
      results.results &&
      results.results.map((result) => {
        return (      <span>Rating: {isNaN(data.vote_average) ? 0 : Math.ceil(data.vote_average * 10)}%</span>
        data.credits.map((data) => {})
        <span>Release date: {formatDateUK(data.release_date)}</span>
        <span>{data.media_type}</span>)})
    
      {/* <p>{data.name}</p>{' '} */}

    </div>
  
}

export default ShowDetails
