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
};

export default Header;
