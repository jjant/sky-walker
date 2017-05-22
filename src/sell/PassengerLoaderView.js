import React, { Component } from 'react';
import PassengerLoader from './PassengerLoader'
import HeaderResume from './HeaderResume'
import { connect } from 'react-redux';
import { newPassengers, setFlightBooking } from '../actions/bookActions';
import api from '../lib/api';

class PassengerLoaderView extends Component {
  componentWillMount() {
    if(!this.props.selectedFlights) return this.props.history.push('/error');
    const params = this.props.flightsParams;
    if (this.props.location.search.includes('clearPassengers')) this.props.dispatch(newPassengers(+params.adults + +params.children + +params.infants));
  }

  render() {
    return (
      <div style={styles.container}>
        <HeaderResume show={false} />
        <PassengerLoader nextStep={ () => this.props.history.push('/bill') } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  flightsParams: state.flights.flightParams,
  selectedFlights: state.flights.selected_flights,
  passengers: state.book.passengers,
});

export default connect(mapStateToProps)(PassengerLoaderView);

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    maxWidth: '1400px',
    margin: '55px auto 0',
    alignItems: 'center',
    marginBottom: 20,
  },
};