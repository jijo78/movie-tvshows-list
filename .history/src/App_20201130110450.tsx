import React, { FC } from 'react'

import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom'
import { Search } from './Search'
import { SearchResults } from './SearchResults'
import { createBrowserHistory } from 'history'

interface Props {
  children: React.ReactChildren
}

const App: FC<Props> = () => {
  const history = createBrowserHistory()

  return (
    <Router history={history}>
      <Switch>
        <Route path="" component={Search} />
        <Route path="/result/:resultId" exact={true} component={SearchResults} />
      </Switch>
    </Router>
  )
}

export default App
