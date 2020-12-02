import styled from 'styled-components'
import { variant } from 'styled-system'

export const Cards = styled('ul')`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 2rem;
  margin: 0;
  padding: 0;
  cursor: pointer;
  @media (min-width: '320px') {
    width: 33rem;
  }

  @media (min-width: '600px') {
    width: 63rem;
  }

  @media (min-width: '1000px') {
    width: 83rem;
  }
`

export const Card = styled('li')<{ bgColor?: string; color?: string }>((props) => ({
  position: 'relative',
  backgroundColor: `${props.bgColor || 'dodgerblue'} `,
  color: `${props.color || 'white'}`,
  listStyleType: 'none',

  boxSizing: 'border-box',
}))

export const CardBody = styled('div')`
  position: relative;
  padding: 0.5rem;
`
