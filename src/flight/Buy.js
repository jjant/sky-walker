import React from 'react';
import Colors from '../constants/Colors';
import { Link } from 'react-router-dom';

const Buy = ({ flight }) => (
  <Link to={`/sell?id=${flight}`}>
    <button style={styles.button}>Comprar</button>
  </Link>
);

const styles = {
  button: {
    border: '0',
    backgroundColor: Colors.pink,
    padding: '5px 15px',
    fontSize: '18px',
    color: Colors.white,
  },
};

export default Buy;
