import React from 'react';
import Flight from '../flight/Flight';
import OneWayFlight from '../flight/OneWayFlight';

const renderFlights = (flights, airlines) => {
  return flights.map((flight) => {
    const airline = airlines.find(airline => airline.id === flight.airlineId);
    return (
      <OneWayFlight flight={flight} airline={airline} key={flight.id} style={styles.children}/>
    );
  });
};

const FlightList = ({ flights, airlines }) => (
  <div style={styles.container}>
    {renderFlights(flights, airlines)}
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
