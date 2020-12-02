import React from 'react'
import useSWR from 'swr'
import config from './config'

const ShowDetails = ({ match, results }: any) => {
  console.log('match: ', match, results)
  return (
    <>
      <h2>ciao</h2>
    </>
  )
}

export default ShowDetails
