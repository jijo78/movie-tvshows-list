import React, { FC } from 'react'

import styled from 'styled-components'

import { Link } from 'react-router-dom'

import { ActorDetails } from '../types'

import { Cards, Card, CardBody } from '../Card'
import { Media100 } from '../MediaRatio'

import { formatDateUK } from '../utilis/date'

const SearchLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`
interface Props {
  data: ActorDetails
}
export const ActorTvShowsList: FC<Props> = ({ data }) => {
  const base_url = 'https://image.tmdb.org/t/p/w780'
  const placeholder = 'http://via.placeholder.com/780x1076text=Sorry+No+Image+Available'
  return (
    <Cards>
      {data.tv_credits &&
        data.tv_credits.cast
          .sort((a, b) => {
            if (a['first_air_date'] > b['first_air_date']) {
              return -1
            }

            return 0
          })
          .slice(0, 6)
          .map((data) => {
            return (
              <Card key={data.id} data-testid="tv-list">
                <SearchLink to={`/tv/${data.id}`} title={data.title || data.name}>
                  <Media100>
                    <img
                      alt={data.title || data.name}
                      src={
                        data.poster_path !== null
                          ? `${base_url}${data.poster_path}`
                          : `${placeholder}`
                      }
                    />
                  </Media100>
                  <CardBody>
                    <h3>{data.title || data.name}</h3>
                    <p>First Broadcasted: {formatDateUK(data.first_air_date)}</p>
                  </CardBody>
                </SearchLink>
              </Card>
            )
          })}
    </Cards>
  )
}
