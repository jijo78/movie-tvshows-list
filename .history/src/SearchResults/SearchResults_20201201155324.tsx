import React, { FC } from 'react'
import styled from 'styled-components'

import { Cards, Card, CardBody } from '../Card'

import { Media16x9 } from '../MediaRatio'
import { ShowDetails, TvDetails } from '../ShowDetails'
import { ActorDetails } from '../ActorDetails'
// @ts-ignore
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
const SearchLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`
interface Props {
  results: { results: Array<any> }
  handleClick?: (e: React.ChangeEvent<any>) => void
}

export const SearchResults: FC<Props> = ({ results, handleClick }) => {
  const base_url = 'https://image.tmdb.org/t/p/w780'
  const placeholder = 'http://via.placeholder.com/400x200?text=Sorry+No+Image+Available'

  return (
    <Router>
      <Cards>
        {results &&
          results.results &&
          results.results
            .filter(
              (r) => r.media_type === 'movie' || r.media_type === 'tv' || r.media_type === 'person'
            )
            .map((result) => {
              let link
              if (result.media_type === 'movie') {
                link = `/result/${result.id}`
              } else if (result.media_type === 'tv') {
                link = `/tv/${result.id}`
              } else {
                link = `/person/${result.id}`
              }

              return (
                <SearchLink
                  to={`${link}`}
                  onClick={(e) => {
                    handleClick && handleClick(e)
                  }}
                >
                  <Card>
                    <Media16x9>
                      <img
                        alt={result.original_name}
                        src={
                          result.poster_path !== null || result.poster_path !== null
                            ? `${base_url}${result.poster_path}`
                            : `${placeholder}`
                        }
                      />
                    </Media16x9>
                    <CardBody>
                      <h3>{result.title || result.name}</h3>
                      <p>{result.media_type}</p>
                    </CardBody>
                  </Card>
                </SearchLink>
              )
            })}
        {results && results.results && results.results.length === 0 && <p>Not results found</p>}
        <Route path="/result/:resultId" component={ShowDetails} />
        <Route path="/tv/:resultId" component={TvDetails} />
        <Route path="/person/:resultId" component={ActorDetails} />
      </Cards>
    </Router>
  )
}
