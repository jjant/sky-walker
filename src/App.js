import React, { Component } from 'react';
import './App.css';
import Flight from './flight/Flight';

const flights = [
  {
    ida: {
      way: 'ida',
      date: 'Jue 20 Mar. 2017',
      from: 'Buenos Aires (EZE)',
      to: 'Bangkok (BKK)'
    },
    vuelta: {
      way: 'vuelta',
      date: 'Jue 20 Mar. 2017',
      from: 'Buenos Aires (EZE)',
      to: 'Bangkok (BKK)'
    },
  },
];

class App extends Component {
  render() {
    return (
      <div className="App">
        {flights.map(e => <Flight {...e} />)}
      </div>
    );
  }
}

export default App;
