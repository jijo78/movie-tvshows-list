import styled from 'styled-components'

export const Cards = styled('ul')`
  display: grid;
  width: 80rem;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 2rem;
  margin: 0;
  padding: 0;
  cursor: pointer;
`

export const Card = styled('li')<{ bgColor?: string }>(
 props => ({  height: "100%",
  position: relative,
  backgroundColor: #000,
  color: #fff,
  listStyleType: none})

)

export const CardBody = styled('div')`
  position: relative;
  padding: 0.5rem;
`
