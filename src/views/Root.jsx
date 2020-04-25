import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import GameView from './Game'

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" component={GameView} />
    </Switch>
  </Router>
)
