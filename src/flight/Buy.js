import React from 'react';
import Colors from '../constants/Colors';

const Buy = () => (
  <button style={styles.button}>Comprar</button>
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
