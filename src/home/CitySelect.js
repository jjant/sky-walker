import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Colors from '../constants/Colors';
import { Link } from 'react-router-dom';
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
  }

  updateValue(newValue) {
    this.setState(() => ({ value: newValue }));
  }

  render() {
    return (
      <Select
        name="form-field-name"
        value={this.state.value}
        style={{...this.props.style, ...styles.select}}
        placeholder={this.props.placeholder}
        options={this.state.options}
        onChange={(newValue) => this.updateValue(newValue)}
      />
    );
  }
}

const styles = {
  select: {
    borderRadius: 0,
  },
};

export default CitySelect;
