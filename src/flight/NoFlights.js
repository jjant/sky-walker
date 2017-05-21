import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Body from './Body';
import Cost from './Cost';
import Colors from '../constants/Colors';
import PinkButton from '../sell/PinkButton';
import { Link } from 'react-router-dom';

const NoFlights = () => (
  <div style={styles.container}>
    <h2>No hay vuelos disponibles</h2>
    <h3 style={styles.h3}>No encontramos vuelos disponibles hacia su destino en esta fecha.</h3>
    <h3 style={styles.h3}>Cambie la fecha para encontrar nuevos viajes.</h3>
    <Link to='/'>
      <PinkButton style={{marginTop: 20}}>CAMBIAR FECHA</PinkButton>
    </Link>
  </div>
);

const styles = {
  container: {
    display: 'block',
    backgroundColor: Colors.lightGray,
    border: '2px solid',
    borderColor: Colors.gray,
    padding: '15px 40px',
    borderRadius: 10,
  },
  h3: {
    margin: 0,
    fontWeight: 400,
  },
  mainInformation: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: '10px 20px',
    borderRight: '2px solid',
    borderColor: Colors.gray,
  },
};

export default NoFlights;
