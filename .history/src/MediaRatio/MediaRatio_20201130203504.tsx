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
const Media16 = styled(coreStyle)`
  padding-bottom: 56.66%;
`
const MediaFull = styled(coreStyle)`
  padding-bottom: 100%;
`
interface MediaProps = {
  children: ReactNode
}

export const Media16x9: FC<MediaProps> = (props) => {
  return <Media16 {...props}>{props.children}</Media16>
}
export const Media100: FC<MediaProps> = (props) => {
  return <MediaFull {...props}>{props.children}</MediaFull>
}
