const exampleFlight = {
  ida: {
    way: 'Ida',
    date: 'Jue 20 Mar. 2017',
    from: 'Buenos Aires (EZE)',
    to: 'Bangkok (BKK)'
  },
  vuelta: {
    way: 'Vuelta',
    date: 'Jue 20 Mar. 2017',
    from: 'Buenos Aires (EZE)',
    to: 'Bangkok (BKK)'
  },
};

const initialFlightsState = [
  exampleFlight,
  exampleFlight,
  exampleFlight
];

function flightsReducer(state = initialFlightsState, action) {
  switch (action.type) {
    case "FETCH_FLIGHTS":
      return state;
    case "DELETE_LAST_FLIGHT":
      return state.slice(0, state.length - 1);
    default:
      return state;
  }
}

export default flightsReducer;
