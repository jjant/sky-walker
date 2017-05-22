import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Body from './Body';
import CostContainer from './CostContainer';
import Colors from '../constants/Colors';

const OneWayFlight = ({ flight, airline, style }) => (
  <div style={{...style, ...styles.container}}>
    <div style={styles.mainInformation}>
      <Header
        date={flight.departureTime}
        departureCity={flight.departureCity}
        arrivalCity={flight.arrivalCity}
        departureAirport={flight.departureAirport}
        arrivalAirport={flight.arrivalAirport}
      />
      <Body
        airline={airline}
        departureTime={flight.departureTime}
        arrivalTime={flight.arrivalTime}
      />
    </div>
    <CostContainer flight={flight.id} price={flight.price}/>
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
    padding: '10px 20px',
    borderRight: '2px solid',
    borderColor: Colors.gray,
  },
};

export default OneWayFlight;
