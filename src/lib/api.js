import moment from 'moment';

const baseUrl = 'http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=';
const geoUrl = 'http://hci.it.itba.edu.ar/v1/api/geo.groovy?method=';
const baseGoogleUrl = 'https://maps.googleapis.com/maps/api/place/';
const googleKey = 'AIzaSyBmOL6BXPEWANzoe9x4cyybRrOp35p3uv4';
// valid query = https://maps.googleapis.com/maps/api/place/textsearch/json?query="Montevideo, Montevideo, Uruguay"&key=AIzaSyBmOL6BXPEWANzoe9x4cyybRrOp35p3uv4
// valid query = https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyBmOL6BXPEWANzoe9x4cyybRrOp35p3uv4&photoreference=CmRYAAAAOstfpxNjorhWYYYN-ZuPJsXKy9LlPe4ECjqNGB5oQml8Y3MgkNBNHl3YINBmuHZh2yxkryjrePBHLeutm4Uzidv6kAiwjXnGZQPRGaY8KKcEDkIMfkl-3Mye14ADnlneEhBEPNXhzVkrTlsooIdsidA3GhTT9UIoHXsW2v9v4wzgO8CU6QKRkg&maxwidth=300

const countries = [];
const api = {
  getOneWayFlights(requiredParams, optionalParams = {}) {
    const url = `${baseUrl}getonewayflights`;
    const params = {...requiredParams, ...optionalParams};
    return fetch(urlForQuery(url, params))
            .then(resp => resp.json())
            .then(resp => formatFlights(resp.flights));
  },
  validateCard(requiredParams, optionalParams = {}) {
    const url = `${baseUrl}validatecreditcard`;
    const params = {...requiredParams, ...optionalParams};
    return fetch(urlForQuery(url, params))
            .then(resp => resp.json())
  },
  async getCitiesImages(city) {
    const res = await fetch(`${baseGoogleUrl}textsearch/json?query=${city}&key=${googleKey}`);
    const search = await res.json();
    const image = await fetch(`${baseGoogleUrl}photo/json?maxwidth=280&key=${googleKey}&photoreference=${search.results[0].photos[0].photo_reference}`);
    return image;
  },
  getInstallments(requiredParams, optionalParams = {}) {
    const url = `${baseUrl}getinstallments`;
    const params = {...requiredParams, ...optionalParams};
    return fetch(urlForQuery(url, params))
            .then(resp => resp.json())
  },
  getCities(requiredParams, optionalParams = {}) {
    const url = `${geoUrl}getcities`;
    const params = {...requiredParams, ...optionalParams, page_size: 1000 };
    return fetch(urlForQuery(url, params))
            .then(resp => resp.json())
  },
  getAirports(requiredParams, optionalParams = {}) {
    const url = `${geoUrl}getairports`;
    const params = {...requiredParams, ...optionalParams, page_size: 1000 };
    return fetch(urlForQuery(url, params))
            .then(resp => resp.json())
  },
  getCountries(requiredParams, optionalParams = {}) {
    const url = `${geoUrl}getcountries`;
    const params = {...requiredParams, ...optionalParams};
    return fetch(urlForQuery(url, params))
            .then(resp => resp.json())
  },
  getDeals(requiredParams, optionalParams = {}) {
    const url = `${baseUrl}getflightdeals`;
    const params = {...requiredParams, ...optionalParams};
    return fetch(urlForQuery(url, params))
            .then(resp => resp.json())
            .then(resp => formatDeals(resp.deals));
  },
  bookFlight(body = {}) {
    const url = `${baseUrl}bookflight`;
    return fetch(url, { method: 'POST', headers: {'Content-Type' : 'application/json'}, body: JSON.stringify(body)})
            .then(resp => resp.json())
  },
  bookFlight2(requiredParams, optionalParams = {}) {
    const url = `${baseUrl}bookflight2`;
    const params = {...requiredParams, ...optionalParams};
    return fetch(urlForQuery(url, params))
            .then(resp => resp.json())
  },
  getAirlines() {
    const url = `http://hci.it.itba.edu.ar/v1/api/misc.groovy?method=getairlines`;
    const params = { pageSize: 10000 };
    return fetch(urlForQuery(url, params)).then(resp => resp.json()).then(data => data.airlines);
  },
  getProcessedRegions() {
    return countries.length ? countries : processRegions();
  }
};

function formatFlights(flights) {
  if (!flights) return [];
  return flights.map(flight => formatFlight(flight));
}

function formatDeals(deals) {
  if (!deals) return [];
  return deals.map(deal => formatDeal(deal));
}

function formatDeal(deal) {
  return {
    city: {
      id:  deal.city.id,
      name:  deal.city.name,
    },
    country: deal.city.country,
    price: deal.price,
  }
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
    rawPrice: flight.price,
    duration: flight.outbound_routes[0].duration,
    cabinType: segment.cabin_type,
    airline: segment.airline,
    arrivalTime: segment.arrival.date,
    arrivalAirport,
    arrivalCity,
    departureTime: segment.departure.date,
    departureAirport,
    departureCity,
  };
}

async function processRegions() {
  const allCities = (await api.getCities({ pageSize: 200 })).cities;
  const allCountries = (await api.getCountries({ pageSize: 200 })).countries;
  const allStates = allCities.map((city) => {
    const aux = city.name.split(',');
    if (city.country.id === 'AR') aux.shift();
    return {...city, name: aux.length === 3 ? city.name.split(',')[1].trim() : city.name.split(',')[0].trim() };
  });
  const deduplicateAllStates = [] 

  allStates.forEach((state) => {
    if (deduplicateAllStates.find((stateraw) => stateraw.name == state.name)) return;
    deduplicateAllStates.push(state);
  })

  const allRegions = allCountries;

  allRegions.forEach((country) => {
    const states = deduplicateAllStates.filter((state) => state.country.id == country.id);
    country.regions = states;
  })

  const finalRegions = allRegions.map((country) => {
    const obj = {
      countryShortCode: country.id,
      countryName: country.name,
      regions: country.regions.map((region) => ({ name: region.name, shortCode: region.id })),
    }
    countries.push(obj);
    return obj;
  });
  return finalRegions;
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
