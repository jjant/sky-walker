import React from 'react'
import moment from 'moment';

const idMap = ['DNI', 'PASAPORTE'];

const PassengerDisplay = ({ passenger }) => {
  return (
    <div style={{ marginTop: 20, marginRight: 20 }}>
      <label style={{...styles.row, fontWeight: 900 }}>{passenger.first_name} {passenger.last_name}</label>
      <label style={styles.row}>{idMap[passenger.id_type - 1]} {passenger.id_number}</label>
      <label style={styles.row}>{moment(passenger.birthdate).format('DD/MM/YYYY')}</label>
    </div>
  );
};

const styles = {
  row: {
    display: 'block',
    fontSize: 16,
    lineHeight: 1.4,
  }
}

export default PassengerDisplay;