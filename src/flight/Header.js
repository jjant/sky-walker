import React from 'react';

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
    height: '40px',
  },
  direction: {
    width: '100px',
    backgroundColor: 'lightblue',
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
    backgroundColor: 'lightgray',
  },
  location: {
    fontWeight: 'bold',
  },
};

export default Header;
