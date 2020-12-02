import React, { FC, useEffect } from 'react'
import useSWR from 'swr'
import config from '../config'
import { fetchData } from '../utilis/fetchData'
import { formatDateUK } from '../utilis/date'
import { Cards, Card, CardBody } from '../Card'

import { Media100 } from '../MediaRatio'

interface Props {
  match: { params: Record<any, object> }
}
export const ShowDetails: FC<Props> = ({ match }) => {
  const {
    params: { resultId },
  } = match
  const base_url = 'https://image.tmdb.org/t/p/w780'
  const placeholder = 'http://via.placeholder.com/400x200?text=Sorry+No+Image+Available'

  const { data, error, isValidating } = useSWR(
    `https://api.themoviedb.org/3/movie/${resultId}?api_key=${config.api}&append_to_response=credits`,
    fetchData,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  )
  console.log('data: ', data)
  return (
    <div>
      <h3>{data && data.title}</h3>
      <span>Release date: {formatDateUK(data && data.release_date)}</span>
      <p>{data && data.overview}</p>
      <h4>Cast</h4>

      <Cards>
        {data &&
          data.credits &&
          data.credits.cast.map((data) => {
            return (
              <Card>
                <Media100>
                  <img
                    alt={data.original_name}
                    src={
                      data.profile_path !== null && data.profile_path !== undefined
                        ? `${base_url}${data.profile_path}`
                        : `${placeholder}`
                    }
                  />
                </Media100>
                <CardBody>
                  <h3>{data.title || data.name}</h3>
                  <p>{data.media_type}</p>
                </CardBody>
              </Card>
            )
          })}
      </Cards>
      <h3>Genres</h3>
      <Cards>>
        {data &&
          data.genres &&
          data.genres.map((data) => {
            return (
              <Card>
        
                <CardBody>
                  <h3>{data.title || data.name}</h3>
                </CardBody>
              </Card>
            )
          })}
      </Cards>>
      <p>
        Rating: {isNaN(data && data.vote_average) ? 0 : Math.ceil(data && data.vote_average * 10)}%
      </p>
      <p>Duration: {data && `${data.runtime} minutes`}</p>
    </div>
  )
}
