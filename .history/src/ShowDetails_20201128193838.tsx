import React, { FC } from 'react'
import useSWR from 'swr'
import config from './config'
import { fetchData } from './utilis/fetchData'
interface Props {
  data: { cast: Array<any> }
}
const ShowDetails: FC<Props> = ({ match, result }: any) => {
  const {
    params: { resultId },
  } = match
  console.log('match: ', match, resultId)
  const { data, error, isValidating } = useSWR(
    `https://api.themoviedb.org/3/movie/${resultId}/?api_key=${config.api}&append_to_response=credits`,
    fetchData,
    {
      shouldRetryOnError: false,
    }
  )
  console.log('data: ', data)
  return (
    <>
      {data &&
        data.cast &&
        data.cast.map((actor) => {
          console.log('actor: ', actor)
          return <p>{actor.name}</p>
        })}
    </>
  )
}

export default ShowDetails
