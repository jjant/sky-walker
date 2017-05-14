import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux'

import 'react-select/dist/react-select.css';
import 'react-dates/lib/css/_datepicker.css';
import 'rc-slider/assets/index.css';
import './index.css';

const history = createHistory();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

if(module.hot) {
  module.hot.accept();
}
