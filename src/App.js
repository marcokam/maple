import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useParams } from "react-router-dom";
import { Users } from './users/Users';
import { User } from './users/User';

import './tachyons.min.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/users/:id?">
          <UserRoute />
        </Route>
        <Route path="/">
          <Redirect to="/users" />
        </Route>
      </Switch>
    </Router>
  );
}

function UserRoute() {
  const { id } = useParams();
  return id ? <User id={id} /> : <Users />;
}

export default App;
