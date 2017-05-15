import moment from 'moment';

const baseUrl = 'http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=';

const api = {
  getOneWayFlights(requiredParams, optionalParams = {}) {
    const url = `${baseUrl}getonewayflights`;
    const params = {...requiredParams, ...optionalParams};
    return fetch(urlForQuery(url, params))
            .then(resp => resp.json())
            .then(resp => formatFlights(resp.flights));
  },
  getCities() {
    const url = `http://hci.it.itba.edu.ar/v1/api/geo.groovy?method=getcities`;
    const params = { pageSize: 1000 };
    return fetch(urlForQuery(url, params)).then(resp => resp.json());
  },
  getAirlines() {
    const url = `http://hci.it.itba.edu.ar/v1/api/misc.groovy?method=getairlines`;
    const params = { pageSize: 10000 };
    return fetch(urlForQuery(url, params)).then(resp => resp.json()).then(data => data.airlines);
  },
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
    price: {
      charges: flight.price.total.charges,
      fare: flight.price.total.fare,
      taxes: flight.price.total.taxes,
      total: flight.price.total.total,
    },
    airlineId: segment.airline.id,
    duration: flight.outbound_routes[0].duration,
    cabinType: segment.cabin_type,
    arrivalTime: segment.arrival.date,
    arrivalAirport,
    arrivalCity,
    departureTime: segment.departure.date,
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
