import React, { FC } from 'react'
import useSWR from 'swr'
import config from './config'
import { fetchData } from './utilis/fetchData'
interface Props {
  data: { cast: Array<any> }
}
const ShowDetails: FC<Props> = ({ match }: any) => {
  const {
    params: { resultId },
  } = match
  console.log('match: ', match, resultId)
  const { data, error, isValidating } = useSWR(
    `https://api.themoviedb.org/3/movie/${resultId}/credits?api_key=${config.api}`,
    fetchData,
    {
      shouldRetryOnError: false,
    }
  )
  console.log('data: ', data.cast)
  return (
    <>
      {data && data.cast.map(actor) => {
        console.log('actor: ', actor)
        return <p>{actor.name}</p>
      })}
    </>
  )
}

export default ShowDetails
