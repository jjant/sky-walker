import React, { Component } from 'react';
import Colors from '../constants/Colors';
import Passenger from './Passenger'
import { connect } from 'react-redux';
import ErrorCustom from './Error'
import { submitPassengers, newPassengers } from '../actions/bookActions';


class PassengerLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _updatePassengers = (passenger, idx) => {
    if (typeof idx === 'undefined') return this.props.dispatch(submitPassengers(passenger.concat([])));
    const passengers = this.props.passengers.concat([]);
    passengers[idx] = {...passenger};
    this.props.dispatch(submitPassengers(passengers));
  } 

  _submit = () => {
    const requiredFields = ['first_name', 'birthdate', 'last_name', 'id_number'];
    const emptyFields = [];
    const errorObj = [];

    this.props.passengers.forEach((passenger, id) => {
      emptyFields.push([]);
      requiredFields.forEach((field) => {
        if (!passenger[field] || passenger[field] instanceof ErrorCustom) emptyFields[id].push(field);
      });
    });

    const hasErrors = emptyFields.find((passengerErrors) => passengerErrors.length);
    console.log(emptyFields);
    if (hasErrors) {
      emptyFields.forEach((passengerErrors, id) => {
        errorObj.push({});
        passengerErrors.forEach((field) => {
          errorObj[id][field] = new ErrorCustom();
        })
      })

      const passengers = this.props.passengers.map((passenger, id) => ({...passenger, ...(errorObj[id])}));
      
      console.log(passengers);
      this.props.dispatch(submitPassengers(passengers));
      return;
    }

    this.props.dispatch(submitPassengers(this.props.passengers));
    this.props.nextStep();
  }

  render() {
    return (
      <div style={ styles.elementContainer}>
        <h2 style={ styles.title }>Pasajeros</h2>
        { this.props.passengers.map((passenger, idx) => <Passenger key={idx} passenger={passenger} updatePassenger={ this._updatePassengers.bind(this) } index={idx}/> )}
        <button onClick={ this._submit } style={ styles.btn }>CARGAR PASAJEROS</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  passengers: state.book.passengers,
  flightsParams: state.flights.flightParams,
});

export default connect(mapStateToProps)(PassengerLoader);

const styles = {
  title: {
    color: Colors.lightblue
  },
  elementContainer: {
    backgroundColor: Colors.grey,
    padding: 20,
    textAlign: 'left'
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
  }
};