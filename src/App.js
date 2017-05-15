import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import Search from './search/Search';
import Header from './layout/Header';
import Home from './home/Home';
import NotFound from './not_found/NotFound';
import { fetchAirlines } from './actions/flightsActions';

class App extends Component {
  componentWillMount() {
    this.props.dispatch(fetchAirlines());
  }

  render() {
    return (
      <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/search" component={Search} />
            <Route component={NotFound} />
          </Switch>
      </div>
    );
  }
}

export default connect()(App);
