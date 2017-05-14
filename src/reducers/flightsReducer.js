import { actions } from '../actions/flightsActions';

function flightsReducer(state = initialFlightsState, action) {
  switch (action.type) {
    case actions.FETCH_FLIGHTS_IN_PROGRESS:
      return { ...state, fetching: true };
    case actions.FETCH_FLIGHTS_SUCCESS:
      return { ...state, flights: action.payload, fetching: false };
    case actions.CHANGE_SEARCH_BAR_VALUE:
      return { ...state, flightParams: { ...state.flightParams, ...action.payload } };
    default:
      return state;
  }
}

const exampleFlight = {
  id: 1,
  price: 100,
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
    dep_date: "2017-12-25",
    adults: 1,
    children: 0,
    infants: 0,
    focused: false,
  },
  flights: [exampleFlight],
};

export default flightsReducer;
