import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import flightsReducer from './flightsReducer';

const reducer = combineReducers({
  flights: flightsReducer,
  router: routerReducer,
});

export default reducer;
