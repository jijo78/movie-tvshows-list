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
  return (
    <>
      {data &&
       
          return (
            <>
              <p>{actor.name}</p>{' '}
              <span>
                Rating: {isNaN(actor.vote_average) ? 0 : Math.ceil(actor.vote_average * 10)}%
              </span>
              {data.credits.map((actor) => {})
              <span>Release date: {formatDateUK(actor.release_date)}</span>
              <span>{actor.media_type}</span>
            </>
          )
        })}
    </>
  )
}

export default ShowDetails
