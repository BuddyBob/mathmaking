import React, { Component } from 'react';
import { Route, HashRouter as Switch } from 'react-router-dom';

import Home from './Home';
import { HashRouter as Router } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="app" basename='/index.html'>
        <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={Home}/>
          </Switch>
        </AuthProvider>
        </Router>
      </div>
    );
  }
}
export default App;