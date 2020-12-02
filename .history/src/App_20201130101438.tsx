import React, { FC } from 'react'

import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom'
import { Search } from './Search'
import { SearchResults } from './SearchResults'
interface Props {
  children: React.ReactChildren
}

const App: FC<Props> = () => {
  const history = useHistory()
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
