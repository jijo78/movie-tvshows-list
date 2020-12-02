import React from 'react'
import Box, { BoxProps, allStyles } from './Box'
import styled, { css } from 'styled-components'
import { GEL_MARGINS } from '../../styles/settings/breakpoints'
import {
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MAX,
  GEL_GROUP_5_SCREEN_WIDTH_MIN
} from '@bbc/gel-foundations/breakpoints'
import { variant } from 'styled-system'
const sectionVariant = variant({ key: 'sectionColors', prop: 'colorTheme' })
const sectionBackground = variant({ key: 'backgroundThemes', prop: 'backgroundTheme' })

const group4WrapperMaxWidth = `63rem`
const group5WrapperMaxWidth = `80rem`

type BoxContainer = {
  fullWidth?: boolean
  gelMargins?: boolean
  colorTheme?: string
  backgroundTheme?: string
  elementType?: keyof JSX.IntrinsicElements | React.ComponentType<any>
} & BoxProps

const ContainerOuter = styled(Box)<BoxContainer>(
  () => css`
    position: relative;
    @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
      margin: 0 auto;
      max-width: ${group4WrapperMaxWidth};
    }
    @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
      margin: 0 auto;
      max-width: ${group5WrapperMaxWidth};
    }
  `,
  sectionVariant,
  allStyles
)

const ContainerWrapped: React.FC<BoxContainer> = ({
  children,
  fullWidth,
  gelMargins,
  backgroundTheme,
  elementType,
  ...rest
}) => {
  const { colorTheme } = { ...rest }
  if (backgroundTheme) {
    return fullWidth ? (
      <>
        <Box mx={gelMargins ? GEL_MARGINS : 0} as={elementType} width="100%" {...rest}>
          <Box>{children}</Box>
        </Box>
      </>
    ) : (
      <>
        <ContainerOuter colorTheme={colorTheme} as={elementType}>
          <Box mx={gelMargins ? GEL_MARGINS : 0} {...rest}>
            <Box>{children}</Box>
          </Box>
        </ContainerOuter>
      </>
    )
  } else if (fullWidth) {
    return (
      <>
        <Box mx={gelMargins ? GEL_MARGINS : 0} width="100%" as={elementType} {...rest}>
          {children}
        </Box>
      </>
    )
  } else {
    return (
      <ContainerOuter colorTheme={colorTheme} as={elementType}>
        <Box mx={gelMargins ? GEL_MARGINS : 0} {...rest}>
          {children}
        </Box>
      </ContainerOuter>
    )
  }
}

const Container = styled(ContainerWrapped)<BoxContainer>(
  sectionVariant,
  sectionBackground,
  allStyles
)

export default Container
