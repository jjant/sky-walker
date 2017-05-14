import React from 'react';
import Flight from '../flight/Flight';
import OneWayFlight from '../flight/OneWayFlight';

const renderFlights = (flights) => {
  return flights.map((flight) =>
    <OneWayFlight {...flight} key={flight.id} style={styles.children}/>
  );
};

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
