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
      <p><span style={{ fontSize: 10, verticalAlign: 'middle', display: 'inline-block' }}>SALIDA</span> <span style={{ fontWeight: 900, verticalAlign: 'middle', display: 'inline-block' }}>{formatTime(departureTime)}</span></p>
      <p style={styles.flightMode}>Directo</p>
      <p><span style={{ fontSize: 10, verticalAlign: 'middle', display: 'inline-block' }}>LLEGADA</span> <span style={{ fontWeight: 900, verticalAlign: 'middle', display: 'inline-block' }}>{formatTime(arrivalTime)}</span></p>
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
