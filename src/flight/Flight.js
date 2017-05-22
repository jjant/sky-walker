import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Body from './Body';
import Cost from './Cost';
import Colors from '../constants/Colors';

const Flight = ({ ida, vuelta, style }) => (
  <div style={{...style, ...styles.container}}>
    <div style={styles.mainInformation}>
      <Header {...ida}/>
      <Body />
      <Header {...vuelta}/>
      <Body />
    </div>
    <Cost price={1232}/>
  </div>
);

const idaVueltaProptypes = PropTypes.shape({
  way: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}).isRequired;

Flight.propTypes = {
  ida: idaVueltaProptypes,
  vuelta: idaVueltaProptypes,
};

const styles = {
  container: {
    backgroundColor: 'white',
    display: 'flex',
    border: '2px solid',
    borderColor: Colors.gray,
  },
  mainInformation: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: '10px 20px',
    borderRight: '2px solid',
    borderColor: Colors.gray,
  },
};

export default Flight;
