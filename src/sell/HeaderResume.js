import React, { Component } from 'react';
import Colors from '../constants/Colors';
import { connect } from 'react-redux';
import ErrorCustom from './Error'
import moment from 'moment';

class HeaderResume extends Component {
  getPassengerData = (passenger) => {
    const fields = ['first_name', 'last_name', 'birthdate', 'id_number'];
    const auxPassenger = {...passenger};

    fields.forEach((field) => auxPassenger[field] = auxPassenger[field] instanceof ErrorCustom ? '' : auxPassenger[field] || '');

    return `${auxPassenger.first_name} ${auxPassenger.last_name && auxPassenger.last_name + ' |'} ${auxPassenger.birthdate ? moment(auxPassenger.birthdate).format('DD/MM/YYYY') + ' |' : ''} ${auxPassenger.id_number}`;
  }

  render() {
    const goPrice = this.props.selectedFlights.departure_flight.price.total;
    const backPrice = this.props.selectedFlights.arrival_flight ? this.props.selectedFlights.arrival_flight.price.total : 0;

    return(
      <div style={styles.header}>
        <div>
          <span style={styles.destinationName}>{ this.props.flightsParams.from }
            <img style={styles.airplaneImg} src={ require('../../assets/plane-white.png') } alt=""/>
            {this.props.flightsParams.to}
          </span>
        </div>

        <div>
          <span>
            { moment(this.props.flightsParams.dep_date).format('DD/MM/YYYY') } | { moment.locale('es') && moment(this.props.flightsParams.dep_date).fromNow() }
          </span>
        </div>

        { !this.props.show ? null : <div style={styles.passengerContainer}>{ this.props.passengers.map((passenger, idx) => <span key={idx} style={{display: 'block'}}>{this.getPassengerData(passenger)}</span>) }</div> }
        <div style={styles.totalContainer}><span style={styles.totalText}>TOTAL: U$D { (goPrice + backPrice).toFixed(2) }</span></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  flightsParams: state.flights.flightParams,
  flights: state.flights.flights,
  selectedFlights: state.flights.selected_flights,
  passengers: state.book.passengers,
});

export default connect(mapStateToProps)(HeaderResume);

const styles = {
  header: {
    width: '100%',
    color: 'white',
    padding: '15px 0',
    backgroundColor: Colors.blue,
  },
  destinationName: {
    fontSize: 30,
    fontWeight: '900',
  },
  airplaneImg: { 
    transform: 'rotate(90deg)',
    height: 30,
    verticalAlign: 'middle',
    display: 'inline-block',
  },
  totalContainer: {
    borderTop: `2px solid ${Colors.pink}`,
    width: '60%',
    margin: '0 auto',
    marginTop: 10,
    paddingTop: 10,
  },
  totalText: { 
    fontSize: 20,
    fontWeight: '900',
  },
  passengerContainer: {
    marginTop: 10,
    fontWeight: '900',
  }
}