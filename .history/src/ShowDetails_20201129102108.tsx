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
  console.log('data: ', data)

  return (
    <>
      <span>Release date: {formatDateUK(data && data.release_date)}</span>
      <ul>
        {data &&
          data.credits.cast.map((data) => {
            return <li>{data.original_name}</li>
          })}
      </ul>
      <p>{data && data.overview}</p>
    </>
  )
}

export default ShowDetails
{
  /* <span>Rating: {isNaN(data.vote_average) ? 0 : Math.ceil(data.vote_average * 10)}%</span>
data.credits.map((data) => {})
<span>Release date: {formatDateUK(data.release_date)}</span>
<span>{data.media_type}</span> */
}
