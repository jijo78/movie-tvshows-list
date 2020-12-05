import React, { FC } from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Search } from './Search'

const App: FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Search} />
      </Switch>
    </Router>
  )
}

export default App
