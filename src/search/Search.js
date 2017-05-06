import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    border: '1px solid black',
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
  },
};

export default Search;
