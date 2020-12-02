import React, { FC } from 'react'

import { Cards, Card, CardBody } from '../Card'

import { Media16x9 } from '../MediaRatio'
import styled from 'styled-components'
import { ShowDetails } from '../ShowDetails'

// @ts-ignore
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

interface Props {
  results: { results: Array<any> }
  term: string
}

const NoResult = styled('p')`
  background-color: #b91c21;
  padding: 1rem;
  color: #fff;
`

export const SearchResults: FC<Props> = ({ results, term }) => {
  const base_url = 'https://image.tmdb.org/t/p/w780'
  const placeholder = 'http://via.placeholder.com/400x200?text=Sorry+No+Image+Available'

  return (
    <Router>
      <Cards>
        {results &&
          results.results &&
          results.results
            .filter((r) => r.media_type === 'movie' || r.media_type === 'tv')
            .map((result) => {
              return (
                <Link to={`/result/${result.id}`}>
                  <Card>
                    <Media16x9>
                      <img
                        alt={result.original_name}
                        src={
                          result.backdrop_path !== null && result.backdrop_path !== undefined
                            ? `${base_url}${result.backdrop_path}`
                            : `${placeholder}`
                        }
                      />
                    </Media16x9>
                    <CardBody>
                      <h3>{result.title || result.name}</h3>
                    </CardBody>
                  </Card>
                </Link>
              )
            })}
        <Route path="/result/:resultId" component={ShowDetails} />
      </Cards>
    </Router>
  )
}
