import React, { ReactNode, FC } from 'react'
import styled, { css } from 'styled-components'

const coreStyle = styled('div')(
  () => css`
    position: relative;
    overflow: hidden;
    & > * {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  `
)

const MediaFull = styled(coreStyle)`
  padding-bottom: 100%;
`
const Media16 = styled(coreStyle)`
  position: relative;
  overflow: hidden;
  & > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  padding-bottom: 56.25%;
`
const Media4 = styled(coreStyle)`
  padding-bottom: 75%;
`
const Media3 = styled(coreStyle)`
  padding-bottom: 66.66%;
`
type MediaProps = {
  children: ReactNode
}

export const Media100: FC<MediaProps> = (props) => {
  return <MediaFull {...props}>{props.children}</MediaFull>
}

export const Media16x9: FC<MediaProps> = (props) => {
  return <Media16 {...props}>{props.children}</Media16>
}

export const Media4x3: FC<MediaProps> = (props) => {
  return <Media4 {...props}>{props.children}</Media4>
}

export const Media3x2: FC<MediaProps> = (props) => {
  return <Media3 {...props}>{props.children}</Media3>
}
