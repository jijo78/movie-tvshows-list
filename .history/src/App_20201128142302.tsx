import React, { FC } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Search from './Search'
import ShowDetails from './ShowDetails'

interface Props {
  children: React.ReactChildren
}

const App: FC<Props> = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Search} />

        <Route path="/result/">
          <Route path="/result/:resultId" component={ShowDetails} />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
