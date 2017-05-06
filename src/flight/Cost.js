import React from 'react';
import Colors from '../constants/Colors';

const Cost = ({ price }) => (
  <div style={styles.container}>
    <div>
      <p style={{ ...styles.text, ...styles.description}}>
        Precio total final
      </p>
      <h2 style={{ ...styles.text, ...styles.priceDescription}}>
        u$s <span style={styles.price}>{price}</span>
      </h2>
    </div>
    <button style={styles.button}>Comprar</button>
  </div>
);

const width = '195px';
const height = '175px';
const styles = {
  container: {
    width,
    height,
    padding: '10px 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.blue,
  },
  text: {
    color: Colors.white,
    margin: '0',
  },
  button: {
    border: '0',
    backgroundColor: Colors.pink,
    padding: '5px 15px',
    fontSize: '18px',
    color: Colors.white,
  },
  priceDescription: {
    fontWeight: '400',
    fontSize: '22px',
  },
  price: {
    fontSize: '35px',
  },
  description: {
    fontSize: '13px',
    marginBottom: '10px',
  },
};

export default Cost;
