import styled from 'styled-components'
import { variant } from 'styled-system'

export const Cards = styled('ul')`
  display: grid;
  width: 80rem;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 2rem;
  margin: 0;
  padding: 0;
  cursor: pointer;
`
export const LabelWrapper = styled('div')<{ bgColor?: string, color?:string  }>(
  props => ({
    position: 'relative',
    backgroundColor:``,
    display: 'inline-block',
    minHeight: '20px',
    backgroundColor: `${props.theme.colors.TG_BLUE}`,
    color: `${props.theme.colors.TG_WHITE}`,
    fontFamily: `${atlas.fontFamily}`,
    fontWeight: 900,
    fontSize: `${props.theme.fontSizes[22]}`,

    padding: space[1],
    textAlign: 'center',
    textTransform: 'uppercase',

    boxSizing: 'border-box'
  }),
)
export const Card = styled('li')<{bgColor?: string, color?:string }>(
 props => ({
  position: 'relative',
  backgroundColor: `${props.bgColor || #000}`,
  color: `${props.color || #fff}`,
  listStyleType: 'none'})

)

export const CardBody = styled('div')`
  position: relative;
  padding: 0.5rem;
`
