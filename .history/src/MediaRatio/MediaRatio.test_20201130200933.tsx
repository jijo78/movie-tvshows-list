import React from 'react'
import { cleanup, render } from '@testing-library/react'

import '@testing-library/jest-dom/extend-expect'

import { Media16x9 } from './MediaRatio'
import Image from './../../components/images/Image'

const renderComponent = () =>
  render(
    <Media16x9>
      <Image src="" alt="some alt tag" />
    </Media16x9>
  )

describe('<Media />', () => {
  afterEach(cleanup)

  it('should render the Media component and his child', () => {
    const { getByAltText } = renderComponent()
    const media = getByAltText('some alt tag')
    expect(media).toBeInTheDocument()
  })
})
