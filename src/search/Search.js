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

  renderTitle() {
    const oneWay = <h1 style={styles.title}>Seleccione su vuelo</h1>;
    const roundTripForward = <h1 style={styles.title}>Seleccione su vuelo de ida</h1>;
    const roundTripBack = <h1 style={styles.title}>Seleccione su vuelo de vuelta</h1>;
    if (this.props.flightParams.round_trip) {
      return this.props.isFirstFlight ? roundTripForward : roundTripBack;
    }
    return oneWay;
  }

  renderFlightList() {
    if (this.props.fetching || !this.props.flights)
      return <SearchSpinner />;
    return <FlightList flights={this.props.flights} airlines={this.props.airlines} />;
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.topBar}>
          {this.renderTitle()}
          <SortBar />
        </div>
        <div style={styles.flights}>
          {/* <SearchBar /> */}
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
    justifyContent: 'center',
  },
  topBar: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '45px',
  },
  title: {
    margin: '0 0 0 200px',
  },
};

const mapStateToProps = (state) => ({
  fetching: state.flights.fetching,
  flightParams: state.flights.flightParams,
  flights: state.flights.flights,
  airlines: state.flights.airlines,
  isFirstFlight: state.flights.flightParams.first_flight,
});

export default connect(mapStateToProps)(Search);
