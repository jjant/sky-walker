import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SingleDatePicker, DateRangePicker } from 'react-dates';
import moment from 'moment';
import { changeSearchBarValue } from '../actions/flightsActions';

class FlightDatePicker extends Component {
  static defaultProps = {
    placeholder: "Fecha de ida",
    numberOfMonths: 1,
    hideKeyboardShortcutsPanel: true,
    displayFormat: "DD/MM/YYYY",
  }

  onFocusChange = (focused) => {
    this.props.dispatch(changeSearchBarValue(focused));
  }

  onFocusChangeRange = (focusedInput) => {
    this.props.dispatch(changeSearchBarValue({ focusedInput }));
  }

  onDateChange = (dep_date) => {
    this.props.dispatch(changeSearchBarValue({ dep_date: dep_date.format('YYYY-MM-DD') }));
  }

  onDatesChange = ({ startDate, endDate }) => {
    const params = {};
    if (startDate) params.dep_date = startDate.format('YYYY-MM-DD');
    if (endDate) params.arr_date = endDate.format('YYYY-MM-DD');
    this.props.dispatch(changeSearchBarValue(params));
  }

  getPropsForDatePicker = () => {
    const commonProps = {
      isOutsideRange: (date) => !date.isSameOrAfter(moment().add(2, 'days')),
      hideKeyboardShortcutsPanel: this.props.hideKeyboardShortcutsPanel,
      displayFormat: this.props.displayFormat,
    };

    const singleDatePickerProps = {
      ...commonProps,
      onFocusChange: this.onFocusChange,
      focused: this.props.flightParams.focused,
      date: moment(this.props.flightParams.dep_date),
      onDateChange: this.onDateChange,
      numberOfMonths: this.props.numberOfMonths,
      placeholder: this.props.placeholder,
    };

    const dateRangePickerProps = {
      ...commonProps,
      onFocusChange: this.onFocusChangeRange,
      focusedInput: this.props.flightParams.focusedInput,
      startDate: moment(this.props.flightParams.dep_date) || null,
      endDate: moment(this.props.flightParams.arr_date) || moment(this.props.flightParams.dep_date).clone().add(1, 'days'),
      onDatesChange: this.onDatesChange,
    };

    return this.props.flightParams.round_trip ? dateRangePickerProps : singleDatePickerProps;
  }

  render() {
    return this.props.flightParams.round_trip ?
      <DateRangePicker {...this.getPropsForDatePicker()} /> : <SingleDatePicker {...this.getPropsForDatePicker()} />
  }
}

const mapStateToProps = (state) => ({
  flightParams: state.flights.flightParams,
});

export default connect(mapStateToProps)(FlightDatePicker);
