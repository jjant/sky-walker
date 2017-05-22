import React from 'react';
import { connect } from 'react-redux';
import Colors from '../constants/Colors';

const renderDateFields = (isRoundTrip) => {
  const oneWayComponent = <label style={{width: '145px', ...styles.label}}>Fecha de ida</label>;
  const roundTripComponent = [<label key="ida" style={{ ...styles.label, width: '118px', paddingLeft: '20px' }}>Fecha de ida</label>,
                              <label key="vuelta" style={{ ...styles.label, width: '118px', paddingLeft: '20px' }}>Fecha de vuelta</label>];
  return isRoundTrip ? roundTripComponent : oneWayComponent ;
};

const SearchBarLabels = ({ isRoundTrip = false }) => (
  <div style={styles.labelContainer}>
    <label style={{width: '198px', ...styles.label}}>Origen</label>
    <label style={{width: '198px', ...styles.label}}>Destino</label>
    {renderDateFields(isRoundTrip)}
    <label style={{width: '84px', lineHeight: '13px', ...styles.label}}>
      Adultos
      <span style={{ fontSize: '10px', height: '4px', display: 'block' }}> (11+ años)</span>
    </label>
    <label style={{width: '84px', lineHeight: '13px', ...styles.label}}>
      Niños
      <span style={{ fontSize: '10px', height: '4px', display: 'block' }}> (2 - 11 años)</span>
    </label>
    <label style={{width: '83px', lineHeight: '13px', ...styles.label}}>
      Infantes
      <span style={{ fontSize: '10px', height: '4px', display: 'block' }}> (0 - 2 años)</span>
    </label>
    <span style={{width: '98px', ...styles.label}}/>
  </div>
);

const styles = {
  labelContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  label: {
    paddingLeft: '2px',
    textAlign: 'left',
    color: Colors.white,
    fontSize: '16px',
  },
};

const mapStateToProps = (state) => ({
  isRoundTrip: state.flights.flightParams.round_trip,
});

export default connect(mapStateToProps)(SearchBarLabels);
