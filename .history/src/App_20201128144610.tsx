import React, { FC } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Search from './Search'
import ShowDetails from './ShowDetails'
console.log('ShowDetails: ', ShowDetails)

interface Props {
  children: React.ReactChildren
}

const App: FC<Props> = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Search} />
        <Link to="/result/:resultId" component={ShowDetails}>
          Public Page
        </Link>
        <Route
          path="/result/:resultId"
          component={ShowDetails}
          render={() => <div>List of Items</div>}
        />
      </Switch>
    </Router>
  )
}

export default App
