import React, { Component } from 'react';
import FlightList from './FlightList';
import SearchBar from './SearchBar';
import api from '../lib/api';

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

const flights = [
  exampleFlight,
  exampleFlight,
  exampleFlight
];

class Search extends Component {
  state = {
    flights,
    from: "BUE",
    to: "TUC",
    dep_date: "2017-12-25",
  };

  getFlights() {
    const params = {
      to: this.state.to,
      from: this.state.from,
      dep_date: this.state.dep_date,
      adults: 1,
      children: 0,
      infants: 0,
    };
    const flightsPromise = api.getOneWayFlights(params);
    flightsPromise.then(resp => this.setState(() => ({ flights: resp })));
    flightsPromise.then(resp => window.flights = resp);
  }

  render() {
    this.getFlights();
    return (
      <div style={styles.container}>
        <SearchBar />
        <FlightList flights={this.state.flights} />
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    maxWidth: '1400px',
    margin: '55px auto 0',
    justifyContent: 'center',
  },
};

export default Search;
