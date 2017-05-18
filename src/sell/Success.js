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
    this.setState({ flight: this.props.flights.find((flight) => flight.id == this.props.flightId) });
  }

  render() {
    const adults = Number(this.state.flight.rawPrice.adults ? this.state.flight.rawPrice.adults.quantity : 0);
    const children = Number(this.state.flight.rawPrice.children ? this.state.flight.rawPrice.children.quantity : 0);
    const infants = Number(this.state.flight.rawPrice.infants ? this.state.flight.rawPrice.infants.quantity : 0);

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