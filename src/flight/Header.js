import React from 'react';
import moment from 'moment';
import Colors from '../constants/Colors';

const formatCityName = (cityName, airportName) => `${cityName.split(',')[0]} (${airportName.id})`;

const Header = ({ date, departureCity, departureAirport, arrivalCity, arrivalAirport }) => {
  return <div style={styles.container}>
    <div style={styles.direction}>
      <span>img </span>
      <span>ida</span>
    </div>
    <div style={styles.flightInformation}>
      <span>{moment(date).format('DD/MM/YYYY')}</span>
      <span style={styles.location}>
        {formatCityName(departureCity.name, departureAirport)}
      </span>
      <span style={styles.location}>
        {formatCityName(arrivalCity.name, arrivalAirport)}
      </span>
    </div>
  </div>
};

const styles = {
  container: {
    display: 'flex',
    maxWidth: '700px',
    width: '100%',
    height: '30px',
    backgroundColor: Colors.gray,
  },
  direction: {
    width: '100px',
    backgroundColor: Colors.blue,
    color: Colors.white,
    borderBottomRightRadius: '100px',
    borderTopRightRadius: '100px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  flightInformation: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  location: {
    fontWeight: 'bold',
  },
};

export default Header;
