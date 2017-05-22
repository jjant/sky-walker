import React from 'react';
import { connect } from 'react-redux';
import FilterCheckBox from '../search/FilterCheckBox';
import Colors from '../constants/Colors';
import { changeSearchBarValue } from '../actions/flightsActions';

const RoundTripCheckBox = ({ dispatch, flightParams }) => (
  <div
    style={styles.container}
    onClick={() => dispatch(changeSearchBarValue({ round_trip: !flightParams.round_trip }))}
  >
    <FilterCheckBox
      checked={flightParams.round_trip}
    />
    <span style={styles.label}>Ida y vuelta</span>
  </div>
);

const styles = {
  container: {
    cursor: 'pointer',
    color: Colors.white,
  },
  label: {
    userSelect: 'none',
  },
};
const mapStateToProps = (state) => ({
  flightParams: state.flights.flightParams,
});

export default connect(mapStateToProps)(RoundTripCheckBox);
