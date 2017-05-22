import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Colors from '../constants/Colors';
import { Link } from 'react-router-dom';
import { changeSearchBarValue } from '../actions/flightsActions';
import api from '../lib/api';

class CitySelect extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    style: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = { options: [] };
    this.getCities();
  }

  getCities() {
    api.getCities()
       .then(resp => resp.cities)
       .then(cities => cities.map((city) => ({ value: city.id, label: city.name})))
       .then(cities => this.setState({ options: cities}));

    api.getAirports()
        .then(resp => resp.airports)
        .then(airports => airports.filter((airport) => airports.filter((airport2) => airport.city.id === airport2.city.id).length > 1))
        .then(airports => airports.map((airport) => ({ value: airport.id, label: `(${airport.id}) ${airport.description}`})))
        .then(airports => this.setState({ options: this.state.options.concat(airports)} ));
  }

  updateValue(newValue) {
    this.setState(() => ({ value: newValue }));
  }

  getValue() {
    return this.props.flightParams[this.props.name];
  }

  onChange(newValue) {
    const value = newValue ? newValue.value : '';
    return this.props.dispatch(changeSearchBarValue({ [this.props.name]: value }));
  }

  render() {
    return (
      <Select
        name={this.props.name}
        value={this.getValue()}
        style={{...this.props.style, ...styles.select}}
        placeholder={this.props.placeholder}
        options={this.state.options}
        onChange={(newValue) => this.onChange(newValue)}
      />
    );
  }
}

const styles = {
  select: {
    borderRadius: 0,
  },
};

const mapStateToProps = (state) => ({
  flightParams: state.flights.flightParams,
});

export default connect(mapStateToProps)(CitySelect);
