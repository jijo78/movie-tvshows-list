import React, { FC, useState } from 'react'
import { formatDateUK } from './date'
import useSWR from 'swr'
import config from './config'
import { Media16x9 } from './MediaRatio'
import styled from 'styled-components'
import { fetchData } from './utilis/fetchData'

interface Props {
  results: { results: Array<any> }
}
const Cards = styled('ul')`
  display: grid;
  width: 80rem;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 2rem;
  margin: 0;
  padding: 0;
  cursor: pointer;
`

const Card = styled('li')`
  min-height: 10rem;
  height: 100%;
  position: relative;
  background-color: #000;
  color: #fff;
  list-style-type: none;
`

const CardBody = styled('div')`
  position: relative;
  padding: 0.5rem;
`

const CardFooter = styled('footer')`
  position: relative;
  padding: 0.5rem;
  display: flex;
`
const NoResult = styled('p')`
  background-color: #b91c21;
  padding: 1rem;
  color: #fff;
`

const SearchResults: FC<Props> = ({ results }) => {
  console.log('results: ', results)
  const [getData, setGetData] = useState(false)
  const [id, setMovieId] = useState('')
  //   const movieId = document.getElementsByTagName('form')[0].getAttribute('data-id')
  //   setMovieId(movieId)
  const base_url = 'https://image.tmdb.org/t/p/w780'
  const placeholder = 'http://via.placeholder.com/400x200?text=Sorry+No+Image+Available'
  const { data: projects } = useSWR(
    () =>
      getData
        ? `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${config.api}&language=en-US`
        : null,
    fetchData,
    {
      shouldRetryOnError: false,
    }
  )
  console.log('projects: ', projects)

  return results && results.results && results.results.length ? (
    <Cards>
      {results.results.map((result) => {
        return (
          <Card
            data-id={result.id}
            onClick={() => {
              setMovieId(result.id)
              setGetData(true)
            }}
          >
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
              <h3>{result.title || result.original_name}</h3>
              <p>{result.overview}</p>
            </CardBody>
            <CardFooter>
              <span>
                Rating: {isNaN(result.vote_average) ? 0 : Math.ceil(result.vote_average * 10)}%
              </span>
              <span>Release date: {formatDateUK(result.release_date)}</span>
              <span>{result.media_type}</span>
            </CardFooter>
          </Card>
        )
      })}
    </Cards>
  ) : (
    projects && projects.length  return(

        <NoResult>
          {' '}
          {projects && projects.length && projects.map((project: any) => <p>{project.name}</p>)}
        </NoResult>
      )
    )
}

export default SearchResults
