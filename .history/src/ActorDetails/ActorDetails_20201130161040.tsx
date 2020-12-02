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
      <p>Birthday: {formatDateUK(data && data.birthday)}</p>
      <p>Biography: {data && data.biography}</p>

      <h3>Movies</h3>
      <ul>
        {data &&
          data.movie_credits &&
          data.movie_credits.cast.map((data) => {
            return (
              <li>
                {data.title} <p>Character: {data.character}</p>
              </li>
            )
          })}
      </ul>
      <h3>Tv shows</h3>
      <ul>
        {data &&
          data.tv_credits &&
          data.tv_credits.cast.map((data) => {
            return (
              <li>
                {data.name} <p>Character: {data.character}</p>
              </li>
            )
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
