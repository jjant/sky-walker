import moment from 'moment';
import { actions } from '../actions/flightsActions';

function flightsReducer(state = initialFlightsState, action) {
  switch (action.type) {
    case actions.FETCH_FLIGHTS_IN_PROGRESS:
      return { ...state, fetching: true };
    case actions.FETCH_FLIGHTS_SUCCESS:
      return { ...state, flights: action.payload, fetching: false };
    case actions.CHANGE_SEARCH_BAR_VALUE:
      return { ...state, flightParams: { ...state.flightParams, ...action.payload } };
    case actions.FETCH_AIRLINES_SUCESS:
      return { ...state, airlines: action.payload };
    default:
      return state;
  }
}

const exampleFlight = {
  id: 1,
  price: {
    charges: 130,
    fare: 130,
    taxes: 130,
    total: 100,
  },
  airlineId: "8R",
  duration: '10:33',
  cabinType: 'Economica',
  arrivalTime: '10:22',
  arrivalAirport: "Bue",
  arrivalCity: { id: 3, name: "Buenos aires" },
  departureTime: '10:23',
  departureAirport: "Eze",
  departureCity: { id: 123, name: "Ezeiza" },
};

const initialFlightsState = {
  fetching: false,
  flightParams: {
    from: "BUE",
    to: "TUC",
    dep_date: moment().format('YYYY-MM-DD'),
    arr_date: moment().add(1, 'days').format('YYYY-MM-DD'),
    adults: 1,
    children: 0,
    infants: 0,
    focused: false,
    inputFocused: 'START_DATE',
    sort_key: '',
    sort_order: '',
  },
  flights: [exampleFlight],
};

export default flightsReducer;
