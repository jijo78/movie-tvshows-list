import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
// import classNames from 'classnames'
// import debounce from 'lodash/debounce'
export const fontRootSize = 16

const pxToRem = (size: number) => `${size / fontRootSize}rem`
export const SCREEN_WIDTH_MIN = pxToRem(320)

export const SCREEN_WIDTH_MIN_2 = pxToRem(400)

const Container = styled('section')`
  display: flex;
  justify-content: center;
`
const Cards = styled('section')`
   display: grid;
  width: 80rem;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-gap: 10px;
`

const Card = styled('section')`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: dodgerblue;
  color: white;
  min-height: 10rem;
`


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

  // useEffect(() => {
  //   // const handleResizeFn = debounce(handleScroll, 10, { leading: true, trailing: false })
  //   window.addEventListener('scroll', handleResizeFn)

  //   return () => {
  //     window.removeEventListener('scroll', handleResizeFn)
  //   }
  // }, [])

  return (
    <StickySwitch
      as="section"
      {...rest}
    >
      {children}
    </StickySwitch>
  )
}

export default StickyWrapper
