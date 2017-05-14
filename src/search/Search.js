import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlightList from './FlightList';
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
    return <FlightList flights={this.props.flights} />;
  }

  render() {
    return (
      <div style={styles.container}>
        <SearchBar />
        {this.renderFlightList()}
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    maxWidth: '1400px',
    margin: '55px auto 0',
    justifyContent: 'center',
  },
};

const mapStateToProps = (state) => ({
  fetching: state.flights.fetching,
  flightParams: state.flights.flightParams,
  flights: state.flights.flights,
});

export default connect(mapStateToProps)(Search);
