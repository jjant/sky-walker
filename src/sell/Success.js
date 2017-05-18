import React, { Component } from 'react';
import Colors from '../constants/Colors';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BoardingPass from './BoardingPass';

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
        
        <BoardingPass style={{ marginTop: 20 }} flight={this.state.flight} />

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