import React, { FC } from 'react'
import useSWR from 'swr'
import config from '../config'
import { fetchData } from '../utilis/fetchData'
import { formatDateUK } from '../utilis/date'
import { Error } from '../Error'
import { Cards, Card, CardBody } from '../Card'

interface Props {
  match: { params: Record<any, object> }
}
export const ActorDetails: FC<Props> = ({ match }) => {
  const {
    params: { resultId },
  } = match

  const { data, error, isValidating } = useSWR(
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
  return (
    <div>
      <h3>{data && data.name}</h3>
      <p>Birthday: {formatDateUK(data && data.birthday)}</p>
      <p>Biography: {data && data.biography}</p>
      <p>Born in: {data && data.place_of_birth}</p>

      <h3>Movies</h3>
      <Cards>
        {data &&
          data.movie_credits &&
          data.movie_credits.cast.map((data) => {
            return (
              <Card>
              <SearchLink to={`/person/${data.id}`}>
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
                  <p>Character: {data.character}</p>
                </CardBody>
              </SearchLink>
            </Card>
     
          })}
      </Cards>
      <h3>Tv shows</h3>
      <ul>
        {data &&
          data.tv_credits &&
          data.tv_credits.cast.map((data) => {
            return <li>{data.name}</li>
          })}
      </ul>
    </div>
  )
}
