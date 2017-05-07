import React from 'react';
import Colors from '../constants/Colors';
import { Link } from 'react-router-dom';

const SearchBar = () => (
  <div style={styles.container}>
    <input style={{...styles.searchField, ...styles.largeField}} type="text" placeholder="Buenos Aires (EZE)"/>
    <input style={{...styles.searchField, ...styles.largeField}} type="text" placeholder="Destino"/>
    <input style={{...styles.searchField, ...styles.mediumField}} type="text" placeholder="Ida"/>
    <input style={{...styles.searchField, ...styles.mediumField}} type="text" placeholder="Vuelta"/>
    <input style={{...styles.searchField, ...styles.smallField}} type="text" placeholder="Num"/>
    <input style={{...styles.searchField, ...styles.smallField, ...styles.lastField}} type="text" placeholder="Tipo"/>
    <Link to="/search">
      <button style={styles.button} type="button" >Buscar</button>
    </Link>
  </div>
);

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  searchField: {
    border: '0',
    borderRight: '1px solid grey',
    padding: '0',
    paddingLeft: '10px',
    fontSize: '15px',
    backgroundColor: Colors.white,
    height: '50px',
  },
  smallField: {
    width: '60px',
  },
  mediumField: {
    width: '140px',
  },
  largeField: {
    width: '200px',
  },
  lastField: {
    borderRight: '0',
  },
  button: {
    border: 'none',
    width: '100px',
    height: '50px',
    backgroundColor: '#FF3F61',
    fontSize: '15px',
    color: 'white',
    cursor: 'pointer',
  },
};

export default SearchBar;
