import React from 'react';
import Colors from '../constants/Colors';

const Header = ({ way, date, from, to }) => (
  <div style={styles.container}>
    <div style={styles.direction}>
      <span>img </span>
      <span>{way}</span>
    </div>
    <div style={styles.flightInformation}>
      <span>{date}</span>
      <span style={styles.location}>{from}</span>
      <span style={styles.location}>{to}</span>
    </div>
  </div>
);

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
