import React from 'react';
import Header from './Header';
import SearchBar from './SearchBar';

const Home = () => (
  <div style={styles.container}>
    <img
      src={require('../../assets/banner.png')}
      style={styles.backgroundImage}
      alt="Ciudad de España"
    />
    <div style={styles.barWrapper}>
      <SearchBar />
    </div>
  </div>
);

const styles = {
  container: {
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    position: 'absolute',
    zIndex: '-1',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
  },
  barWrapper: {
    marginTop: '200px',
  },
};

export default Home;
