import React, { FC, useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

interface Props {
  children: React.ReactChildren
}

const App: FC<Props> = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Search} />
      </Switch>
    </Router>
  )
}

export default App
