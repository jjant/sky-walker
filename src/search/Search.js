import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlightList from './FlightList';
import SortBar from './SortBar'
import SearchBar from './SearchBar';
import SearchSpinner from './SearchSpinner';
import { fetchFlights } from '../actions/flightsActions';


class Search extends Component {
  componentWillMount() {
    this.props.dispatch(fetchFlights(this.props.flightParams));
  }

  renderFlightList() {
    if (this.props.fetching || !this.props.flights)
      return <SearchSpinner />;
    return <FlightList flights={this.props.flights} airlines={this.props.airlines} />;
  }

  render() {
    return (
      <div style={styles.container}>
        <SortBar />
        <div style={styles.flights}>
          <SearchBar />
          {this.renderFlightList()}
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    maxWidth: '1400px',
    margin: '55px auto 0',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  flights: {
    display: 'flex',
    width: '100%',
    maxWidth: '1300px',
    justifyContent: 'space-between',
  },
};

const mapStateToProps = (state) => ({
  fetching: state.flights.fetching,
  flightParams: state.flights.flightParams,
  flights: state.flights.flights,
  airlines: state.flights.airlines,
});

export default connect(mapStateToProps)(Search);
