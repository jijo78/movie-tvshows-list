import React, { FC } from 'react'
import useSWR from 'swr'
import styled from 'styled-components'
import { Link, Route } from 'react-router-dom'

import config from '../config'
import { fetchData } from '../utilis/fetchData'
import { formatDateUK } from '../utilis/date'

import { Error } from '../Error'
import { Cards, Card, CardBody } from '../Card'
import { Media100 } from '../MediaRatio'
import { ShowDetails, TvDetails } from '../ShowDetails'

interface Props {
  match: { params: Record<any, object> }
}
const SearchLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`
export const ActorDetails: FC<Props> = ({ match }) => {
  const {
    params: { resultId },
  } = match

  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/person/${resultId}?api_key=${config.api}&append_to_response=movie_credits,tv_credits`,
    fetchData,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  )
  console.log('data: ', data)
  if (error) {
    return <Error>Something went wrong</Error>
  }
  const base_url = 'https://image.tmdb.org/t/p/w780'
  const placeholder = 'http://via.placeholder.com/400x200?text=Sorry+No+Image+Available'
  return (
    <section>
      <div>
        <h3>{data && data.name}</h3>
        <p>Birthday: {formatDateUK(data && data.birthday)}</p>
        <p>Biography: {data && data.biography}</p>
        <p>Born in: {data && data.place_of_birth}</p>
      </div>
      <h3>Movies</h3>
      <Cards>
        {data &&
          data.movie_credits &&
          data.movie_credits.cast.slice(0, 3).map((data) => {
            return (
              <Card>
                <SearchLink to={`/result/${data.id}`}>
                  <Media100>
                    <img
                      alt={data.original_name}
                      src={
                        data.poster_path !== null
                          ? `${base_url}${data.poster_path}`
                          : `${placeholder}`
                      }
                    />
                  </Media100>
                  <CardBody>
                    <h3>{data.title || data.name}</h3>
                    <p>Character: {data.character}</p>
                  </CardBody>
                </SearchLink>
              </Card>
            )
          })}
      </Cards>
      <h3>Tv shows</h3>
      <Cards>
        {data &&
          data.tv_credits &&
          data.tv_credits.cast
            .slice(0, 3)
            .sort((a, b) => {
              if (a['first_air_date'] < b['first_air_date']) {
                return -1
              }

              return 0
            })
            .map((data) => {
              console.log('data: ', data)
              return (
                <Card>
                  <SearchLink to={`/tv/${data.id}`}>
                    <Media100>
                      <img
                        alt={data.name}
                        src={
                          data.poster_path !== null
                            ? `${base_url}${data.poster_path}`
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
      </Cards>
      <Route path="/result/:resultId" component={ShowDetails} />
      <Route path="/tv/:resultId" component={TvDetails} />
    </section>
  )
}
