import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Body from './Body';
import Cost from './Cost';
import Colors from '../constants/Colors';

const OneWayFlight = ({ departureCity, departureAirport, arrivalCity, arrivalAirport, departureTime, arrivalTime, style }) => (
  <div style={{...style, ...styles.container}}>
    <div style={styles.mainInformation}>
      <Header
        date={departureTime}
        departureCity={departureCity}
        arrivalCity={arrivalCity}
        departureAirport={departureAirport}
        arrivalAirport={arrivalAirport}
      />
      <Body
        departureTime={departureTime}
        arrivalTime={arrivalTime}
      />
    </div>
    <Cost price={100}/>
  </div>
);

const styles = {
  container: {
    backgroundColor: 'white',
    width: '846px',
    display: 'flex',
    border: '2px solid',
    borderColor: Colors.gray,
  },
  mainInformation: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: '10px 20px',
    borderRight: '2px solid',
    borderColor: Colors.gray,
  },
};

export default OneWayFlight;
