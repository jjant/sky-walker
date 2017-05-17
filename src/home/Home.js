import React from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import backgroundImage from '../../assets/barcelona.jpg';

const Home = () => (
  <div style={styles.container}>
    <img
      src={backgroundImage}
      style={styles.backgroundImage}
      alt="Ciudad de España"
      className="main-background-image"
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
    top: '-100%',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  barWrapper: {
    marginTop: '200px',
  },
};

export default Home;
