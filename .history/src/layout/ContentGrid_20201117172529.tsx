import Container from '../../components/layout/Container'
import Box, { BoxProps } from '../../components/layout/Box'
import React from 'react'
import { GEL_GUTTERS } from '../../styles/settings/breakpoints'
import { BodyCopy } from '../../components/gel/Type'
import Stack from '../../components/layout/Stack'
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
          {space ? <Stack space={space}>{children}</Stack> : <>{children}</>}
        </Box>
      </Container>
    </Container>
  )
}
export const MainContent: React.FC<GridProps> = ({ children, colorTheme, ...rest }) => {
  return (
    <Box
      id="main"
      gridColumn={{ _: 'span 2', l: 'span 1' }}
      maxWidth="100%"
      colorTheme={colorTheme}
      {...rest}
    >
      <BodyCopy as="div">
        <Stack space={3}>{children}</Stack>
      </BodyCopy>
    </Box>
  )
}

export default ContentGrid
