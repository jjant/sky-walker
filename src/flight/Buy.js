import React, { Component } from 'react';
import { connect } from 'react-redux';
import Colors from '../constants/Colors';
import { Link } from 'react-router-dom';
import { changeSelectedFlights, changeSearchBarValue, handleArrivalFlightSelected } from '../actions/flightsActions';

class Buy extends Component {
  getRoute = () => {
    const passengerRoute = `/passengers?clearPassengers=true`;
    const searchRoute = '/search';
    if (this.props.isRoundTrip && this.props.isFirstFlight)
      return searchRoute;
    return passengerRoute;
  }

  onClick = () => {
    const flight = this.props.flights.find((flight) => flight.id == this.props.flight );

    const depatureFlight = { departure_flight: flight };
    const arrivalFlight = { arrival_flight: flight };

    if (this.props.isRoundTrip && this.props.isFirstFlight) {
      this.props.dispatch(changeSearchBarValue({ first_flight: false }));
      this.props.dispatch(changeSelectedFlights(arrivalFlight));
      this.props.dispatch(handleArrivalFlightSelected(this.props.flightParams));
    }
    return this.props.dispatch(changeSelectedFlights(depatureFlight));

  }

  render() {
    const buttonText = this.props.isFirstFlight ? 'Seleccionar' : 'Comprar';

    return (
      <Link
        to={this.getRoute()}
        onClick={this.onClick}>
        <button style={styles.button}>{buttonText}</button>
      </Link>
    );
  }
};

const styles = {
  button: {
    border: '0',
    backgroundColor: Colors.pink,
    padding: '5px 15px',
    fontSize: '18px',
    color: Colors.white,
  },
};

const mapStateToProps = (state) => ({
  flights: state.flights.flights,
  flightParams: state.flights.flightParams,
  isRoundTrip: state.flights.flightParams.round_trip,
  isFirstFlight: state.flights.flightParams.first_flight,
});

export default connect(mapStateToProps)(Buy);
