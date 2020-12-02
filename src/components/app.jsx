import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Weather from './Weather';

import '../App.css';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/">
                    <Weather />
                </Route>
                <Route path="/:cityName">
                    <Weather />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
