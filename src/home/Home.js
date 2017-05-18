import React from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import OfferGrid from '../offers/OfferGrid';
import backgroundImage from '../../assets/barcelona.jpg';

const Home = () => (
  <div>
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
    
    <div style={styles.offerContainer}>
      <h2>Descubrí nuevos destinos</h2>
      <OfferGrid />
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
  offerContainer: {
    width: '100%',
    margin: '0 auto',
    backgroundColor: 'white',
    padding: 20,
  }
};

export default Home;
