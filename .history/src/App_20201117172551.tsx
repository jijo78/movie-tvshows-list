import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import Box, { BoxProps } from './layout/Box'
import classNames from 'classnames'
import debounce from 'lodash/debounce'

const Switch = styled(Box)`
  &.sticky {
    display: flex;
    flex-wrap: wrap;
    position: sticky;
    width: 100%;
    transform: translateZ(0);
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
  }
`
const StickySwitch: React.FC<BoxProps> = props => {
  const { children, ...rest } = props
  return <Switch {...rest}>{children}</Switch>
}

type Props = BoxProps & React.HTMLAttributes<HTMLDivElement>

const StickyWrapper: FC<Props> = ({ children, ...rest }) => {
  const [isSticky, setSticky] = useState(false)

  const handleScroll = () => {
    const isTop = window.scrollY < 20
    if (!isTop) {
      setSticky(true)
    } else {
      setSticky(false)
    }
  }

  useEffect(() => {
    const handleResizeFn = debounce(handleScroll, 10, { leading: true, trailing: false })
    window.addEventListener('scroll', handleResizeFn)

    return () => {
      window.removeEventListener('scroll', handleResizeFn)
    }
  }, [])

  return (
    <StickySwitch
      className={classNames({
        sticky: isSticky
      })}
      as="section"
      {...rest}
    >
      {children}
    </StickySwitch>
  )
}

export default StickyWrapper
