import React, { FC } from 'react'
import useSWR from 'swr'
import { Switch, Route } from 'react-router-dom'

import config from '../config'
import { fetchData } from '../utilis/fetchData'
import { formatDateUK } from '../utilis/date'

import { Error } from '../Error'

import { ShowDetails, TvDetails } from '../ShowDetails'
import { ActorMoviesList } from './ActorMoviesList'
import { ActorTvShowsList } from './ActorTvShowsList'

interface Props {
  match: { params: { resultId: string } }
}

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
  if (error) {
    return <Error>Something went wrong</Error>
  }

  let actorDetails
  if (data) {
    actorDetails = (
      <>
        <h2>Actor Details Page</h2>
        <div>
          <h3>{data.name}</h3>
          <p>
            <strong>Born: </strong>
            {`${data.birthday !== null ? formatDateUK(data.birthday) : ' Not available'}`}
          </p>
          <p>
            {' '}
            <strong>Biography:</strong>{' '}
            {data.biography !== null ? `${data.biography}` : ' Not available'}
          </p>
          <p>
            <strong>Born in:</strong> {data.place_of_birth}
          </p>
        </div>
        <h3>Most recent Movies </h3>
        <ActorMoviesList data={data} />
        <h3>Most recent Tv shows</h3>
        <ActorTvShowsList data={data} />
        <Switch>
          <Route path="/result/:resultId" component={ShowDetails} />
          <Route path="/tv/:resultId" component={TvDetails} />
        </Switch>
      </>
    )
  } else {
    actorDetails = <h2> Sorry. Not details available</h2>
  }
  return <section>{actorDetails}</section>
}
