import React, { FC } from 'react'
import moment from 'moment'

interface Props {
  results: Array<any>
}
const searchResults: FC<Props> = ({ results }) => {
  const base_url = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2'
  const placeholder = 'http://via.placeholder.com/130x195'
  return results && results.length ? (
    <ul className="search__results card">
      {results.map((result, i) => (
        <li key={i} className="card__block">
          <div className="card__block-media">
            <img
              className="card__img"
              alt={result.original_name}
              src={
                result.poster_path !== null && result.poster_path !== undefined
                  ? `${base_url}${result.poster_path}`
                  : `${placeholder}`
              }
            />
          </div>
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
                Release date: {moment(result.release_date).format('LL')}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <p className="no-results">Sorry not results found..</p>
  )
}

export default searchResults
