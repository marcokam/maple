import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Users } from './users/Users';

import './tachyons.min.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Redirect to="/users" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
