import React, { Component } from 'react';
import Colors from '../constants/Colors';
import Input from './Input'
import ErrorCustom from './Error'
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';

export default class Sell extends Component {
  constructor(props) {
    super(props);
    this.state = { isFilled: false };
    this.passenger = this.props.passenger || {};
  }

  _updatePassenger = (event) => {
    this.passenger[event.target.name] = event.target.value;
    this.props.updatePassenger(this.passenger, this.props.index);
    const isFilled = Object.keys(this.passenger).find((field) => this.passenger[field]);
    this.setState({ isFilled });
  }

  render() {

    const hideFields = ([
    <div key="lastnames" style={styles.fieldset}>
      <label style={styles.label} htmlFor="">Apellidos</label>
      <Input tabIndex={2 + this.props.index * 4} value={ this.props.passenger.last_name } required validation={(text) => text ? new RegExp('^[A-Za-z áéíóíñ]+$').test(text) : true} onChange={ this._updatePassenger.bind(this) } name="last_name" style={styles.input} type="text"/>
    </div>,
    <div key="birthdate" style={styles.fieldset}>
      <label style={styles.label} htmlFor="">Fecha de nacimiento</label>
      <Input tabIndex={3 + this.props.index * 4} value={ this.props.passenger.birthdate } required onChange={ this._updatePassenger.bind(this) } name="birthdate" style={styles.inputDate} type="date"/>
    </div>,
    <div key="document" style={styles.fieldset}>
      <label style={styles.label} htmlFor="">Tipo y número de documento</label>
      <select style={styles.selectDoc} onChange={ this._updatePassenger.bind(this) } name="id_type">
        <option value="1">DNI</option>
        <option value="2">PASAPORTE</option>
      </select>
      <input tabIndex={4 + this.props.index * 4} maxLength="8" value={ this.props.passenger.id_number instanceof ErrorCustom ? '' : this.props.passenger.id_number } required style={styles.inputDoc} onChange={ this._updatePassenger.bind(this) } name="id_number" type="text"/>
      { this.props.passenger.id_number instanceof ErrorCustom ? <div style={styles.error}><span>El campo es incorrecto</span></div> : null } 
    </div>]);
    return (
      <div style={styles.container}>
        <h3 style={styles.title}>Pasajero</h3>
        <div style={styles.fieldContainer}>
          <div style={styles.fieldset}>
            <label style={styles.label} htmlFor="">Nombres</label>
            <Input tabIndex={1 + this.props.index * 4} value={ this.props.passenger.first_name } style={styles.input} required validation={(text) => text ? new RegExp('^[A-Za-z áéíóíñ]+$').test(text) : true} name="first_name" onChange={ this._updatePassenger.bind(this) } type="text"/>
          </div>
          { this.state.isFilled ? hideFields : null }
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    textAlign: 'left',
    marginBottom: 20
  },
  title: {
    margin: 0,
    textAlign: 'left',
    color: Colors.blue,
  },
  fieldContainer: {
    display: 'flex',
    width: '100%',
    maxWidth: '900px',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  fieldset: {
    textAlign: 'left',
    width: 430,
    marginTop: 20
  },
  selectDoc: {
    width: '20%',
    height: 37,
    outline: 'none',
  },
  inputDoc: {
    width: '80%',
    padding: '10px',
    boxSizing: 'border-box',
    borderRadius: 5,
    outline: 'none',
    border: '1px solid grey',
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderLeftWidth: 0,
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: 16,
    boxSizing: 'border-box',
    borderRadius: 5,
    outline: 'none',
    border: '1px solid grey'
  },
  error: {
    fontSize: 12,
    background: Colors.pink,
    width: 'calc(100% - 20px)',
    marginTop: 5,
    color: 'white',
    padding: '5px 10px',
    borderRadius: 5,
  },
  inputDate: {
    width: '100%',
    padding: '6px 10px',
    fontSize: 16,
    boxSizing: 'border-box',
    borderRadius: 5,
    outline: 'none',
    border: '1px solid grey'
  },
  label: {
    display: 'block',
    fontWeight: 900,
    marginBottom: 15,
  }
};