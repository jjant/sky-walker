import React, { Component } from 'react';
import FlightList from './FlightList';
import SearchBar from './SearchBar';

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
  render() {
    return (
      <div style={styles.container}>
        <SearchBar />
        <FlightList flights={flights} />
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
