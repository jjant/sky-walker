import React, { Component } from 'react';
import PassengerLoader from './PassengerLoader'
import HeaderResume from './HeaderResume'
import { connect } from 'react-redux';
import { newPassengers, setFlightBooking } from '../actions/bookActions';
import api from '../lib/api';

class PassengerLoaderView extends Component {
  componentWillMount() {
    if (!this.props.location.search.includes('=') && !this.props.flightId) return this.props.history.push('/error');
    const params = this.props.flightsParams;
    const id = this.props.location.search.includes('=') ? this.props.location.search.split('=')[1] : this.props.flightId;
    this.props.dispatch(setFlightBooking(id));
    if (!this.props.passengers.length) this.props.dispatch(newPassengers(+params.adults + +params.children + +params.infants));
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
  flightId: state.book.flightId,
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