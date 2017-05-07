import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import Search from './search/Search';
import Header from './layout/Header';
import Home from './layout/Home';
import NotFound from './not_found/NotFound';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/search" component={Search} />
              <Route component={NotFound} />
            </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
