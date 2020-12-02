import React, { FC, useEffect } from 'react'
import useSWR from 'swr'
import config from '../config'
import { fetchData } from '../utilis/fetchData'
import { formatDateUK } from '../utilis/date'

interface Props {
  match: { params: Record<any, object> }
}
export const ActorDetails: FC<Props> = ({ match }) => {
  const {
    params: { resultId },
  } = match

  const { data, error, isValidating } = useSWR(
    `https://api.themoviedb.org/3/person/${resultId}?api_key=${config.api}&append_to_response=movie_credits,tv_credits`,
    fetchData,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  )
  console.log('data: ', data)

  return (
    <div>
      <h3>{data && data.name}</h3>
      <span>Birthday: {formatDateUK(data && data.birthday)}</span>
      <h3>Cast</h3>
      <ul>
        {data &&
          data.movie_credits &&
          data.movie_credits.cast.map((data) => {
            return (
              <li>
                {data.title}
                <span>Character:{data.character}</span>
              </li>
            )
          })}
      </ul>
      <h3>Genres</h3>
      <ul>
        {data &&
          data.genres &&
          data.genres.map((data) => {
            return <li>{data.name}</li>
          })}
      </ul>
      <p>{data && data.overview}</p>
      <p>
        Rating: {isNaN(data && data.vote_average) ? 0 : Math.ceil(data && data.vote_average * 10)}%
      </p>
      <p>Duration: {data && `${data.runtime} minutes`}</p>
    </div>
  )
}
