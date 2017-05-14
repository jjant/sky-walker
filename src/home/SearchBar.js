import React from 'react';
import Colors from '../constants/Colors';
import { Link } from 'react-router-dom';
import CitySelect from './CitySelect';
import FlightDatePicker from './FlightDatePicker';
import SeatCountField from './SeatCountField';

const renderSeatCountFields = () => {
  const fieldNames = ['adults', 'children', 'infants'];
  const fieldPlaceholders = ['Adultos', 'Niños', 'Infantes'];
  return fieldNames.map((field, index) => {
    return (
      <SeatCountField
        style={styles.searchField}
        placeholder={fieldPlaceholders[index]}
        name={field}
        last={index === fieldNames.length - 1}
      />
    );
  });
};
const SearchBar = () => (
  <div style={styles.container}>
    <CitySelect
      name="from"
      placeholder="Origen"
      style={{...styles.searchField, ...styles.largeField}}
    />
    <CitySelect
      name="to"
      placeholder="Destino"
      style={{...styles.searchField, ...styles.largeField}}
    />
    <FlightDatePicker />
    {renderSeatCountFields()}
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
  mediumField: {
    width: '140px',
  },
  largeField: {
    width: '200px',
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
