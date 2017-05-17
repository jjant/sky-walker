import React from 'react';
import Colors from '../constants/Colors';

const renderDateFields = (isRoundTrip) => {
  const oneWayComponent = <label style={{width: '145px', ...styles.label}}>Fecha de ida</label>;
  const roundTripComponent = [<label style={{width: '145px', ...styles.label}}>Fecha de ida</label>,
                              <label style={{width: '145px', ...styles.label}}>Fecha de ida</label>];
  return isRoundTrip ? roundTripComponent : oneWayComponent ;
};

const SearchBarLabels = ({ isRoundTrip = false }) => (
  <div style={styles.labelContainer}>
    <label style={{width: '198px', ...styles.label}}>Origen</label>
    <label style={{width: '198px', ...styles.label}}>Destino</label>
    {renderDateFields(isRoundTrip)}
    <label style={{width: '84px', ...styles.label}}>Adultos</label>
    <label style={{width: '84px', ...styles.label}}>Niños</label>
    <label style={{width: '83px', ...styles.label}}>Infantes</label>
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

export default SearchBarLabels;
