import React, { FC } from 'react'
import styled from 'styled-components'

import { Cards, Card, CardBody } from '../Card'
import { ResultList } from '../types'

import { Media100 } from '../MediaRatio'
import { ShowDetails, TvDetails } from '../ShowDetails'
import { ActorDetails } from '../ActorDetails'
// @ts-ignore
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
const SearchLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`
interface Props {
  results: ResultList[]
  handleClick?: (e: React.ChangeEvent<any>) => void
}

export const SearchResults: FC<Props> = ({ results, handleClick }) => {
  const base_url = 'https://image.tmdb.org/t/p/w780'
  const placeholder = 'http://via.placeholder.com/400x200?text=Sorry+No+Image+Available'

  return (
    <>
      <h2 style={{ display: 'none' }}>Search Results</h2>

      <Router>
        <Cards key={results[0].id}>
          {results &&
            results
              .filter(
                (r) =>
                  r.media_type === 'movie' || r.media_type === 'tv' || r.media_type === 'person'
              )
              .map((result) => {
                let link
                let image
                if (result.media_type === 'movie') {
                  link = `/result/${result.id}`
                  image = result.poster_path
                } else if (result.media_type === 'tv') {
                  link = `/tv/${result.id}`
                  image = result.poster_path
                } else {
                  link = `/person/${result.id}`
                  image = result.profile_path
                }

                return (
                  <SearchLink
                    to={`${link}`}
                    onClick={(e) => {
                      handleClick && handleClick(e)
                    }}
                    title={result.media_type}
                  >
                    <Card key={result.id} data-testid="result-list">
                      <Media100>
                        <img
                          alt={result.title || result.name}
                          src={image !== null ? `${base_url}${image}` : `${placeholder}`}
                        />
                      </Media100>
                      <CardBody>
                        <h3>{result.title || result.name}</h3>
                        <p>{result.media_type}</p>
                      </CardBody>
                    </Card>
                  </SearchLink>
                )
              })}
          <Switch>
            <Route path="/result/:resultId" component={ShowDetails} />
            <Route path="/tv/:resultId" component={TvDetails} />
            <Route path="/person/:resultId" component={ActorDetails} />
          </Switch>
        </Cards>
      </Router>
    </>
  )
}
