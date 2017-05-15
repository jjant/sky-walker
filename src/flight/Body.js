import React from 'react';
import moment from 'moment';

const formatTime = (time) => moment(time).format('hh:mm');

const Body = ({ airline, departureTime, arrivalTime, flightMode }) => (
  <div style={styles.container}>
    <div style={styles.airlineContainer}>
      <img
        src={airline.logo}
        style={styles.image}
      />
      <p style={styles.airlineName}>{airline.name}</p>
    </div>
    <div style={styles.flightInformation}>
      <p>{formatTime(departureTime)}</p>
      <p style={styles.flightMode}>Directo</p>
      <p>{formatTime(arrivalTime)}</p>
    </div>
  </div>
);

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(90, 142, 228, 0.175)',
  },
  airlineContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '130px',
    justifyContent: 'space-around',
  },
  airlineName: {
    height: '15px',
  },
  flightInformation: {
    flex: '1',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  flightMode: {
    width: '80px',
  }
};

export default Body;
