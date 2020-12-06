import React, { FC } from 'react'
import styled from 'styled-components'
import useSWR from 'swr'

import config from '../config'

import { ActorDetails } from '../ActorDetails'

import { fetchData } from '../utilis/fetchData'
import { formatDateUKYear } from '../utilis/date'
import { Cards, Card, CardBody } from '../Card'
import { Error } from '../Error'

import { Media100 } from '../MediaRatio'
import { Link, Route } from 'react-router-dom'

const SearchLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`
const InnerLogo = styled('span')`
  display: inline-block;
  padding: 0.8rem;
  font-weight: 900;
`
interface Props {
  match: { params: { resultId: string } }
}
export const TvDetails: FC<Props> = ({ match }) => {
  const {
    params: { resultId },
  } = match

  let tvDetails
  const { data, error, isValidating } = useSWR(
    `https://api.themoviedb.org/3/tv/${resultId}?api_key=${config.api}&append_to_response=credits`,
    fetchData,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  )
  if (error) {
    return <Error>Something went wrong</Error>
  }
  if (isValidating) {
    return <p>Loading...</p>
  }
  if (data) {
    const base_url = 'https://image.tmdb.org/t/p/w780'
    const placeholder = 'http://via.placeholder.com/400x200?text=Sorry+No+Image+Available'
    const castLength = data.credits && data.credits.cast.length
    tvDetails = (
      <>
        <section>
          <h2>Tv shows</h2>

          <div>
            <h3>{data.name}</h3>
            <span>
              <strong>Released:</strong> {formatDateUKYear(data.release_date)}
            </span>
            <p>
              <strong>Overview:</strong>
              {data.overview}
            </p>
            <h4>
              <strong>Produced in:</strong>
            </h4>
            {data.production_countries.slice(0, 3).map((data) => {
              return <span> {data.name}</span>
            })}

            <p>
              <strong>Rating:</strong>{' '}
              {isNaN(data.vote_average) ? 0 : Math.ceil(data.vote_average * 10)}%
            </p>
            <p>{data.in_production ? 'Series available' : 'Series ended'}</p>
            <p>{data.number_of_seasons ? `Season/s: ${data.number_of_seasons}` : ''}</p>
            <p>{data.number_of_episodes ? `Number of episodes: ${data.number_of_episodes}` : ''}</p>

            <h4>
              <strong>Created by</strong>
            </h4>
            {data.created_by.slice(0, 3).map((data) => {
              return <span> {data.name},</span>
            })}

            <h4>
              <strong>Produced by</strong>
            </h4>
            <Cards>
              {data.production_companies &&
                data.production_companies.slice(0, 3).map((data) => {
                  return (
                    <Card bgColor="#ff9c03" color="#000" key={data.id}>
                      <InnerLogo>{data.name}</InnerLogo>
                    </Card>
                  )
                })}
            </Cards>
          </div>
          <h4>Cast</h4>
          <Cards>
            {data.credits &&
              data.credits.cast.slice(0, 6).map((data) => {
                return (
                  <Card key={data.id} data-testid="credits-list">
                    <SearchLink to={`/person/${data.id}`} title={data.title || data.name}>
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
            <p>{castLength > 6 ? 'and many more...' : ''}</p>
          </Cards>
          <div>
            <h3>Genres</h3>
            <Cards>
              {data.genres &&
                data.genres.map((data) => {
                  return (
                    <Card bgColor="#ff2002" data-testid="genres-list">
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
      </>
    )
  } else {
    tvDetails = <h2> Sorry. Not details available</h2>
  }
  return <section>{tvDetails}</section>
}
