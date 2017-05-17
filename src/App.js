import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import Search from './search/Search';
import Header from './layout/Header';
import Home from './home/Home';
import NotFound from './not_found/NotFound';

class App extends Component {


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

// export default connect()(App);
export default App;
