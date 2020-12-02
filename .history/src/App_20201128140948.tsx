import React, { FC, useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

interface Props {
  children: React.ReactChildren
}

const App: FC<Props> = () => {
  return <Router>Switch</Router>
}

export default App
