import styled from 'styled-components'
const size = {
  mobileS: '320px',
  mobileL: '600px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
}

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
}
export const Cards = styled.ul`
  display: grid;
  max-width: 83rem;
  margin-top: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 2rem;
  margin: 0;
  padding: 2rem;
  box-sizing: border-box;
  cursor: pointer;
  @media ${device.mobileS} {
    max-width: 33rem;
  }

  @media ${device.desktop} {
    max-width: 1400px;
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
