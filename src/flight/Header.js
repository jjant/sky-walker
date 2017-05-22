import React from 'react';
import moment from 'moment';
import Colors from '../constants/Colors';
import planeIcon from '../../assets/plane.svg';
import { connect } from 'react-redux';

const formatCityName = (cityName) => `${cityName.split(',')[0]}`;

const Header = ({ date, departureCity, departureAirport, arrivalCity, arrivalAirport, flightParams }) => {
  return <div style={styles.container}>
    <div style={styles.direction}>
      <img
        style={styles.directionImage}
        src={planeIcon}
      />
      <span style={styles.directionItem}>{ flightParams.first_flight || typeof flightParams.first_flight === 'undefined' ? 'IDA' : 'VUELTA'}</span>
    </div>
    <div style={styles.flightInformation}>
      <span>{moment(date).format('DD/MM/YYYY')}</span>
      <span style={styles.location}>
        <span style={styles.airportName}>{departureAirport.id}</span>
        <span style={styles.cityName}>{formatCityName(departureCity.name)}</span>
      </span>
      <span style={styles.space} />
      <span style={styles.location}>
        <span style={styles.airportName}>{arrivalAirport.id}</span>
        <span style={styles.cityName}>{formatCityName(arrivalCity.name)}</span>
      </span>
    </div>
  </div>
};

const mapStateToProps = (state) => ({
  flightParams: state.flights.flightParams,
});

export default connect(mapStateToProps)(Header);


const styles = {
  container: {
    display: 'flex',
    maxWidth: '700px',
    width: '100%',
    height: '50px',
    backgroundColor: Colors.lighterGray,
  },
  direction: {
    minWidth: '110px',
    height: '0',
    borderRight: `20px solid ${Colors.lighterGray}`,
    borderTop: `30px solid ${Colors.lightBlue}`,
    position: 'relative',
  },
  directionImage: {
    position: 'absolute',
    top: '-25px',
    width: '20px',
    left: '10px',
  },
  directionItem: {
    position: 'absolute',
    top: '-30px',
    lineHeight: '30px',
    color: Colors.white,
  },
  flightInformation: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  location: {
    textAlign: 'left',
  },
  airportName: {
    display: 'block',
    fontWeight: 'bold',
    fontSize: '16px',
    color: Colors.lightBlue,
  },
  cityName: {
    fontSize: '12px',
  },
  space: {
    width: '80px',
    height: '50px',
  },
};
