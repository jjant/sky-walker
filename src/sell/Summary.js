import React, { Component } from 'react';
import { connect } from 'react-redux';

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = { flight: {} };
  }

  componentWillMount() {
    const flight = this.props.flights.find((flight) => flight.id == this.props.flightId);
    this.setState({ flight });  
  }

  render() {
    return(
      <div style={styles.container}>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  flightsParams: state.flights.flightParams,
  flightId: state.book.flightId,
  flights: state.flights.flights,
  passengers: state.book.passengers,
  payment: state.book.payment,
});

export default connect(mapStateToProps)(Summary);

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    maxWidth: '1400px',
    margin: '55px auto 0',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'red',
  },
};