import React from 'react';
import spinner from '../../assets/spinner.svg'

const SearchSpinner = () => (
  <div style={styles.container}>
    <img
      style={styles.spinner}
      src={spinner}
     />
  </div>
);

const styles = {
  container: {
    width: '850px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    width: '200px',
  },
}

export default SearchSpinner;
