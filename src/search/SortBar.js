import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlightList from './FlightList';
import Select from 'react-select';
import { fetchFlights, changeSearchBarValue } from '../actions/flightsActions';

const options = [
  // { value: 'fare', label: 'Precio (sin impuestos) (⬆️)'},
  { value: 'total asc', label: '⬆️ Precio total'},
  { value: 'total desc', label: '⬇️ Precio total'},
  { value: 'stopovers asc', label: '⬆️ Paradas'},
  { value: 'stopovers desc', label: '⬇️ Paradas'},
  { value: 'airline asc', label: '⬆️ Aerolinea'},
  { value: 'airline desc', label: '⬇️ Aerolinea'},
  { value: 'duration asc', label: '⬆️ Duracion'},
  { value: 'duration desc', label: '⬇️ Duracion'},
];

class SortBar extends Component {
  onChange = (event) => {
    const value = (event && event.value) ? event.value : "";
    const [sortKey, sortOrder] = value.split(' ');
    this.props.dispatch(changeSearchBarValue({
      sort_key: sortKey,
      sort_order: sortOrder,
    }));
  };

  componentWillReceiveProps(nextProps) {
    const newSortKey = nextProps.flightParams.sort_key;
    const newSortOrder = nextProps.flightParams.sort_order;

    if(newSortKey !== this.props.sort_key || newSortOrder !== this.props.sort_order) {
      this.props.dispatch(fetchFlights(nextProps.flightParams));
    }
  }

  render() {
    return (
      <div style={styles.container}>
        <Select
          name='sort_key'
          value={`${this.props.flightParams.sort_key} ${this.props.flightParams.sort_order}`}
          style={styles.select}
          placeholder="Ordenar por"
          options={options}
          onChange={(event) => this.onChange(event)}
        />
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    maxWidth: '1300px',
    marginBottom: '30px',
    justifyContent: 'flex-end',
  },
  select: {
    width: '300px',
  }
};

const mapStateToProps = (state) => ({
  flightParams: state.flights.flightParams,
});

export default connect(mapStateToProps)(SortBar);
