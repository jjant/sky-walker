import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

import 'react-select/dist/react-select.css';
import 'react-dates/lib/css/_datepicker.css';
import 'rc-slider/assets/index.css';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

if(module.hot) {
  module.hot.accept();
}
