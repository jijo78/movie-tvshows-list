import React, { FC, useEffect } from 'react'
import useSWR from 'swr'
import config from '../config'
import { fetchData } from '../utilis/fetchData'
import { formatDateUK } from '../utilis/date'
import { useHistory } from 'react-router-dom'

interface Props {
  result?: Array<any>
  onClick: (e: React.ChangeEvent<any>) => void
}
export const ShowDetails: FC<Props> = ({ match, result }, onClick) => {
  const history = useHistory()

  const {
    params: { resultId },
  } = match
  console.log('match: ', match, resultId)
  console.log('result: ', result)

  const { data, error, isValidating } = useSWR(
    `https://api.themoviedb.org/3/movie/${resultId}?api_key=${config.api}&append_to_response=credits`,
    fetchData,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  )

  useEffect(() => {
    if (data) {
      history.push(`/result/${resultId}`)
      result = []
    }
  }, [])
  console.log('result: ', result)

  console.log('data: ', data)

  return (
    data && (return())
    <div>
      <h3>{data && data.title}</h3>
      <span>Release date: {formatDateUK(data && data.release_date)}</span>
      <h3>Cast</h3>
      <ul>
        {data &&
          data.credits &&
          data.credits.cast.map((data) => {
            return <li>{data.original_name}</li>
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
