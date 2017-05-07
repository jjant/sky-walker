import React from 'react';
import Flight from '../flight/Flight';

const renderFlights = (flights) => (
  flights.map((flight, i) => <Flight {...flight} key={i} style={styles.children}/>)
);

const FlightList = ({ flights }) => (
  <div style={styles.container}>
    {renderFlights(flights)}
  </div>
);

const styles = {
  container: {
    display: 'inline-flex',
    padding: '0',
    flexDirection: 'column',
  },
  children: {
    marginBottom: '5px',
  },
};
export default FlightList;
