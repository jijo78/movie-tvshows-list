import React, { FC } from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Search } from './Search'
interface Props {
  children: React.ReactChildren
}

const App: FC<Props> = () => {
  return <Search />
}

export default App
