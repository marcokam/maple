import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useParams
} from "react-router-dom";

import { ConnectedUsers as Users } from "./Components/Users";
import { ConnectedUser as User } from "./Components/User";

import "./tachyons.min.css";

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
    return id ? <User id={parseInt(id, 10)} /> : <Users />;
}

export default App;
