import React, { Component } from 'react';
import Colors from '../constants/Colors';
import PassengerLoader from './PassengerLoader'
import { connect } from 'react-redux';
import BillingLoader from './BillingLoader'
import { newPassengers, setFlightBooking } from '../actions/bookActions';
import api from '../lib/api';
import moment from 'moment';
import ErrorCustom from './Error'

class Sell extends Component {
  constructor(props) {
    super(props);
    this.state = { step: 0 };
    this.passengers = [{ documentType: 'DNI' }]
  }

  componentWillMount() {
    if (!this.props.location.search.includes('=')) return this.props.history.push('/error');
    const params = this.props.flightsParams;
    this.props.dispatch(setFlightBooking(this.props.location.search.split('=')[1]))
    this.props.dispatch(newPassengers(+params.adults + +params.children + +params.infants));
  }

  firstStep = () => {
    this.setState({ step: 0 });
  }

  secondStep = () => {
    this.setState({ step: 1 });
  }

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

    if (!response.ok) return console.log('error');

    return this.props.history.push('/success');
  }

  getPassengerData = (passenger) => {
    const fields = ['first_name', 'last_name', 'birthdate', 'id_number'];
    const auxPassenger = {...passenger};

    fields.forEach((field) => auxPassenger[field] = auxPassenger[field] instanceof ErrorCustom ? '' : auxPassenger[field] || '');

    return `${auxPassenger.first_name} ${auxPassenger.last_name && auxPassenger.last_name + ' |'} ${auxPassenger.birthdate ? moment(auxPassenger.birthdate).format('DD/MM/YYYY') + ' |' : ''} ${auxPassenger.id_number}`;

  }

  render() {
    const steps = [<PassengerLoader nextStep={ this.secondStep.bind(this) } />,
                   <BillingLoader prevStep={ this.firstStep.bind(this)} nextStep={ this.bookFlight.bind(this) } />]
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <div><span style={{ fontSize: 30, fontWeight: '900' }}>{this.props.flightsParams.from} <img style={{ transform: 'rotate(90deg)', height: 30, verticalAlign: 'middle', display: 'inline-block'}} src={require('../../assets/plane-white.png')} alt=""/> {this.props.flightsParams.to}</span></div>
          <div><span>{ moment(this.props.flightsParams.dep_date).format('DD/MM/YYYY') } | { moment.locale('es') && moment(this.props.flightsParams.dep_date).fromNow()}</span></div>
          <div style={{ marginTop: 10, fontWeight: '900' }}>{ this.props.passengers.map((passenger, idx) => <span key={idx} style={{display: 'block'}}>{this.getPassengerData(passenger)}</span>) }</div>
          <div style={{ borderTop: `2px solid ${Colors.pink}`, width: '60%', margin: '0 auto', marginTop: 10, paddingTop: 10}}><span style={{ fontSize: 20, fontWeight: '900' }}>TOTAL: U$D {(this.props.flights.find((flight) => flight.id == this.props.flightId) || {}).price || ''}</span></div>
        </div>
        { steps[this.state.step]  }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  flightsParams: state.flights.flightParams,
  flights: state.flights.flights,
  flightId: state.book.flightId,
  passengers: state.book.passengers,
  payment: state.book.payment,
});

export default connect(mapStateToProps)(Sell);


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
  btn: {
    backgroundColor: Colors.pink,
    border: '1px solid red',
    padding: '10px 20px',
    outline: 'none',
    cursor: 'pointer',
    marginTop: 10,
    borderRadius: 5,
    color: 'white',
    fontWeight: 900
  },
  header: {
    width: '100%',
    color: 'white',
    padding: '15px 0',
    backgroundColor: Colors.blue,
  },
  loader: {
    marginTop: 10,
    width: '80%',
    height: 10,
    borderRadius: 10,
    backgroundColor: 'red'
  }
};