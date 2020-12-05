import React, { FC } from 'react'
import useSWR from 'swr'
import config from '../config'
import { fetchData } from '../utilis/fetchData'
import { formatDateUKYear } from '../utilis/date'
import { Cards, Card, CardBody } from '../Card'
import { Link, Route } from 'react-router-dom'
import { Error } from '../Error'
import { ActorDetails } from '../ActorDetails'
import styled from 'styled-components'

import { Media100 } from '../MediaRatio'
const SearchLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`
interface Props {
  match: { params: { resultId: string } }
}

export const ShowDetails: FC<Props> = ({ match }) => {
  const {
    params: { resultId },
  } = match
  let showDetails

  const { data, error, isValidating } = useSWR(
    `https://api.themoviedb.org/3/movie/${resultId}?api_key=${config.api}&append_to_response=credits`,
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
    return <Error>Loading</Error>
  }
  if (data) {
    const base_url = 'https://image.tmdb.org/t/p/w780'
    const placeholder = 'http://via.placeholder.com/400x200?text=Sorry+No+Image+Available'
    const castLength = data.credits && data.credits.cast.length
    showDetails = (
      <section>
        <h2>Movies</h2>

        <h3>{data && data.title}</h3>
        <h4>{data && data.tagline}</h4>

        <p>Released: {formatDateUKYear(data && data.release_date)}</p>
        <p>{`Duration: ${data && data.runtime} minutes`}</p>
        <p>{data && data.overview}</p>

        <div>
          <h4>
            <strong>Cast</strong>
          </h4>

          <Cards>
            {data &&
              data.credits &&
              data.credits.cast.slice(0, 6).map((data) => {
                return (
                  <Card data-testid="cast-list" key={data.id}>
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
            <p>{castLength > 6 ? 'and many more' : ''}</p>
          </Cards>
        </div>
        <div>
          <h4>
            <strong>Genres</strong>
          </h4>
          <Cards>
            {data &&
              data.genres &&
              data.genres.map((data) => {
                return (
                  <Card bgColor="#ff2002" data-testid="genres-list" key={data.id}>
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
  } else {
    showDetails = <h2>Sorry. Not details available</h2>
  }
  return <section>{showDetails}</section>
}
