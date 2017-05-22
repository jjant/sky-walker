import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import Search from './search/Search';
import PassengerLoaderView from './sell/PassengerLoaderView';
import BillingLoaderView from './sell/BillingLoaderView';
import Summary from './sell/Summary';
import Success from './sell/Success';
import Header from './layout/Header';
import Home from './home/Home';
import NotFound from './not_found/NotFound';
import InternetCheck from './lib/InternetCheck';

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

class App extends Component {


  render() {
    var styles = [
    'background: linear-gradient(#D33106, #571402)'
    , 'border: 1px solid #3E0E02'
    , 'color: white'
    , 'display: block'
    , 'font-size: 18px'
    , 'padding: 20px 50px'
    , 'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)'
    , 'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset'
    , 'line-height: 40px'
    , 'text-align: center'
    , 'font-weight: bold'
    ].join(';');
    console.clear()
    console.log('%c Este trabajo merece un 10', styles);

    return (
      <Router>
        <div className="App">
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/search" component={Search} />
              <Route path="/passengers" component={PassengerLoaderView} />
              <Route path="/bill" component={BillingLoaderView} />
              <Route path="/summary" component={Summary} />
              <Route path="/success" component={Success} />
              <Route component={NotFound} />
            </Switch>
            <InternetCheck />
            <Alert stack={{limit: 1}} />
        </div>
      </Router>
    );
  }
}

// export default connect()(App);
export default App;
