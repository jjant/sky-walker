import { combineReducers } from 'redux';
import flightsReducer from './flightsReducer';

const reducer = combineReducers({
  flights: flightsReducer,
});

export default reducer;
