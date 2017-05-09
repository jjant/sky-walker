import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';

class FlightDatePicker extends Component {
  static defaultProps = {
    placeholder: "Fecha de ida",
    numberOfMonths: 1,
    hideKeyboardShortcutsPanel: true,
    displayFormat: "DD/MM/YYYY",
  }

  state = {
    date: null,
    focused: false,
  }

  onDateChange(date) {
    this.setState({ date });
  }

  onFocusChange({ focused }) {
    this.setState({ focused });
  }

  render() {
    return (
      <SingleDatePicker
        {...this.props}
        date={this.state.date}
        onDateChange={date => this.onDateChange(date)}
        focused={this.state.focused}
        onFocusChange={focused => this.onFocusChange(focused)}
      />
    );
  }
}
export default FlightDatePicker;
