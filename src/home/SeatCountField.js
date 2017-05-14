import React from 'react';
import { connect } from 'react-redux';
import { changeSearchBarValue } from '../actions/flightsActions';

const lastFieldStyle = (isLastField) => {
  return isLastField ? { borderRight: '0' } : {};
}

const onChange = (name, dispatch, newValue) => {
  const payload = newValue >= 0 ? { [name]: newValue } : { [name]: '' };
  return dispatch(changeSearchBarValue(payload));
};

const SeatCountField = ({ style, name, placeholder, flightParams, dispatch, last }) => (
  <input
    style={{...styles.smallField, ...style, ...lastFieldStyle(last)}}
    type="number"
    placeholder={placeholder}
    value={flightParams[name]}
    onChange={(event) => onChange(name, dispatch, event.target.value)}
  />
);

const styles = {
  smallField: {
    width: '75px',
  },
};
const mapStateToProps = (state) => ({
  flightParams: state.flights.flightParams,
});

export default connect(mapStateToProps)(SeatCountField);
