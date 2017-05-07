import React from 'react';
import Colors from '../constants/Colors';
import { Link } from 'react-router-dom';

const Header = () => (
  <div style={styles.container}>
    <Link to="/" style={styles.logoLink}>
      <div style={styles.logo}>
        <h2 style={styles.sky}>Sky</h2>
        <h2 style={styles.walker}>Walker</h2>
      </div>
    </Link>
  </div>
);

const styles = {
  container: {
    width: '100vw',
    height: '55px',
    background: Colors.pink,
    display: 'flex',
    alignItems: 'center',
  },
  logoLink: {
    textDecoration: 'none',
  },
  logo: {
    marginLeft: '30px',
    display: 'flex',
    fontSize: '27px',
  },
  sky: {
    textTransform: 'uppercase',
    margin: '0',
    background: Colors.white,
    color: Colors.pink,
  },
  walker: {
    margin: '0',
    color: Colors.white,
    paddingLeft: '10px',
  },
};

export default Header;
