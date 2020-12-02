import React, { FC } from 'react'
import styled from 'styled-components'
import useSWR from 'swr'

import config from '../config'

import { ActorDetails } from '../ActorDetails'

import { fetchData } from '../utilis/fetchData'
import { formatDateUKYear } from '../utilis/date'
import { Cards, Card, CardBody } from '../Card'
import { Media100 } from '../MediaRatio'
import { Link, Route } from 'react-router-dom'

const SearchLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`

interface Props {
  match?: any
  result?: Array<any>
}
export const TvDetails: FC<Props> = ({ match, result }) => {
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
  console.log('data: ', data)
  const base_url = 'https://image.tmdb.org/t/p/w780'
  const placeholder = 'http://via.placeholder.com/400x200?text=Sorry+No+Image+Available'
  const castLength = data && data.credits && data.credits.cast.length
  return (
    <section>
      <div>
        <h3>{data && data.original_name}</h3>
        <span>{formatDateUKYear(data && data.release_date)}</span>
        <p>{data && data.overview}</p>
        <p>
          Rating: {isNaN(data && data.vote_average) ? 0 : Math.ceil(data && data.vote_average * 10)}
          %
        </p>
        <p>{data && data.in_production ? 'Series available' : 'Series ended'}</p>
        {data &&
          data.created_by &&
          data.created_by.slice(0, 3).map((data) => {
            return <span></span>
          })}
      </div>
      <h3>Cast</h3>
      <Cards>
        {data &&
          data.credits &&
          data.credits.cast.slice(0, 3).map((data) => {
            return (
              <Card>
                <SearchLink to={`/person/${data.id}`}>
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
                  </CardBody>
                </SearchLink>
              </Card>
            )
          })}
        <p>{castLength > 3 ? 'and many more' : ''}</p>
      </Cards>
      <div>
        <h3>Genres</h3>
        <Cards>
          {data &&
            data.genres &&
            data.genres.map((data) => {
              return (
                <Card bgColor="#ff2002">
                  <CardBody>
                    <h3>{data.title || data.name}</h3>
                  </CardBody>
                </Card>
              )
            })}
        </Cards>
      </div>
      <Route path="/person/:resultId" component={ActorDetails} />
    </section>
  )
}
