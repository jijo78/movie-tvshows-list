import Container from './Container'
import Box, { BoxProps } from './Box'
import React from 'react'
import { GEL_GUTTERS } from '../../styles/settings/breakpoints'

type GridProps = {
  colorTheme?: string | undefined
  contentColorTheme?: string | undefined
  space?: string | undefined
  columns?: object
} & BoxProps
const ContentGrid: React.FC<GridProps> = ({
  children,
  colorTheme,
  contentColorTheme,
  space,
  columns = { _: 'minmax(0, 1fr)', l: 'minmax(0, 1fr) 340px' },
  ...rest
}) => {
  return (
    <Container colorTheme={colorTheme} py={7} elementType="section" fullWidth {...rest}>
      <Container colorTheme={contentColorTheme} gelMargins>
        <Box display="grid" gridGap={GEL_GUTTERS} gridTemplateColumns={columns}>
          {children}
        </Box>
      </Container>
    </Container>
  )
}


export default ContentGrid
