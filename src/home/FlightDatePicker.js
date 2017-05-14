import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import { changeSearchBarValue } from '../actions/flightsActions';

const FlightDatePicker = (props) => (
  <SingleDatePicker
    hideKeyboardShortcutsPanel={props.hideKeyboardShortcutsPanel}
    displayFormat={props.displayFormat}
    placeholder={props.placeholder}
    numberOfMonths={props.numberOfMonths}
    date={moment(props.flightParams.dep_date)}
    onDateChange={dep_date => {
      props.dispatch(changeSearchBarValue({ dep_date: dep_date.format('YYYY-MM-DD')}));
    }}
    focused={props.flightParams.focused}
    onFocusChange={focused => props.dispatch(changeSearchBarValue(focused))}
  />
);

FlightDatePicker.defaultProps = {
  placeholder: "Fecha de ida",
  numberOfMonths: 1,
  hideKeyboardShortcutsPanel: true,
  displayFormat: "DD/MM/YYYY",
};

const mapStateToProps = (state) => ({
  flightParams: state.flights.flightParams,
});

export default connect(mapStateToProps)(FlightDatePicker);
