import api from '../lib/api';

export const actions = {
  FETCH_FLIGHTS: 'FETCH_FLIGHTS',
  FETCH_FLIGHTS_IN_PROGRESS: 'FETCH_FLIGHTS_IN_PROGRESS',
  FETCH_FLIGHTS_SUCCESS: 'FETCH_FLIGHTS_SUCCESS',
  CHANGE_SEARCH_BAR_VALUE: 'CHANGE_SEARCH_BAR_VALUE',
  FETCH_AIRLINES_SUCESS: 'FETCH_AIRLINES_SUCESS',
};

export function fetchFlights(flightParams) {
  const request = api.getOneWayFlights(flightParams);

  return (dispatch) => {
    dispatch(fetchFlightsInProgress());
    request.then((flights) => dispatch(fetchFlightsSuccess(flights)));
  };
}

export function fetchFlightsInProgress() {
  return {
    type: actions.FETCH_FLIGHTS_IN_PROGRESS,
  };
}

export function fetchFlightsSuccess(flights) {
  return {
    type: actions.FETCH_FLIGHTS_SUCCESS,
    payload: flights,
  };
}

export function changeSearchBarValue(fieldValue) {
  return {
    type: actions.CHANGE_SEARCH_BAR_VALUE,
    payload: fieldValue,
  };
}

export function fetchAirlines() {
  const request = api.getAirlines();

  return (dispatch) => {
    dispatch(fetchFlightsInProgress());
    request.then(airlines => dispatch(fetchAirlinesSuccess(airlines)));
  };
}

export function fetchAirlinesSuccess(airlines) {
  return {
    type: actions.FETCH_AIRLINES_SUCESS,
    payload: airlines,
  };
}
