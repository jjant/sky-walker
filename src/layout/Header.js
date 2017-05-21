import React from 'react';
import Colors from '../constants/Colors';
import { Link } from 'react-router-dom';
import { fetchAirlines } from '../actions/flightsActions';
import { connect } from 'react-redux';
import whitelogo from '../../assets/whitelogo.png';
import pinklogo from '../../assets/pinklogo.png';

const Header = (props) => {
  props.dispatch(fetchAirlines());

  return (
    <div style={styles.container}>
      <Link to="/" style={styles.logoLink}>
        <div style={styles.logo}>
          <img src={whitelogo} style={{ height: 55 }} alt=""/>
        </div>
      </Link>
    </div>
  );
}

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

export default connect()(Header);
