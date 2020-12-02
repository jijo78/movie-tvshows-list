import React, { ReactNode, FC } from 'react'
import styled from 'styled-components'

const Media16 = styled('div')`
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

type MediaProps = {
  children: ReactNode
}

export const Media16x9: FC<MediaProps> = (props) => {
  return <Media16 {...props}>{props.children}</Media16>
}
