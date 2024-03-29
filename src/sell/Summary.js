import React, { Component } from 'react';
import { connect } from 'react-redux';
import BoardingPass from './BoardingPass';
import PinkButton from './PinkButton';
import PassengerDisplay from './PassengerDisplay';
import PaymentDisplay from './PaymentDisplay';
import Colors from '../constants/Colors';
import api from '../lib/api';
import Alert from 'react-s-alert';

class Summary extends Component {
  bookFlight = () => {
    Object.keys(this.props.selectedFlights).forEach( async (flight, id) => {
      const book = {
        flight_id: this.props.selectedFlights[flight].id,
        passengers: this.props.passengers,
        payment: {
          installments: this.props.payment.installment || 1,
          credit_card: {
            number: this.props.payment.ccnumber.split(' ').join(''),
            expiration: this.props.payment.ccdate.split(' / ').join(''),
            security_code: this.props.payment.ccv,
            first_name: this.props.payment.name,
            last_name: this.props.payment.lastname,
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
                id: this.props.payment.country
              }
            }
          },
        },
        contact: {
          email: this.props.payment.email,
          phones: [this.props.payment.phone],
        }
      }

      const response = await api.bookFlight(book);
      //if (response.error) return Alert.error('Se produjo un error tratando de realizar la compra. Compruebe que todos sus datos sean válidos.');
      if (id === Object.keys(this.props.selectedFlights).length - 1) return this.props.history.push('/success');
    });

  }

  render() {
    return(
      <div>
        <h2 style={{margin: 0, marginTop: 60, color: Colors.pink, fontSize: 35 }}>Confirme sus datos</h2>
        <h3>Confirme sus datos y los datos de los pasajeros para realizar la compra de los pasajes</h3>
        <div style={{...styles.container, marginTop: 0, flexDirection: 'column'}}>
          { this.props.selectedFlights.arrival_flight ? <BoardingPass style={{ marginTop: 10 }} flight={this.props.selectedFlights.arrival_flight} /> : null }
          <BoardingPass flight={this.props.selectedFlights.departure_flight}/>

          <div style={{...styles.container, width: 900, padding: 0, justifyContent: 'flex-start', marginTop: 10, alignItems: 'flex-start'}}>
            <PaymentDisplay style={{ background: Colors.gray, textAlign: 'left', color: 'black', border: '1px solid gray' }} payment={this.props.payment} />

            <div style={{...styles.halfContainer, marginLeft: 10}}>
              <div style={styles.topBar}>PASAJEROS</div>
              <div style={{padding: 20, paddingTop: 0, display: 'flex', flexWrap: 'wrap'}}>
                { this.props.passengers.map((passenger, id) => <PassengerDisplay key={id} passenger={passenger} />) }
              </div>
            </div>

          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <PinkButton onClick={ () => this.props.history.push(`/passengers`) } style={{ marginRight: 10, backgroundColor: 'grey', border: '1px solid grey' }}>EDITAR DATOS</PinkButton>
          <PinkButton onClick={ this.bookFlight.bind(this) }>CONFIRMAR COMPRA</PinkButton>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  flightsParams: state.flights.flightParams,
  flightId: state.book.flightId,
  flights: state.flights.flights,
  selectedFlights: state.flights.selected_flights,
  passengers: state.book.passengers,
  payment: state.book.payment,
});

export default connect(mapStateToProps)(Summary);

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    height: 'auto',
    padding: 20,
    marginBottom: 0,
    alignItems: 'center',
  },
  halfContainer: {
    textAlign: 'left',
    boxSizing: 'border-box',
    background: Colors.gray,
    border: '1px solid gray',
  },
  h3: {
    fontSize: 30,
  },
  topBar: {
    height: 60,
    width: '100%',
    minWidth: 300,
    display: 'flex',
    background: Colors.celest,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 25,
    fontWeight: '900',
    color: Colors.blue
  }
};
