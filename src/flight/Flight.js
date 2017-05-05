import React from 'react';
import Header from './Header';

const Flight = ({ ida, vuelta }) => (
  <div style={styles.container}>
    <span>soy un vuelo</span>
    {[ida, vuelta].map(e => <Header {...e}/>)}
  </div>
);

const styles = {
  container: {
    backgroundColor: 'red',
    width: '700px',
    margin: '0 auto',
    padding: '20px',
  },
};

export default Flight;
