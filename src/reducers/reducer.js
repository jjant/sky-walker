import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import flightsReducer from './flightsReducer';
import bookReducer from './bookReducer';

const reducer = combineReducers({
  flights: flightsReducer,
  book: bookReducer,
  router: routerReducer,
});

export default reducer;
