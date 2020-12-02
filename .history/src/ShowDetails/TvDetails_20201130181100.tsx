import React, { FC, useEffect } from 'react'
import useSWR from 'swr'
import config from '../config'
import { fetchData } from '../utilis/fetchData'
import { formatDateUK } from '../utilis/date'
import { useHistory } from 'react-router-dom'
import { Cards, Card, CardBody } from '../Card'
import { Media16x9, Media100 } from '../MediaRatio'

interface Props {
  match?: any
  result?: Array<any>
}
export const TvDetails: FC<Props> = ({ match, result }) => {
  const history = useHistory()

  const {
    params: { resultId },
  } = match

  const { data, error, isValidating } = useSWR(
    `https://api.themoviedb.org/3/tv/${resultId}?api_key=${config.api}&append_to_response=credits`,
    fetchData,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  )
  const base_url = 'https://image.tmdb.org/t/p/w780'
  const placeholder = 'http://via.placeholder.com/400x200?text=Sorry+No+Image+Available'
  return (
    <section>
      <Media16x9>
        <img
          alt=""
          src={
            data && data.poster_path !== null ? `${base_url}${data.poster_path}` : `${placeholder}`
          }
        />
      </Media16x9>
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
    </section>
  )
}
