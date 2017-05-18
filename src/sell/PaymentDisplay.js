import React from 'react'
import moment from 'moment';
import countries from '../../public/countries.json';
import Colors from '../constants/Colors';

const PaymentDisplay = ({ payment, style }) => {
  const country = countries.find((country) => country.countryCode === payment.country);

  return (
    <div style={style}>
      <div style={styles.topBar}>
        <h3 style={styles.h3}>FACTURACIÓN</h3>
      </div>
      <div style={{ padding: '20px 20px'}}>
        <h4 style={styles.h4}>Tarjeta de crédito</h4>
        <label style={styles.row}>{payment.cctype.toUpperCase()} {payment.ccnumber}</label>
        <label style={styles.row}>VTO: {payment.ccdate} CCV: {payment.ccv}</label>
        <label style={styles.row}>{payment.name} {payment.lastname} | DNI: {payment.dni}</label>
        <h4 style={styles.h4}>Información de envío</h4>
        <label style={styles.row}>{payment.city}, {payment.state.split('|')[0]}, {country}</label>
        <label style={styles.row}>{payment.postalcode} | {payment.street} {payment.apt}</label>
        <label style={styles.row}>{payment.email} | {payment.phone}</label>
      </div>
    </div>
  );
};

const styles = {
  row: {
    display: 'block',
    fontSize: 16,
    lineHeight: 1.3,
  },
  h3: {
    fontSize: 25,
    margin: 0,
    color: Colors.blue,
  },
  h4: {
    fontSize: 20,
    margin: '10px 0',
    color: Colors.blue,
  },
  topBar: {
    width: '100%',
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.celest,
  }
}

export default PaymentDisplay;