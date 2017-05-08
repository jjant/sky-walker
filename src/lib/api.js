import moment from 'moment';

const baseUrl = 'http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=';

const api = {
  getOneWayFlights(requiredParams, optionalParams = {}) {
    const url = `${baseUrl}getonewayflights`;
    // const { from, to, dep_date, adults, children, infants }
    const params = {...requiredParams, ...optionalParams};
    return fetch(urlForQuery(url, params))
            .then(resp => resp.json())
            .then(resp => formatFlights(resp.flights));
  }
};

function formatFlights(flights) {
  return flights.map(flight => formatFlight(flight));
}

function formatFlight(flight) {
  const segment = flight.outbound_routes[0].segments[0];
  const arrivalAirport = {
    id: segment.arrival.airport.id,
    description: segment.arrival.airport.description,
    timeZone: segment.arrival.airport.time_zone,
  };
  const arrivalCity = {
    id: segment.arrival.airport.city.id,
    name: segment.arrival.airport.city.name,
  };
  const departureAirport = {
    id: segment.departure.airport.id,
    description: segment.departure.airport.description,
    timeZone: segment.departure.airport.time_zone,
  };
  const departureCity = {
    id: segment.departure.airport.city.id,
    name: segment.departure.airport.city.name,
  };
  return {
    id: segment.id,
    price: flight.price.total.total,
    duration: flight.outbound_routes[0].duration,
    cabinType: segment.cabin_type,
    arrivalTime: segment.arrival.date,
    arrivalAirport,
    arrivalCity,
    departureAirport,
    departureCity,
  };
}

function urlForQuery(url, params) {
  return `${url}&${queryParams(params)}`;
};

function queryParams(params) {
    return Object.keys(params)
                 .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                 .join('&');
}

window.api = api;
window.moment = moment;
export default api;
