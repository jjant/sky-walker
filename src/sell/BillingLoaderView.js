import React, { Component } from 'react';
import Colors from '../constants/Colors';
import PassengerLoader from './PassengerLoader'
import HeaderResume from './HeaderResume'
import { connect } from 'react-redux';
import BillingLoader from './BillingLoader'
import { newPassengers, setFlightBooking } from '../actions/bookActions';
import api from '../lib/api';
import moment from 'moment';
import ErrorCustom from './Error'

class BillingLoaderView extends Component {
  bookFlight = async () => {
    const book = {
      flight_id: this.props.flightId,
      passengers: this.props.passengers,
      payment: {
        installments: this.props.payment.installment || 1,
        credit_card: {
          number: this.props.payment.ccnumber.split(' ').join(''),
          expiration: this.props.payment.ccdate.split(' / ').join(''),
          security_code: this.props.payment.ccv,
          first_name: this.props.payment.name,
          last_name: this.props.payment.lastname,
        }
      },
      billing_address: {
        zip_code: this.props.payment.postalcode,
        street: this.props.payment.street,
        floor: (this.props.payment.apt || "").slice(0,3),
        apartment: (this.props.payment.apt || "").slice(-2),
        city: {
          id: this.props.payment.state.split('|')[1],
          state: this.props.payment.state.split('|')[0],
          country: {
            'id': this.props.payment.country
          }
        }
      },
      contact: {
        email: this.props.payment.email,
        phones: [this.props.payment.phone],
      }
    }

    console.log(book);

    const response = await api.bookFlight(book);
    console.log(response);

    //if (!response.ok) return console.log('error');

    return this.props.history.push('/success');
  }

  render() {
    return (
      <div style={styles.container}>
        <HeaderResume show={true} />
        <BillingLoader prevStep={ () => this.props.history.push('/passengers') } nextStep={ this.bookFlight.bind(this) } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  flightId: state.book.flightId,
  passengers: state.book.passengers,
  payment: state.book.payment,
});

export default connect(mapStateToProps)(BillingLoaderView);


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