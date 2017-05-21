import React from 'react';
import Colors from '../constants/Colors';
import { Link } from 'react-router-dom';
import CitySelect from './CitySelect';
import FlightDatePicker from './FlightDatePicker';
import SeatCountField from './SeatCountField';
import RoundTripCheckBox from './RoundTripCheckBox';
import SearchBarLabels from './SearchBarLabels';
import { connect } from 'react-redux';
import Alert from 'react-s-alert';

const renderSeatCountFields = () => {
  const fieldNames = ['adults', 'children', 'infants'];
  const fieldPlaceholders = ['Adultos', 'Niños', 'Infantes'];
  return fieldNames.map((field, index) => {
    return (
      <SeatCountField
        key={field}
        style={styles.searchField}
        placeholder={fieldPlaceholders[index]}
        name={field}
        last={index === fieldNames.length - 1}
      />
    );
  });
};

const SearchBar = (props) => {
  const hasPassengers = props.flightParams.adults || props.flightParams.children || props.flightParams.infants;
  const hasDestinations = props.flightParams.from && props.flightParams.to;
  const canSearch = hasPassengers && hasDestinations;
  return(
    <div style={styles.container}>
      <SearchBarLabels />
      <div style={styles.inputContainer}>
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
        { canSearch ? <Link to="/search"><button style={styles.button} type="button" >Buscar</button></Link> : <button onClick={() => Alert.error('Complete todos los campos para realizar la búsqueda')} style={styles.disabledButton} type="button" >Buscar</button>}
      </div>
      <div style={styles.roundTripContainer}>
        <RoundTripCheckBox />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  flightParams: state.flights.flightParams,
});

export default connect(mapStateToProps)(SearchBar);


const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    maxWidth: '1100px',
    margin: '0 auto 100px',
    height: '200px',
    background: Colors.transparentLightBlue,
  },
  inputContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '10px',
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
    width: '147px',
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
  disabledButton: {
    border: 'none',
    width: '100px',
    height: '50px',
    backgroundColor: 'grey',
    fontSize: '15px',
    color: 'white',
    cursor: 'pointer',
  },
  roundTripContainer: {
    width: '905px',
    marginTop: '15px',
    textAlign: 'left',
  },
};