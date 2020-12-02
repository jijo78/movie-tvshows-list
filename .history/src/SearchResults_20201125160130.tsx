import React, { FC } from 'react'
import { formatDateUK } from './date'
import { Media16x9 } from './MediaRatio'
import styled from 'styled-components'

interface Props {
  results: { results: Array<any> }
}
const Cards = styled('ul')`
  display: grid;
  width: 80rem;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-gap: 2rem;
`

const Card = styled('li')`
  min-height: 10rem;
  height: 100%;
  position: relative;
  list-style-type: none;
`
const SearchResults: FC<Props> = ({ results }) => {
  console.log('results: ', results)
  const base_url = 'https://image.tmdb.org/t/p/original'
  const placeholder = 'http://via.placeholder.com/130x195'

  return results && results.results && results.results.length ? (
    <Cards>
      {results.results.map((result, i) => (
        <Card>
          <Media16x9>
            <img
              alt={result.original_name}
              src={
                result.poster_path !== null && result.poster_path !== undefined
                  ? `${base_url}${result.poster_path}`
                  : `${placeholder}`
              }
            />
          </Media16x9>
          <div className="card__block-inner">
            <div>
              <h3 className="card__title">{result.title}</h3>
              <p className="card__description">
                <span>{result.overview}</span>
              </p>
            </div>
            <div className="card__extra-info">
              <span className="card__rating">
                Rating: {isNaN(result.vote_average) ? 0 : Math.ceil(result.vote_average * 10)}%
              </span>
              <span className="card__release">
                Release date: {formatDateUK(result.release_date)}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </Cards>
  ) : (
    <p className="no-results">Sorry not results found..</p>
  )
}

export default SearchResults
