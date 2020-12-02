import React, { FC } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Search from './Search'
import ShowDetails from './ShowDetails'
import SearchResults from './SearchResults'

interface Props {
  children: React.ReactChildren
}

const App: FC<Props> = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Search} />
        <Route path="/search-result" component={SearchResults} />
      </Switch>
    </Router>
  )
}

export default App
