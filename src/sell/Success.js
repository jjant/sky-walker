import React, { Component } from 'react';
import Colors from '../constants/Colors';
import { connect } from 'react-redux';
import TicketField from './TicketField'
import moment from 'moment';
import { Link } from 'react-router-dom';

class Success extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const flight = {
      id: 94588,
      price: 344.72,
      rawPrice: {
        adults: {
          base_fare: 278,
          quantity: 2
        },
        children: {
          base_fare: 178,
          quantity: 1
        },
        infants: {
          base_fare: 27,
          quantity: 3
        },
        total: {
          charges: 11.12,
          taxes: 55.6,
          fare: 278,
          total: 344.72
        }
      },
      duration: '01:19',
      cabinType: 'ECONOMY',
      airline: {
        id: '8R',
        name: 'SOL',
        rating: 4.8
      },
      arrivalTime: '2017-12-25 07:09:00',
      arrivalAirport: {
        id: 'TUC',
        description: 'Aeropuerto Benjamin Matienzo, San Miguel de Tucuman, Argentina',
        timeZone: '-03:00'
      },
      arrivalCity: {
        id: 'TUC',
        name: 'San Miguel de Tucuman, Tucuman'
      },
      departureTime: '2017-12-25 05:50:00',
      departureAirport: {
        id: 'EZE',
        description: 'Aeropuerto Ezeiza Ministro Pistarini, Buenos Aires, Argentina',
        timeZone: '-03:00'
      },
      departureCity: {
        id: 'BUE',
        name: 'Buenos Aires, Ciudad de Buenos Aires'
      }
    }

    this.setState({ flight: this.props.flights.find((flight) => flight.id == this.props.flightId) || flight });
  }

  render() {
    const adults = Number(this.state.flight.rawPrice.adults.quantity);
    const children = Number(this.state.flight.rawPrice.children.quantity);
    const infants = Number(this.state.flight.rawPrice.infants.quantity);

    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.h1}>¡Felicitaciones!</h1>
          <h2 style={styles.h2}>Has adquirido {adults + children + infants} { adults + children + infants === 1 ? 'pasaje' : 'pasajes'}  con destino a {this.state.flight.arrivalCity.name}. <br/> Esperamos que disfrutes tu viaje.</h2>
        </div>
        
        <div style={styles.ticketContainer}>
          <div style={styles.tripContainer}>
            <div style={styles.ticketHeader}><span>{ this.state.flight.airline.name }</span> <span>VUELO #{this.state.flight.id}</span></div>
            <TicketField title="Desde">{ this.state.flight.departureCity.name } ({ this.state.flight.departureAirport.id.toUpperCase()})</TicketField>
            <TicketField title="Partida" style={{ width: 'auto' }}>{ moment(this.state.flight.departureTime).format('DD/MM/YYYY hh:mm')} ({this.state.flight.departureAirport.timeZone}) </TicketField>
            <TicketField title="Hasta">{ this.state.flight.arrivalCity.name } ({ this.state.flight.arrivalAirport.id.toUpperCase()})</TicketField>
            <TicketField title="Llegada" style={{ width: 'auto' }}>{ moment(this.state.flight.arrivalTime).format('DD/MM/YYYY hh:mm')} ({this.state.flight.arrivalAirport.timeZone})</TicketField>
          </div>

          <div style={styles.billContainer}>
            <div style={{...styles.ticketHeader, justifyContent: 'center'}}>TICKET</div>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '80%', margin: '0 auto', height: 'calc(100% - 60px)', fontSize: 19, textAlign: 'left'}}>
              { adults ? <div style={styles.billItemContainer}><span>{ adults } { adults == 1 ? 'Adulto' : 'Adultos' }:</span><span>{adults} x U$D { this.state.flight.rawPrice.adults.base_fare }</span></div> : null }
              { children ? <div style={styles.billItemContainer}><span>{ children } { children == 1 ? 'Niño' : 'Niños' }:</span><span>{children} x U$D { this.state.flight.rawPrice.children.base_fare }</span></div> : null }
              { infants ? <div style={styles.billItemContainer}><span>{ infants } { infants == 1 ? 'Infante' : 'Infantes'}:</span><span>{infants} x U$D { this.state.flight.rawPrice.infants.base_fare }</span></div> : null }
              <div style={{...styles.billItemContainer, fontSize: 14, margin: '5px 0'}}><span>Impuestos y cargos:</span><span>U$D { this.state.flight.rawPrice.total.charges + this.state.flight.rawPrice.total.taxes }</span></div>
              <div style={{ width: '100%', borderTop: `3px solid ${Colors.celest}`, color: Colors.blue, margin: '0 auto', marginTop: 5, paddingTop: 10, textAlign: 'center', fontWeight: 900, fontSize: 22}}>TOTAL: U$D {this.state.flight.rawPrice.total.total }</div>
            </div>
          </div>
        </div>

        <Link to="/">
          <button style={styles.button}>DESCUBRÍ NUEVOS DESTINOS</button>        
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  flights: state.flights.flights,
  flightId: state.book.flightId,
});

export default connect(mapStateToProps)(Success);

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    maxWidth: '1400px',
    margin: '55px auto 0',
    alignItems: 'center',
    marginBottom: 20,
  }, header: {

  }, h1: {
    color: Colors.pink,
    fontSize: 50,
    marginBottom: 0,
  }, h2: {
    fontSize: 30,
    fontWeight: 400,
    marginTop: 20, 
  }, ticketContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: 20,
    width: 900,
    background: Colors.gray,
    border: '1px solid grey',
  }, ticketHeader: {
    width: '100%',
    boxSizing: 'border-box',
    fontSize: 25,
    fontWeight: 900,
    color: Colors.blue,
    height: 60,
    background: Colors.celest,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
  }, tripContainer: {
    width: '70%',
    textAlign: 'left',
    boxSizing: 'border-box',
    display: 'inline-block',
  }, billContainer: {
    width: '30%',
    boxSizing: 'border-box',
    display: 'inline-block',
    borderLeft: '1px dashed grey',
  }, billItemContainer : {
    display: 'flex',
    justifyContent: 'space-between',
  }, button: {
    backgroundColor: Colors.pink,
    border: '1px solid red',
    padding: '10px 20px',
    outline: 'none',
    cursor: 'pointer',
    marginTop: 50,
    fontSize: 20,
    borderRadius: 5,
    color: 'white',
    fontWeight: '900',
  }
};