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
        <Route path="/" exact component={Search} />
      </Switch>
    </Router>
  )
}

export default App
