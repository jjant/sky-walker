import React, { Component } from 'react';
import Colors from '../constants/Colors';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BoardingPass from './BoardingPass';

class Success extends Component {
  constructor(props) {
    super(props);
    this.state = { flight: {} };
  }

  componentWillMount() {
    this.setState({ flight: this.props.selectedFlights.departure_flight });
  }

  render() {
    const adults = Number(this.props.flightParams.adults);
    const children = Number(this.props.flightParams.children);
    const infants = Number(this.props.flightParams.infants);

    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.h1}>¡Felicitaciones!</h1>
          <h2 style={styles.h2}>Ha adquirido {adults + children + infants} { adults + children + infants === 1 ? 'pasaje' : 'pasajes'} {this.props.selectedFlights.arrival_flight ? 'ida y vuelta' : ''} con destino a {this.props.selectedFlights.arrival_flight ? this.props.selectedFlights.arrival_flight.arrivalCity.name : this.props.selectedFlights.departure_flight.arrivalCity.name }. <br/> Esperamos que disfrute su viaje.</h2>
        </div>

        { this.props.selectedFlights.arrival_flight ? <BoardingPass style={{ marginTop: 10 }} flight={this.props.selectedFlights.arrival_flight} /> : null }
        <BoardingPass style={{ marginTop: 20 }} flight={this.props.selectedFlights.departure_flight}/>

        <Link to="/">
          <button style={styles.button}>DESCUBRA NUEVOS DESTINOS</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  flights: state.flights.flights,
  flightParams: state.flights.flightParams,
  selectedFlights: state.flights.selected_flights,
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
